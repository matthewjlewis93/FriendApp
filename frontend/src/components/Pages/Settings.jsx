export default function Settings({ setLogState }) {
  const sendLogout = async () => {
    let res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setLogState({ loading: false, loggedIn: false });
  };

  const sendUpdate = async (e) => {
    e.preventDefault();
    console.dir(new FormData(e.target.form));
    const res = await fetch("/api/profile/edit", {
      method: "PATCH",
      body: new FormData(e.target.form),
    });
  };

  return (
    <>
      <form
        id="settings"
        style={{
          flexGrow: 1,
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Settings</h1>
        <label>
          Profile Picture: <br />
          <input
            name="profile-photo"
            type="file"
            accept="image/*"
            style={{ fontSize: "0.8rem" }}
          />
        </label>
        <br />
        <label>
          First Name: <br />
          <input name="firstName" />
        </label>
        <br />

        <button onClick={sendUpdate}>Save Changes</button>
      </form>
      <button onClick={sendLogout}>Logout</button>
    </>
  );
}
