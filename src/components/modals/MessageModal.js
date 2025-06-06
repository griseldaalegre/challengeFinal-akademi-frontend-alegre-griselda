import React from "react";

const MessageModal = ({ open, onClose, message, success = true }) => {
  if (!open) return null;

  return (
    <div className="ui dimmer modals visible active">
      <div className="ui tiny modal visible active">
        <div className={`ui header ${success ? "green" : "red"}`}>
          {success ? "Éxito" : "Error"}
        </div>
        <div className="content">
          <p>{message}</p>
        </div>
        <div className="actions">
          <div
            className={`ui ${success ? "green" : "red"} button`}
            onClick={onClose}
          >
            OK
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
