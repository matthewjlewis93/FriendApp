export default function EditProfile ({profileData, setProfileData}) {
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
        setProfileData(resJson.data);
        e.target.form.reset();
      }
    };
    
    return (
      <>
          <h1>Edit Profile</h1>
      <form
        style={{
          flexGrow: 1,
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
          <input name="firstName" maxLength={16} />
        </label>
        <br />

        <button onClick={sendUpdate}>Save Changes</button>
      </form></>
    );
}