import React, { useRef } from "react";
import minion from "../../Assets/SpaceMinion.png";

function formatDateTime(dateTimeString) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateTimeString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const period = hour < 12 ? "AM" : "PM";

  const formattedDate = `${month} ${day < 10 ? "0" + day : day}, ${year}`;
  const formattedTime = `${hour % 12 || 12}:${
    minute < 10 ? "0" + minute : minute
  } ${period}`;

  return `${formattedDate}, ${formattedTime}`;
}

const Chats = ({ msg, pageName }) => {
  const whoseChat = pageName === msg.from.name ? "pageChat" : "customerChat";
  const chatRef = useRef(null);

  return (
    <div className={whoseChat} ref={chatRef}>
      <div className="chat">
        <div className="profilePic">
          <img src={minion} alt="" />
        </div>
        <div className="msg-area">
          <p className="msg">{msg.message}</p>
        </div>
      </div>
      <p className="name-time">
        {msg.from.name} - {formatDateTime(msg.created_time)}
      </p>
    </div>
  );
};

export default Chats;
