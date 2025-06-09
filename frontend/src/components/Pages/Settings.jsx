export default function Settings({ setLogState, profileData, setProfileData }) {
  const sendLogout = async () => {
    let res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setLogState({ loading: false, loggedIn: false });
  };

  const sendUpdate = async (e) => {
    e.preventDefault();
    const settingsForm = new FormData(e.target.form);
    settingsForm.append("userId", profileData._id);
    settingsForm.append("profilePic", profileData.profilePic);

    const res = await fetch("/api/profile/edit", {
      method: "PATCH",
      body: settingsForm,
    });
    const resJson = await res.json();
    if (resJson.success) {
      console.log(resJson.data);
      setProfileData(resJson.data);
    }
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
