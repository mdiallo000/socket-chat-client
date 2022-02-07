import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./App.css";

const socket = io.connect("http://localhost:3001");

function ChatContainer() {
  const [username, SetUsername] = useState("");
  const [roomID, SetRoomID] = useState("");
  const [showRomm, SetshowRoom] = useState(false);
  const joinRoom = () => {
    if (username !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
      SetshowRoom(true);
    }
  };

  return (
    <>
      {!showRomm ? (
        <div className="joinChatContainer">
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
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} roomID={roomID} />
      )}
    </>
  );
}

export default ChatContainer;
