export default function ChatMessage({
  messageContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu mattis quam, sit amet faucibus sem. Sed in dictum eros. Vivamus massa sem, cursus vitae cursus ac, commodo eget enim. Nullam at ullamcorper enim. Mauris leo diam, egestas at mollis eu, euismod eu tellus. Vivamus porttitor nisi a ultrices facilisis. In elementum eros et nunc congue, ut commodo dolor finibus. Etiam diam leo, tincidunt non nisl eget, elementum sollicitudin arcu. Sed consequat eros placerat, ultrices lectus sed, tincidunt enim.",
  messageReceived=false,
  timeSent="2:58 PM"
}) {
  return (
    <div className="chat-div"
    >
      <p
        className={
          "chat-message " + (messageReceived ? "received-chat" : "sent-chat")
        }
        style={{
          margin: "0",
        }}
      >
        {messageContent}
      </p>
      <p className="message-time">{timeSent}</p>
    </div>
  );
}
