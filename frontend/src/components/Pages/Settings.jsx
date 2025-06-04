export default function Settings() {
  const sendLogout = async () => {
    let res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setLogState({ loading: false, loggedIn: false });
  };

  return (
    <div style={{ flexGrow: 1 }}>
      <h1>Settings</h1>
      <button onClick={sendLogout}>Logout</button>
    </div>
  );
}
