import React, { useEffect, useState } from "react";

function Chat({ socket, username, roomId }) {
  const [currentMessage, SetMessage] = useState("");

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
