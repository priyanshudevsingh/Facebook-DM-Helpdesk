import React, { useEffect, useState } from "react";
import CustomersList from "./CustomersList";
import Chats from "./Chats";
import { backendUrl } from "../../backendUrl";
import { useNavigate } from "react-router-dom";
import inbox from "../../Assets/inbox.png";
import logo from "../../Assets/logo.png";
import people from "../../Assets/people.png";
import stocks from "../../Assets/stocks.png";
import minion from "../../Assets/SpaceMinion.png";
import phone from "../../Assets/phone.png";
import profile from "../../Assets/profile.png";
import menu from "../../Assets/menu.jpeg";
import refresh from "../../Assets/refresh.png";
import "./agentScreen.css";

const AgentScreen = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [conversations, setConversations] = useState([]);
  const [pageName, setPageName] = useState("");
  const [activeChatData, setActiveChatData] = useState("");

  let custName = "";
  let custEmail = "";

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

      // getting the info from the data that we just got
      const conversationsData = [];
      data.forEach((chat) => {
        const participants = chat.participants.data;
        setPageName(participants[1].name);
        custEmail = participants[0].email;
        custName = participants[0].name;

        const conversationMessages = [];
        chat.messages.data.forEach((message) => {
          conversationMessages.push(message);
        });

        conversationsData.push({
          name: custName,
          email: custEmail,
          messages: conversationMessages,
        });
      });

      setConversations(conversationsData);

      if (data.length === 0) {
        window.alert("No Pages Found.");
      }
    } catch (err) {
      console.log(err);
      navigate("/login");
    }
  };

  const fetchChat = (email) => {
    try {
      const chat = conversations.find(
        (conversation) => conversation.email === email
      );
      setActiveChatData(chat);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewChat = (email, name) => {
    const [firstName, ...lastNameArray] = name.split(" ");
    const lastName = lastNameArray.join(" ");
    fetchChat(email);
    setEmail(email);
    setFullName(name);
    setFname(firstName);
    setLname(lastName);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container">
      <div class="first-column">
        <ul class="options">
          <li>
            <img
              src={logo}
              width="50px"
              height="50px"
              className="sidebar-logos"
            />
          </li>
          <li>
            <img
              src={inbox}
              width="50px"
              height="50px"
              className="sidebar-logos"
            />
          </li>
          <li>
            <img
              src={people}
              width="50px"
              height="50px"
              className="sidebar-logos"
            />
          </li>
          <li>
            <img
              src={stocks}
              width="50px"
              height="50px"
              className="sidebar-logos"
            />
          </li>
        </ul>

        <div class="agentDetails">
          <div class="profilePic">
            <img
              src={minion}
              width="70px"
              height="70px"
              alt="Profile Picture"
            />
          </div>
        </div>
      </div>

      <div className="second-column">
        <div className="top-bar">
          <div className="top-left">
            <img
              src={menu}
              width="70px"
              height="70px"
              alt="Menu Image"
              className="menu-img"
            />
            <span className="conversation">Conversation</span>
          </div>
          <img
            src={refresh}
            width="70px"
            height="70px"
            alt="Refresh Image"
            className="refresh-img"
            onClick={() => window.location.reload()}
          />
        </div>

        <div className="partition"></div>
        {conversations.map((i, index) => (
          <div
            key={index}
            className={index % 2 === 0 ? "grey-background" : "white-background"}
            onClick={() => handleViewChat(i.email, i.name)}
          >
            <CustomersList name={i.name} messages={i.messages} />
          </div>
        ))}
      </div>

      <div className="third-column">
        <div className="top-bar">
          <span className="chat-top">{fullName ? fullName : "Chat"}</span>
        </div>
        <div className="partition"></div>
        <div className="all-chats">
          {activeChatData &&
            activeChatData.messages &&
            activeChatData.messages
              .slice()
              .reverse()
              .map((i) => <Chats msg={i} pageName={pageName} />)}
        </div>

        <div className="msg-typing-area">
          <input
            type="text"
            name=""
            className="msg-typing-area-inside"
            placeholder={`Message ${fullName}`}
          />
        </div>
      </div>

      <div className="forth-column">
        <div className="customer-profile-tab">
          <img
            src={minion}
            width="70px"
            height="70px"
            alt="Profile Picture"
            className="customer-picture"
          />

          <div className="customer-name">{fullName}</div>

          <div className="customer-status-tab">
            <div className="customer-status-offdot"></div>
            <div className="customer-status">Offline</div>
          </div>

          <div className="buttons">
            <button className="call-button">
              <img
                src={phone}
                width="25px"
                height="25px"
                alt="Call Image"
                className="call-profile-button"
              />
              Call
            </button>

            <button className="profile-button">
              <img
                src={profile}
                width="25px"
                height="25px"
                alt="Profile Image"
                className="call-profile-button"
              />
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
                <div className="fetched-email">{Email}</div>
              </div>

              <div className="customer-fname">
                <div className="fname">First Name</div>
                <div className="fetched-fname">{fname}</div>
              </div>

              <div className="customer-lname">
                <div className="lname">Last Name</div>
                <div className="fetched-lname">{lname}</div>
              </div>

              <div className="view-more-details">
                View more details
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentScreen;
