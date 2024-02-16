import React, { useState } from "react";
import CustomersList from "./CustomersList";
import Chats from "./Chats";
import { backendUrl } from "../../backendUrl";
import "./agentScreen.css";
import { useNavigate } from "react-router-dom";
import inbox from "../../Assets/inbox.png";
import logo from "../../Assets/logo.png";
import people from "../../Assets/people.png";
import stocks from "../../Assets/stocks.png";

const AgentScreen = () => {
  const navigate = useNavigate();
  const [chatdata, setChatdata] = useState([]);
  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custId, setCustId] = useState("");
  const [messages, setMessages] = useState([]);
  const [time, setTime] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [status, setStatus] = useState("online");

  // fetching all the messages log and info from backend
  const fetchMessages = async () => {
    try {
      const res = await fetch(`${backendUrl}/fetchMessages`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwtToken"),
        },
        credentials: "include",
      });

      const data = await res.json();
      setChatdata(data);

      // getting the info from the data that we just got
      setCustName();
      setCustEmail();
      setCustId();
      setTime();
      setMessages();

      if (data.length === 0) {
        window.alert("No Pages Found.");
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <div className="first-column">
        <ul className="options">
          <li><img src={logo} width="50px" height="50px"/></li>
          <li><img src={inbox} width="50px" height="50px"/></li>
          <li><img src={people} wwidth="50px" height="50px"/></li>
          <li><img src={stocks} width="50px" height="50px"/></li>
        </ul>

        <div className="agentDetails">
          <div className="profilePic">
            <img src alt="Profile Picture"></img>
            <img className="dot"></img>
          </div>
        </div>
      </div>

      <div className="second-column">
        <div className="top-bar">
          <div className="top-left">
            <img src alt="Menu Image" className="menu-img" />
            <span className="conversation">Conversation</span>
          </div>
          <img src alt="Refresh Image" className="refresh-img" />
        </div>

        <div className="partition"></div>
      </div>

      <div className="third-column">
        <div className="top-bar">
          <span className="chat-top">Chat</span>
        </div>
        <div className="partition"></div>
        <div className="all-chats"></div>

        <div className="msg-typing-area">
          <input
            type="text"
            name=""
            id="msg-typing-area"
            placeholder="Message"
          />
        </div>
      </div>

      <div className="forth-column">
        <div className="customer-profile-tab">
          <img src alt="Profile Picture" className="customer-picture" />

          <div className="customer-name">{custName}</div>

          {status === "Online" ? (
            <div className="customer-status-tab">
              <div className="customer-status-ondot"></div>
              <div className="customer-status">
                {/* {status === "online" ? (
                  <span>Online</span>
                ) : (
                  <span>Offline</span>
                )} */}
                Online
              </div>
            </div>
          ) : (
            <div className="customer-status-tab">
              <div className="customer-status-offdot"></div>
              <div className="customer-status">Offline</div>
            </div>
          )}

          <div className="buttons">
            <button className="call-button">
              <img src alt="Call Image" />
              Call
            </button>

            <button className="profile-button">
              <img src alt="Profile Image" />
              Profile
            </button>
          </div>
        </div>

        <div className="partition"></div>

        <div className="customer-details">
          <div className="details-section">
            <div className="all-details">
              <div className="top-details-text">Customer Details</div>

              <div className="customer-email">
                <div className="email">Email</div>
                <div className="fetched-email">{custEmail}</div>
              </div>

              <div className="customer-fname">
                <div className="fname">First Name</div>
                <div className="fetched-fname">{fname}</div>
              </div>

              <div className="customer-lname">
                <div className="lname">Last Name</div>
                <div className="fetched-lname">{lname}</div>
              </div>

              <a className="view-more-details" href="#">
                View more details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentScreen;
