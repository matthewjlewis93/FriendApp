import { useEffect, useState } from "react";

export default function ChatTextBar({ chatReceipientId }) {
  const [messageContent, setMessageContent] = useState("");

  const sendChat = async (e) => {
    e.preventDefault();
    document.getElementById("chatbox").focus();
    let res = await fetch("/api/message/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toId: chatReceipientId, messageContent }),
    });
    res = await res.json();
    setMessageContent("");
  };

  const checkForScroll = () => {
    if (document.getElementById("chat-log").scrollTop >= -50) {
      setTimeout(() => {
        document
          .getElementById("chat-log")
          .scrollTo(0, document.getElementById("chat-log").scrollHeight);
      }, 100);
    }
  };
  return (
    <form
      id="chat-input-container"
      style={{
        height: "fit-content",
        flexShrink: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "var(--chat-background)",
        borderTop: "2px solid #34495e",
        margin: "0 -10px",
      }}
    >
      <textarea
      id="chatbox"
        onChange={(e) => setMessageContent(e.target.value)}
        onClick={checkForScroll}
        value={messageContent}
        style={{
          flexGrow: 1,
          margin: "10px 15px",
          borderRadius: "8px",
          paddingLeft: "10px",
          border: "1px solid",
          maxHeight: "150px",
          fieldSizing: "content",
          resize: "none",
          fontSize: "1rem",
        }}
      />
      <button
        style={{
          fontSize: "1rem",
          margin: "0 15px 0 5px",
          backgroundColor: "#f9e79f",
          border: "1px solid",
          borderRadius: "5px",
          padding: "3px 9px",
        }}
        onClick={(e) => sendChat(e)}
      >
        Send
      </button>
    </form>
  );
}
