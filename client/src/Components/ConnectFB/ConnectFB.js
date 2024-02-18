import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { backendUrl } from "../../backendUrl";
import "./connectfb.css";

const ConnectFB = () => {
  const [pages, setPages] = useState(null);
  const [showPages, setShowPages] = useState(false);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

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
    } catch (error) {
      console.log(error);
      navigate("/login");
      window.alert("Internal Server Error");
    }
  };

  const ConnectPage = async () => {
    try {
      const res = await fetch(
        `https://graph.facebook.com/me/accounts?access_token=${process.env.REACT_APP_USER_ACCESS_TOKEN}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("jwtToken"),
          }
        }
      );

      const data = await res.json();
      setPages(data.data);

      if (data.length === 0) {
        window.alert("No Pages Found.");
      } else {
        setShowPages(true);
      }
    } catch (err) {
      console.log(err);
      window.alert("Internal Server Error");
    }
  };

  const handleOverlayClick = (event) => {
    if (overlayRef.current && event.target === overlayRef.current) {
      setShowPages(false);
    }
  };

  const PageListPopup = () => {
    return (
      <div
        className="page-popup-overlay"
        onClick={handleOverlayClick}
        ref={overlayRef}
      >
        <div className="page-popup">
          <p className="text1">Pages Name</p>
          {pages ? (
            pages.map((i) => (
              <NavLink to={`/page-integration/${i.name}`}>
                <p className="pagename">{i.name}</p>
              </NavLink>
            ))
          ) : (
            <p className="text1">Loading...</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="connectfbpage">
        <div className="connectfb-box">
          <div className="form-value">
            <h2 className="connectfb-text">Facebook Page Integration</h2>

            <div className="click">
              <input type="submit" value="Connect Page" onClick={ConnectPage} />
            </div>
          </div>
        </div>
      </section>
      {showPages && <PageListPopup />}
    </>
  );
};

export default ConnectFB;
