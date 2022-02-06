import React, { useState } from "react";
import io from "socket.io-client";

const socket = io.connect("/http://localhost:3001");

function ChatContainer() {
  const [username, SetUsername] = useState("");
  const [roomID, SetRoomID] = useState("");

  const joinRoom = () => {
    if (username !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
    }
  };

  return (
    <div>
      <h3>Join To Chat </h3>
      <input
        type="text"
        placeholder="John..."
        onChange={(event) => SetUsername(event.target.value)}
      />
      <input
        type="text"
        placeholder="Room ID...."
        onChange={(event) => SetRoomID(event.target.value)}
      />
      <button onClick={joinroom}>Join A Room</button>
    </div>
  );
}

export default ChatContainer;
