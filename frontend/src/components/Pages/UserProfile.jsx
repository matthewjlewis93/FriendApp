import { useState } from "react";
import Settings from "./Settings";
import EditProfile from "./EditProfile";

export default function UserProfile({
  setLogState,
  profileData,
  setProfileData,
  theme,
  setTheme
}) {
  const [userProfileContent, setUserProfileContent] = useState("edit-profile");

  const sendLogout = async () => {
    let res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setLogState({ loading: false, loggedIn: false });
  };

  return (
    <div id="user-profile" style={{ color: "var(--non-chat-text-color)" }}>
      <div style={{ display: "flex", justifyContent: "right", gap: "20px" }}>
        <button style={{ width: "fit-content" }} onClick={() => {setUserProfileContent(userProfileContent === "settings" ? "edit-profile" : "settings")}}>{userProfileContent === "settings" ? "Edit Profile": "Settings"}</button>
        <button style={{ width: "fit-content" }} onClick={sendLogout}>
          Logout
        </button>
      </div>
      {userProfileContent === "settings" ? <Settings theme={theme} setTheme={setTheme} /> : <EditProfile />}
    </div>
  );
}
