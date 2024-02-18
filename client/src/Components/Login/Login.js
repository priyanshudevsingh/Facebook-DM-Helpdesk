import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { backendUrl } from "../../backendUrl.js";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // connecting login page to backend
  const PostData = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!data) {
        window.alert("You're missing some fields");
        console.log("You're missing some fields");
      } else if (res.status === 422) {
        window.alert("You're missing some fields");
        console.log("You're missing some fields");
      } else if (res.status === 400) {
        window.alert("Invalid Credentials");
        console.log("Invalid Credentials");
      } else {
        localStorage.setItem("jwtToken", data.token);
        window.alert("Login Successful");
        console.log("Login Successful");
        navigate("/connectfb");
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${backendUrl}/userdata`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken"),
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(`Logged in as ${data.name}`);
      navigate("/connectfb");
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  return (
    <>
      <section className="loginpage">
        <div className="form-box-login">
          <div className="form-value">
            <form method="POST">
              <h2 className="login-text">Login to your account</h2>

              <div className="inputbox">
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>

              <div className="inputbox">
                <span className="details">Password</span>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

              <div className="tickbox-container-login">
                <input type="checkbox" />
                <label>Remember Me</label>
              </div>

              <div className="click">
                <input type="submit" value="Login" onClick={PostData} />
              </div>
            </form>

            <div className="bottom-text">
              <span className="already">New to MyApp?</span>
              <NavLink className="login-link" to="/">
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
