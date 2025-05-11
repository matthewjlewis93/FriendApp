import ChatMessage from "./ChatMessage";

export default function LoadingChat() {
  return (
    <div style={{ fontSize: "xx-large !important" }}>
      <ChatMessage
        messageContent={"Loading..."}
        messageReceived={true}
        timeSent={new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      />
    </div>
  );
}
