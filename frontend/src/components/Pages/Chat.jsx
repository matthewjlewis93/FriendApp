import { useEffect, useState } from "react";
import ChatMessage from "../ChatMessage";
import ChatTextBar from "../ChatTextBar";
import Loading from "../Loading";

export default function Chat({
  // userId = "67f456bc98f3888cdf8f7a71",
  receipientId = "67f456d798f3888cdf8f7a75",
}) {
  const [chatLog, setChatLog] = useState ([])

  const fetchMessages = async () => {
    let res = await fetch("/api/message/" + receipientId);
    setChatLog(await res.json());
    
  };

  useEffect(() => fetchMessages, []);

  // useEffect(() => {document.body.style.backgroundColor = "var(--chat-background)"},[])
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        // height: "calc(100svh - 20px)"
      }}
    >
      <div id="chat-log">
        {
          chatLog.map((message, i) => <ChatMessage key={message._id} messageReceived={message.fromId === receipientId} toId={message.toId} timeSent={new Date(message.createdAt).toLocaleTimeString([],{ hour: "2-digit", minute: "2-digit" })} messageContent={message.messageContent}/>)
        }
      </div>
      <ChatTextBar />
    </div>
  );
}
