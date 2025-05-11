import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/Pages/Chat";
import Login from "./components/Pages/Login";
import Loading from "./components/Loading";

function App() {
  const [logState, setLogState] = useState({ loading: true, loggedIn: null });

  const loadFriends = async () => {
    let res = await fetch("/api/profile/friends");
    res = await res.json();
    if (res.success) {
      setLogState({ loading: false, loggedIn: true });
    } else {
      setLogState({ loading: false, loggedIn: false });
    }
  };

  useEffect(() => loadFriends,[]);

  return (
    <>
      {logState.loading && <Loading />}
      {logState.loggedIn === false && <Login setLogState={setLogState} />}
      {logState.loggedIn && <Chat setLogState={setLogState} />}
    </>
  );
}

export default App;
