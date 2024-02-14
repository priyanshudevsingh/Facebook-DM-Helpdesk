import React from "react";
import "./deleteDisconnect.css";

const DeleteDisconnect = () => {
  const deleteIntegration = async (e) => {};
  const replyMessages = async (e) => {};
  return (
    <>
      <section className="delete-disconnectpage">
        <div className="delete-disconnect-box">
          <div className="form-value">
            <h2 className="delete-disconnect-text">
              Facebook Page Integration
            </h2>
            <h3 className="integration-text">Integrated Page: </h3>

            <div className="delete">
              <input
                type="submit"
                value="Delete Integration"
                onClick={deleteIntegration}
              />
            </div>
            <div className="reply">
              <input
                type="submit"
                value="Reply To Messages"
                onClick={replyMessages}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DeleteDisconnect;
