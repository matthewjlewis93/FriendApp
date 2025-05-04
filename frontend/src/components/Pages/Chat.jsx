import ChatMessage from "../ChatMessage";
import ChatTextBar from "../ChatTextBar";


export default function Chat () {
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
        {/* <Loading /> */}
        <ChatTextBar />
      </div>
    );
}