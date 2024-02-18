import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { backendUrl } from "../../backendUrl";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  // connecting register page to backend
  const PostData = async (e) => {
    try {
      e.preventDefault();

      const { name, email, password } = user;

      const res = await fetch(`${backendUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
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
      } else if (res.status === 409) {
        window.alert("Email already Exists");
        console.log("Email already Exists");
      } else {
        window.alert("Registration Successful");
        console.log("Registration Successful");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      navigate("/");
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
      navigate("/");
    }
  };

  return (
    <>
      <section className="registerpage">
        <div className="form-box-register">
          <div className="form-value">
            <form method="POST">
              <h2 className="register-text">Create Account</h2>

              <div className="inputbox">
                <span className="details">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="off"
                  value={user.name}
                  onChange={handleInputs}
                ></input>
              </div>

              <div className="inputbox">
                <span className="details">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInputs}
                ></input>
              </div>

              <div className="inputbox">
                <span className="details">Password</span>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInputs}
                ></input>
              </div>

              <div className="tickbox-container-register">
                <input type="checkbox" />
                <label>Remember Me</label>
              </div>

              <div className="click">
                <input type="submit" value="Sign Up" onClick={PostData} />
              </div>
            </form>

            <div className="bottom-text">
              <span className="already">Already have an account?</span>
              <NavLink className="login-link" to="/login">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
