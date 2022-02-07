import React, { useEffect, useState } from "react";
import "./App.css";

function Chat({ socket, username, roomId }) {
  const [currentMessage, SetMessage] = useState("");
  const [ListMessage, setList] = useState([]);
  let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes();

  const SendMessage = async () => {
    if (currentMessage !== "") {
      const MessageData = {
        room: roomId,
        message: currentMessage,
        author: username,
        Time: time,
      };

      await socket.emit("send_message", MessageData);
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live</p>
      </div>
      <div className="chat-body"></div>

      {/* Gonna put a chat body here  */}
      <div className="chat-footer">
        <input
          onChange={(e) => {
            SetMessage(e.target.value);
          }}
          value={currentMessage}
          type="text"
          placeholder="Type..."
        />
        <button onClick={SendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
