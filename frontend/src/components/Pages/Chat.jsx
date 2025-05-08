import { useEffect, useState } from "react";
import ChatMessage from "../ChatMessage";
import ChatTextBar from "../ChatTextBar";
import DateDivider from "../DateDivider";
import Loading from "../Loading";

export default function Chat({
  // userId = "67f456bc98f3888cdf8f7a71",
  // receipientId = "67f456d798f3888cdf8f7a75",
  receipientId = "67f456bc98f3888cdf8f7a71",
}) {
  const [chatLog, setChatLog] = useState([]);

  const fetchMessages = async () => {
    let res = await fetch("/api/message/" + receipientId);
    res = await res.json();
    res.sort((x, y) => String(x.createdAt).localeCompare(String(y.createdAt)));
    const chatByDate = Object.groupBy(res, ({ createdAt }) =>
      new Date(createdAt).toLocaleDateString()
    );
    setChatLog(chatByDate);
    // console.dir(res);
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
        {Object.keys(chatLog).map((date, i) => (
          <>
            <DateDivider dateString={date} />
            {chatLog[date].map((message) => (
              <ChatMessage
                key={message._id}
                messageReceived={message.fromId === receipientId}
                toId={message.toId}
                timeSent={new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                messageContent={message.messageContent}
              />
            ))}
          </>
        ))}
      </div>
      <ChatTextBar />
    </div>
  );
}
