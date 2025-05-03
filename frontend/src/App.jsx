// import { useState } from 'react'
import "./App.css";
import ChatMessage from "./components/ChatMessage";
import ChatTextBar from "./components/ChatTextBar";
import Loading from "./components/Loading";

// import ChatProfilePhoto from "./components/ChatProfilePhoto"

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // height: "calc(100svh - 20px)"
        }}
      >
        <div id="chat-log">
          <ChatMessage messageReceived={true} />
          <ChatMessage
            id="last"
            messageReceived={false}
            messageContent="Sorry, I don't speak Italian"
          />
        </div>
        {/* <Loading /> */}
        {/* <ChatTextBar /> */}
      </div>
    </>
  );
}

export default App;
