import { useEffect, useState } from "react";

export default function ChatMessage({
  messageContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu mattis quam, sit amet faucibus sem. Sed in dictum eros. Vivamus massa sem, cursus vitae cursus ac, commodo eget enim. Nullam at ullamcorper enim. Mauris leo diam, egestas at mollis eu, euismod eu tellus. Vivamus porttitor nisi a ultrices facilisis. In elementum eros et nunc congue, ut commodo dolor finibus. Etiam diam leo, tincidunt non nisl eget, elementum sollicitudin arcu. Sed consequat eros placerat, ultrices lectus sed, tincidunt enim.",
  messageReceived = false,
  timeSent = "2:58 PM",
  reaction = ":)",
}) {
  const [defaultDisplay, setDefaultDisplay] = useState(true);
  const [reactionInput, setReactionInput] = useState("");

  const reg = /[\w\.\!\?="':;\(\)\-$%#@\*<>\/~\+]/;

  const validateReactInput = (letter) => {
    if (letter.target.value == "" || letter.target.value.at(-1).match(reg)) {
      setReactionInput(letter.target.value);
    }
  };

  const extendAddReaction = (event) => {
    let chatDiv;
    if (!defaultDisplay) return;

    if (event.target.classList.contains("chat-div")) {
      chatDiv = event.target;
    } else if (
      event.target.classList.contains("chat-message") ||
      event.target.classList.contains("add-reaction") ||
      event.target.classList.contains("reaction") ||
      event.target.classList.contains("message-time")
    ) {
      chatDiv = event.target.parentElement;
    } else {
      //change state
      setDefaultDisplay(false);
      return;
    }

    if (!chatDiv.getElementsByClassName("extended").length) {
      chatDiv
        .getElementsByClassName("add-reaction")[0]
        .classList.add("extended");
    }
  };

  return (
    <div
      onClick={(event) => extendAddReaction(event)}
      className={
        "chat-div " + (messageReceived ? "received-chat" : "sent-chat")
      }
      style={{
        maxWidth: defaultDisplay ? "65%" : "45%",
      }}
    >
      <p
        className="chat-message"
        style={{
          margin: "0",
        }}
      >
        {messageContent}
      </p>
      {messageReceived && (
        <div onClick={() => console.log("click")} className="add-reaction">
          <p
            style={{
              margin: 0,
              padding: "4px",
              alignSelf: "center",
              justifySelf: "end",
              height: "1rem",
              // minHeight: "fit-content",
              // width: "15px",
              // minWidth: "fit-content",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              border: "1px solid",
              textAlign: "center",
              alignContent: "center",
              backgroundColor: "var(--sent-message)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="100%"
              viewBox="0 -960 960 960"
              width="100%"
              fill="#111"
            >
              <path d="M444-96v-336H144v-96h300v-336h72v336h300v96H516v336h-72Z" />
            </svg>
          </p>
        </div>
      )}
      {messageReceived && defaultDisplay ? (
        <p className="reaction sent-reaction">{reaction}</p>
      ) : messageReceived && !defaultDisplay ? (
        <div className="reaction reaction-input">
          <input
            placeholder={reaction}
            maxLength={10}
            size={10}
            value={reactionInput}
            onChange={(letter) => {
              validateReactInput(letter);
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button style={{paddingInline: "5px"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="15px"
                viewBox="0 -960 960 960"
                width="15px"
                fill="#111"
              >
                <path d="m395-285 339-339-50-51-289 288-119-118-50 50 169 170Zm1 102L124-455l152-152 119 118 289-288 153 153-441 441Z" />
              </svg>
            </button>
            <button style={{paddingInline: "5px"}} onClick={() => setDefaultDisplay(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="15px"
                viewBox="0 -960 960 960"
                width="15px"
                fill="#111"
              >
                <path d="m339-288 141-141 141 141 51-51-141-141 141-141-51-51-141 141-141-141-51 51 141 141-141 141 51 51ZM480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <p className="reaction received-reaction">{reaction}</p>
      )}
      <p className="message-time">{timeSent}</p>
    </div>
  );
}
