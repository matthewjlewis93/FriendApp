import { useEffect, useState } from "react";
import ChatMessage from "../ChatMessage";
import ChatTextBar from "../ChatTextBar";
import DateDivider from "../DateDivider";
import Loading from "../Loading";
import LoadingChat from "../LoadingChat";
// import { socket } from "../../../socket";

export default function Chat({ socket, setLogState }) {
  const [friendList, setFriendList] = useState([]);
  // const [allMessages, setAllMessages] = useState([]);
  const [chatLog, setChatLog] = useState({});
  const [receipientId, setReceipientId] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);

  const loadNewMessage = (message) => {
    const newMessageDateString = new Date(
      message.createdAt
    ).toLocaleDateString();

    setChatLog(log => {
      if (log[newMessageDateString]) {
        return { ...log, [newMessageDateString]: [...log[newMessageDateString], message]}
      } else {
        return { ...log, [newMessageDateString]: [message]}
      }
    })

    document
      .getElementById("chat-log")
      .scrollTo(0, document.getElementById("chat-log").scrollHeight);
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
    setReceipientId(res.data[0].friendId);
    fetchMessages(res.data[0].friendId);
  };

  const sendLogout = async () => {
    let res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setLogState({ loading: false, loggedIn: false });
  };

  useEffect(() => fetchFriends, []);
  useEffect(() => {
    socket.on("newMessage", loadNewMessage);
    return () => {
      socket.off("newMessage");
    };
  }, [chatLog]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        // height: "calc(100svh - 20px)"
      }}
    >
      <div>
        <button onClick={sendLogout}>Logout</button>
      </div>
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
                    key={message._id}
                    messageReceived={message.fromId === receipientId}
                    toId={message.toId}
                    timeSent={new Date(message.createdAt).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                    messageContent={message.messageContent}
                  />
                ))}
              <DateDivider dateString={date} />
            </div>
          ))}
      </div>
      <ChatTextBar chatReceipientId={receipientId} setChatLog={setChatLog} />
    </div>
  );
}
