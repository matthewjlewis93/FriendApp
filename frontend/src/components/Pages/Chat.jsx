import { useEffect } from "react";
import ChatMessage from "../ChatMessage";
import ChatTextBar from "../ChatTextBar";
import Loading from "../Loading";


export default function Chat () {
  useEffect(() => {document.body.style.backgroundColor = "var(--chat-background)"},[])
    return (
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
        <ChatTextBar />
      </div>
    );
}