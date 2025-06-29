import { useEffect, useState } from "react";
import ChatMessage from "../ChatMessage";
import ChatTextBar from "../ChatTextBar";
import DateDivider from "../DateDivider";
import LoadingChat from "../LoadingChat";
import ChatProfilePhoto from "../ChatProfilePhoto";
import UserProfile from "./UserProfile";
import useLocalStorage from "../../useLocalStorage";

export default function Chat({
  socket,
  setLogState,
  profileData,
  setProfileData,
}) {
  const [friendList, setFriendList] = useState([]);
  // const [allMessages, setAllMessages] = useState([]);
  const [chatLog, setChatLog] = useState({});
  const [recipientId, setReceipientId] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const observerOptions = {
    root: document.getElementById("chat-log"),
    rootMargin: "0px",
    threshold: 0.05,
  };
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      entry.isIntersecting
        ? setScrolledToBottom(true)
        : setScrolledToBottom(false);
    });
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  const markAsRead = (messageId) => {
    const readMessage = Object.values(chatLog)
      .flat()
      .find((e) => e._id === messageId);
    readMessage["read"] = true;
    const readMessageDateString = new Date(
      readMessage.createdAt
    ).toLocaleDateString();

    setChatLog({
      ...chatLog,
      [readMessageDateString]: [...chatLog[readMessageDateString]].toSpliced(
        chatLog[readMessageDateString].findIndex(
          (obj) => obj._id === readMessage._id
        ),
        1,
        readMessage
      ),
    });
  };

  useEffect(() => {
    if (chatLog) {
      let target = document.getElementById("chat-log").children[0].children[0];
      observer.observe(target);
      if (scrolledToBottom) target.scrollIntoView();
    }
    return () => observer.disconnect();
  }, [chatLog]);

  useEffect(() => {
    // add reaction
    if (document.getElementById("chat-log")) {
      document.getElementById("chat-log").addEventListener("click", () => {
        if (document.getElementsByClassName("extended").length) {
          document
            .getElementsByClassName("extended")[0]
            .classList.remove("extended");
        }
      });
      return document
        .getElementById("chat-log")
        .removeEventListener("click", () => {
          if (document.getElementsByClassName("extended").length) {
            document
              .getElementsByClassName("extended")[0]
              .classList.remove("extended");
          }
        });
    }
  }, [recipientId]);

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
    // setReceipientId(profileData._id);
  };

  useEffect(() => fetchFriends, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    socket.on("newMessage", loadNewMessage);
    socket.on("newReaction", loadNewReaction);
    return () => {
      socket.off("newMessage", loadNewMessage);
      socket.off("newReaction", loadNewReaction);
    };
  }, [chatLog]);

  return (
    <div // chat page
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div // friend and user bar
        style={{
          display: "flex",
          gap: "5px",
          boxShadow: "0px 0px 4px black",
          zIndex: 4,
          // backgroundColor: "#e5e8e8",
          backgroundColor: "#f9e79f",
          // height: "5rem",
          minHeight: "4.8rem",
          maxHeight: "4.8rem",
          alignItems: "center"
        }}
      >
        <div id="friend-bar" style={{ flexGrow: 1 }}>
          {friendList.map((friend, i) => (
            <ChatProfilePhoto
              key={"friend" + i}
              profile={friend}
              recipientId={recipientId}
              setReceiptientId={setReceipientId}
            />
          ))}
        </div>
        <div id="settings-div" style={{ borderLeft: " 2px solid" }}>
          <ChatProfilePhoto
            key={"self"}
            profile={profileData}
            recipientId={recipientId}
            setReceiptientId={setReceipientId}
            friendProfile={false}
          />
        </div>
      </div>
      {recipientId === profileData._id ? (
        <UserProfile
          setLogState={setLogState}
          profileData={profileData}
          setProfileData={setProfileData}
          theme={theme}
          setTheme={setTheme}
        />
      ) : (
        <>
          <div id="chat-log">
            {loadingMessages && <LoadingChat />}
            {Object.keys(chatLog)
              .sort((y, x) =>
                String(x.createdAt).localeCompare(String(y.createdAt))
              )
              .map((date) => (
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
                        read={message.read}
                        markAsRead={markAsRead}
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
