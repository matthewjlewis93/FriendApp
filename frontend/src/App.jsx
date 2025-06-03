import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

import Chat from "./components/Pages/Chat";
import Login from "./components/Pages/Login";
import Loading from "./components/Loading";
const URL = "https://0jc2qnnc-8001.usw3.devtunnels.ms";

function App() {
  const [logState, setLogState] = useState({ loading: true, loggedIn: null });
  const [profileData, setProfileData] = useState(null);
  // const [userMessages, setUserMessages] = useState([]);
  const [socket, setSocket] = useState({ connected: false });

  const loadFriends = async () => {
    let res = await fetch("/api/profile/");
    res = await res.json();
    if (res.success) {
      if (!socket.connected) {
        setSocket(
          io(URL, {
            query: {
              userId: res.userId,
            },
          })
        );
      }
      setProfileData(res.fullProfile);
      setLogState({ loading: false, loggedIn: true });
    } else {
      setLogState({ loading: false, loggedIn: false });
    }
  };

  useEffect(() => loadFriends, [logState.loggedIn]);

  return (
    <>
      {logState.loading && <Loading />}
      {logState.loggedIn === false && <Login setLogState={setLogState} />}
      {logState.loggedIn === true && <Chat socket={socket} setLogState={setLogState} profileData={profileData}/>}
    </>
  );
}

export default App;
