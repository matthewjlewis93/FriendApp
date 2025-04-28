// import { useState } from 'react'
import "./App.css";
import ChatMessage from "./components/ChatMessage";
import ChatTextBar from "./components/ChatTextBar";

// import ChatProfilePhoto from "./components/ChatProfilePhoto"

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100svh - 26px)",
        }}
      >
        <div style={{ flexGrow: "1" }}>
          <ChatMessage messageReceived={true} />
          <ChatMessage
            messageReceived={false}
            messageContent="Sorry, I don't speak Italian"
          />
        </div>
        <ChatTextBar />
      </div>
    </>
  );
}

export default App;
