import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
// import { socket } from "../socket";

import Chat from "./components/Pages/Chat";
import Login from "./components/Pages/Login";
import Loading from "./components/Loading";
const URL = "https://0jc2qnnc-8001.usw3.devtunnels.ms";

function App() {
  const [logState, setLogState] = useState({ loading: true, loggedIn: null });
  // const [userMessages, setUserMessages] = useState([]);
  const [socket, setSocket] = useState({connected: false});

  const loadFriends = async () => {
    let res = await fetch("/api/profile/friends");
    res = await res.json();
    if (res.success) {
      setLogState({ loading: false, loggedIn: true });
      if (!socket.connected) {
        setSocket(io(URL, {
          query: {
            userId: res.userId,
          },
        }))
      }

    } else {
      setLogState({ loading: false, loggedIn: false });
    }
  };

  useEffect(() => loadFriends, [logState.loggedIn]);

  return (
    <>
      {logState.loading && <Loading />}
      {logState.loggedIn === false && <Login setLogState={setLogState} />}
      {logState.loggedIn && <Chat socket={socket} setLogState={setLogState} />}
    </>
  );
}

export default App;
