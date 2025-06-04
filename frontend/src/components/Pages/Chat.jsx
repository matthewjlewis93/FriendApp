import { useEffect, useState } from "react";
import ChatMessage from "../ChatMessage";
import ChatTextBar from "../ChatTextBar";
import DateDivider from "../DateDivider";
import LoadingChat from "../LoadingChat";
import ChatProfilePhoto from "../ChatProfilePhoto";
import Settings from "./Settings";

export default function Chat({ socket, setLogState, profileData }) {
  const [friendList, setFriendList] = useState([]);
  // const [allMessages, setAllMessages] = useState([]);
  const [chatLog, setChatLog] = useState({});
  const [recipientId, setReceipientId] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    document.getElementById("chat-log").addEventListener("click", (event) => {
      if (document.getElementsByClassName("extended").length) {
        document
          .getElementsByClassName("extended")[0]
          .classList.remove("extended");
      }
    });
    return document
      .getElementById("chat-log")
      .removeEventListener("click", (event) => {
        if (document.getElementsByClassName("extended").length) {
          document
            .getElementsByClassName("extended")
            .classList.remove("extended");
        }
      });
  }, []);

  const loadNewMessage = (message) => {
    const newMessageDateString = new Date(
      message.createdAt
    ).toLocaleDateString();

    setChatLog((log) => {
      if (log[newMessageDateString]) {
        return {
          ...log,
          [newMessageDateString]: [message, ...log[newMessageDateString]],
        };
      } else {
        return { [newMessageDateString]: [message], ...log };
      }
    });
    setTimeout(() => {
      document
        .getElementById("chat-log")
        .scrollTo(0, document.getElementById("chat-log").scrollHeight + 10);
    }, 100);
  };
  const loadNewReaction = (message) => {
    const messageDateString = new Date(message.createdAt).toLocaleDateString();
    setChatLog((log) => {
      return {
        ...log,
        [messageDateString]: [...log[messageDateString]].toSpliced(
          log[messageDateString].findIndex((obj) => obj._id === message._id),
          1,
          message
        ),
      };
    });
  };

  const fetchMessages = async (id) => {
    if (id !== "") {
      let res = await fetch("/api/message/" + id);
      res = await res.json();
      //if success ...
      const messages = res.messages;
      messages.sort((y, x) =>
        String(x.createdAt).localeCompare(String(y.createdAt))
      );
      // setAllMessages(messages);
      const chatByDate = Object.groupBy(messages, ({ createdAt }) =>
        new Date(createdAt).toLocaleDateString()
      );
      setLoadingMessages(false);
      setChatLog(chatByDate);
    }
  };

  const fetchFriends = async () => {
    let res = await fetch("/api/profile/friends/");
    res = await res.json();
    setFriendList(res.data);
    setReceipientId(res.data[0]._id);
    fetchMessages(res.data[0]._id);
  };

  useEffect(() => fetchFriends, []);

  useEffect(() => {
    socket.on("newMessage", loadNewMessage);
    socket.on("newReaction", loadNewReaction);
    return () => {
      socket.off("newMessage", loadNewMessage);
      socket.off("newReaction", loadNewReaction);
    };
  }, [chatLog]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "5px",
          boxShadow: "0px 0px 4px black",
          zIndex: 4,
          backgroundColor: "#f2f4f4aa",
        }}
      >
        <div id="friend-bar" style={{ flexGrow: 1 }}>
          {friendList.map((friend, i) => (
            <ChatProfilePhoto
              key={"friend" + i}
              friend={friend}
              recipientId={recipientId}
              setReceiptientId={setReceipientId}
            />
          ))}
        </div>
        <div id="settings-div" style={{ borderLeft: " 2px solid" }}>
          <ChatProfilePhoto
            key={"self"}
            friend={profileData}
            recipientId={recipientId}
            setReceiptientId={setReceipientId}
          />
        </div>
      </div>
      {recipientId === profileData._id ? (
        <Settings />
      ) : (
        <>
          <div id="chat-log">
            {loadingMessages && <LoadingChat />}
            {Object.keys(chatLog)
              .sort((y, x) =>
                String(x.createdAt).localeCompare(String(y.createdAt))
              )
              .map((date, i) => (
                <div
                  key={date}
                  style={{ display: "flex", flexDirection: "column-reverse" }}
                >
                  {chatLog[date]
                    .sort((y, x) =>
                      String(x.createdAt).localeCompare(String(y.createdAt))
                    )
                    .map((message) => (
                      <ChatMessage
                        messageId={message._id}
                        key={message._id}
                        messageReceived={message.fromId === recipientId}
                        reaction={message.reaction}
                        toId={message.toId}
                        timeSent={new Date(
                          message.createdAt
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        messageContent={message.messageContent}
                      />
                    ))}
                  <DateDivider dateString={date} />
                </div>
              ))}
          </div>
          <ChatTextBar chatReceipientId={recipientId} />
        </>
      )}
    </div>
  );
}
