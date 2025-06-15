import { useEffect, useState } from "react";

export default function ChatMessage({
  messageId,
  messageContent,
  messageReceived,
  timeSent,
  reaction,
  read,
}) {
  const [defaultDisplay, setDefaultDisplay] = useState(true);
  const [reactionInput, setReactionInput] = useState("");
  const [reactionTimeoutId, setReactionTimeoutId] = useState("");
  const [messageSeen, setMessageSeen] = useState(Boolean(read)); 

  const reg = /[\w\.\!\?="':;\(\)\-$%#@\*<>\/~\+]/;

  const validateReactInput = (letter) => {
    if (letter.target.value == "" || letter.target.value.at(-1).match(reg)) {
      setReactionInput(letter.target.value);
    }
  };

  const highlightReaction = (e) => {
    let reaction = e.target;
    if (reaction.classList.contains("highlighted")) {
      clearTimeout(reactionTimeoutId);
    } else {
      reaction.classList.add("highlighted");
    }
    setReactionTimeoutId(
      setTimeout(() => {
        reaction.classList.remove("highlighted");
      }, 1500)
    );
  };

  const sendReaction = async () => {
    if (!reactionInput) return;
    setDefaultDisplay(true);
    setReactionInput("");
    let res = await fetch("/api/message/edit/" + messageId, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reaction: reactionInput, id: messageId }),
    });
  };

  const extendAddReaction = (event) => {
    let chatDiv;
    if (!defaultDisplay || reaction) return;
    if (event.target.classList.contains("chat-div")) {
      chatDiv = event.target;
    } else if (
      event.target.classList.contains("chat-message") ||
      event.target.classList.contains("add-reaction") ||
      event.target.classList.contains("reaction") ||
      event.target.classList.contains("message-time")
    ) {
      chatDiv = event.target.parentElement;
      if (chatDiv.classList.contains("sent-chat")) return;
    } else {
      setDefaultDisplay(false);
      return;
    }

    if (!chatDiv.getElementsByClassName("extended").length) {
      chatDiv
        .getElementsByClassName("add-reaction")[0]
        .classList.add("extended");
    }
  };

  useEffect(() => {
    if (!defaultDisplay) {
      document.querySelector(".reaction-input input").focus();
    }
  }, [defaultDisplay]);

  useEffect(() => {
    // console.log(document.querySelector(`div [index='${messageId}'`));
    if (
      !messageSeen &&
      messageReceived &&
      document.querySelector(`div [index='${messageId}'`)
    ) {
      const readOptions = {
        root: document.getElementById("chat-log"),
        rootMargin: -document.getElementsByClassName("date-divider")[0].offsetHeight+"px 0px 0px 0px",
        threshold: 1.0,
      };
      const readCallback = (entries) => {
        entries.forEach(async (entry) => {
          if (entry.intersectionRatio == 1) {
            // console.log("hi");
            setMessageSeen(true);
            readObvserver.disconnect();
            await fetch('/api/message/read/'+messageId, {
              method: "PATCH",
              headers: {"Content-Type" : "application/json"},
              body: JSON.stringify({id: messageId, read: true})
            })
          }
        });
      };
      const readObvserver = new IntersectionObserver(readCallback, readOptions);
      readObvserver.observe(
        document.querySelector(`div [index='${messageId}'`)
      );
    }
  }, []);

  return (
    <div
      index={messageId}
      onClick={(event) => extendAddReaction(event)}
      className={
        "chat-div " + (messageReceived ? "received-chat" : "sent-chat")
      }
      style={{
        maxWidth: defaultDisplay ? "65%" : "40%",
        outline:
          !messageSeen && messageReceived
            ? "4px solid #f1c40fff"
            : "2px solid #f1c40f00",
        transition: "outline 750ms 1s",
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
      {messageReceived && !reaction && (
        <div className="add-reaction">
          <p
            style={{
              margin: 0,
              padding: "5px",
              alignSelf: "center",
              justifySelf: "end",
              height: "1rem",
              visibility: defaultDisplay ? "visible" : "hidden",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              textAlign: "center",
              alignContent: "center",
              backgroundColor: "#283747",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="#f5b7b1"
              viewBox="0 0 16 16"
            >
              <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M7.194 6.766a1.7 1.7 0 0 0-.227-.272 1.5 1.5 0 0 0-.469-.324l-.008-.004A1.8 1.8 0 0 0 5.734 6C4.776 6 4 6.746 4 7.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.5 2.5 0 0 0-.227-.4zM11 9.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.5 2.5 0 0 0-.228-.4 1.7 1.7 0 0 0-.227-.273 1.5 1.5 0 0 0-.469-.324l-.008-.004A1.8 1.8 0 0 0 10.07 6c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z" />
            </svg>
          </p>
        </div>
      )}

      {reaction && messageReceived && defaultDisplay ? (
        <p
          onClick={(e) => highlightReaction(e)}
          onDoubleClick={() => setDefaultDisplay(false)}
          className="reaction sent-reaction"
        >
          {reaction}
        </p>
      ) : reaction && !messageReceived && defaultDisplay ? (
        <p className="reaction received-reaction">{reaction}</p>
      ) : (
        messageReceived &&
        !defaultDisplay && (
          <div className="reaction reaction-input">
            <div style={{ display: "flex", gap: "2px" }}>
              <input
                autoCorrect="off"
                autoCapitalize="off"
                placeholder={reaction || "One word reaction"}
                maxLength={12}
                size={13}
                value={reactionInput}
                onChange={(letter) => {
                  validateReactInput(letter);
                }}
              />
              <p
                style={{
                  fontSize: "0.65rem",
                  margin: "0",
                  alignSelf: "end",
                  width: "25px",
                }}
              >
                {reactionInput.length}/12
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingRight: "1rem",
              }}
            >
              <button
                onClick={sendReaction}
                className="submit-reaction"
                style={{
                  padding: "2px",
                  borderRadius: "4px",
                  height: "20px",
                  border: "2px solid",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
              </button>
              <button
                className="cancel-reaction"
                style={{
                  padding: "2px",
                  borderRadius: "4px",
                  border: "2px solid",
                  height: "20px",
                }}
                onClick={() => {
                  setDefaultDisplay(true);
                  setReactionInput("");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="100%"
                  width="100%"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
              </button>
            </div>
          </div>
        )
      )}
      <p className="message-time">{timeSent}</p>
    </div>
  );
}
