const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const authenticate = require("./middleware/authenticate");

require("./db/connect");
const User = require("./model/userSchema");
const Message = require("./model/messagesSchema");

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

// new messages storing route
router.post("/storeMessages", async (req, res) => {
  try {
    const { custId, custMsg } = req.body;

    const newMessages = custMsg.map((msg) => ({
      msgId: msg.msgId,
      message: msg.message,
      created_time: msg.created_time,
      from: {
        senderName: msg.from.name,
        senderEmail: msg.from.email,
        senderId: msg.from.id,
      },
    }));

    const existingCustId = await Message.findOne({ custId });

    if (existingCustId) {
      existingCustId.messages.push(...newMessages);
      await existingCustId.save();
    } else {
      const firstTimeCust = new Message({
        custId,
        messages: newMessages,
      });
      await firstTimeCust.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Messages stored successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/lastStoredMessageTimestamp", async (req, res) => {
  try {
    const { custId } = req.query;

    const latestMessage = await Message.findOne(
      { custId },
      { "messages.created_time": 1 }
    ).sort({ "messages.created_time": -1 });

    if (
      !latestMessage ||
      !latestMessage.messages ||
      latestMessage.messages.length === 0
    ) {
      res.send({timestamp: "0"});
    } else {
      res.send({timestamp: latestMessage.messages[0].created_time});
    }
  } catch (error) {
    console.error("Error retrieving last stored message timestamp:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
