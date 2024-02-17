const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticate = require("./middleware/authenticate");

require("./db/connect");
const User = require("./model/userSchema");

// home route
router.get("/", (req, res) => {
  res.send("Hello World from the router server");
});

// register route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(422).json({ error: "You're missing some fields" });
    }

    const userEmailExist = await User.findOne({ email: email });

    if (userEmailExist) {
      res.status(409).json({ error: "Email already Exists" });
    } else {
      const user = new User({ name, email, password });
      await user.save();
      res.status(200).json({ message: "User Registered Successfully" });

      console.log("yayyy");
    }
  } catch (err) {
    console.log(err);
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "You're missing some fields" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        token = await userLogin.generateAuthToken();

        res
          .status(200)
          .json({ token: token, message: "User Logged in Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// userdata getter route
router.get("/userdata", authenticate, async (req, res) => {
  try {
    res.send(req.userdata);
  } catch (err) {
    console.error(err);
  }
});

// intergration route
router.get("/integration", authenticate, async (req, res) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/me/accounts?access_token=${process.env.USER_ACCESS_TOKEN}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const pages = await response.json();
    res.send(pages.data);
  } catch (err) {
    console.log(err);
  }
});

// getting customers messages route
router.get("/fetchMessages", authenticate, async (req, res) => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${process.env.PAGE_ID}/conversations?fields=participants,messages%7Bid,message,created_time,from%7D&access_token=${process.env.MESSAGES_ACCESS_TOKEN}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    const pages = await response.json();
    res.send(pages.data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
