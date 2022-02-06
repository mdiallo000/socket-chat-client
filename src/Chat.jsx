import React, { useState } from "react";

function Chat({ socket, username, roomId }) {
  const [currentMessage, SetMessage] = useState("");
  const SendMessage = async () => {
    if (currentMessage !== "") {
      const MessageData = {
        room: roomId,
        message: currentMessage,
        author: username,
        Time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now().getMinutes()),
      };

      await socket.emit("send_message", MessageData);
    }
  };

  return (
    <div>
      <div>
        <p>Live</p>
      </div>
      <div></div>
      <div>
        <input
          onChange={(e) => {
            SetMessage(e.target.value);
          }}
          type="text"
          placeholder="Type..."
        />
        <button onClick={SendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
