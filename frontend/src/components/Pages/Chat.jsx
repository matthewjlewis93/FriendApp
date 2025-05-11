import { useEffect, useState } from "react";
import ChatMessage from "../ChatMessage";
import ChatTextBar from "../ChatTextBar";
import DateDivider from "../DateDivider";
import Loading from "../Loading";
import LoadingChat from "../LoadingChat";

export default function Chat({ setLogState }) {
  const [friendList, setFriendList] = useState([]);
  const [chatLog, setChatLog] = useState([]);
  const [receipientId, setReceipientId] = useState("");
  const [loadingMessages, setLoadingMessages] = useState(true);

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
        {Object.keys(chatLog).map((date, i) => (
          <div
            key={date}
            style={{ display: "flex", flexDirection: "column-reverse" }}
          >
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
            <DateDivider dateString={date} />
          </div>
        ))}
      </div>
      <ChatTextBar chatReceipientId={receipientId} />
    </div>
  );
}
