import React from "react";
import "./connectfb.css";

const ConnectFB = () => {
  const ConnectPage = async (e) => {};
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
    </>
  );
};

export default ConnectFB;
