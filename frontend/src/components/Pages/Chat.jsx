import { useEffect, useState } from "react";
import ChatMessage from "../ChatMessage";
import ChatTextBar from "../ChatTextBar";
import DateDivider from "../DateDivider";
import Loading from "../Loading";

export default function Chat(
  {
    // userId = "67f456bc98f3888cdf8f7a71",
    // receipientId = "67f456d798f3888cdf8f7a75",
    // receipientId = "67f456bc98f3888cdf8f7a71",
  }
) {
  const [friendList, setFriendList] = useState([]);
  const [chatLog, setChatLog] = useState([]);
  const [receipientId, setReceipientId] = useState("");

  const fetchMessages = async (id) => {
    if (id !== "") {
      let res = await fetch("/api/message/" + id);
      res = await res.json();
      res.sort((y, x) =>
        String(x.createdAt).localeCompare(String(y.createdAt))
      );
      const chatByDate = Object.groupBy(res, ({ createdAt }) =>
        new Date(createdAt).toLocaleDateString()
      );
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
      <div id="chat-log">

      {/* {Object.keys(chatLog).forEach((date, i) => {
        document
          .getElementById("chat-log")
          .prepend(<DateDivider dateString={date} />);
      })} */}



        {Object.keys(chatLog).map((date, i) => (
          <div key={date}>
            <DateDivider dateString={date} />
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
          </div>
        ))}
      </div>
      <ChatTextBar chatReceipientId={receipientId} />
    </div>
  );
}
