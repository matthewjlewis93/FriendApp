import { useState, useEffect } from "react";

export default function EditProfile({ profileData, setProfileData }) {
  const [displayImg, setDisplayImg] = useState("../../person-fill.svg");
  const [imgUpdated, setImgUpdated] = useState(false);

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

  const fetchPhoto = async () => {
    if (profileData.profilePic) {
      let res = await fetch("/api/photos/" + profileData.profilePic);
      res = await res.blob();
      const imgObjURL = URL.createObjectURL(res);
      setDisplayImg(imgObjURL);
    }
  };

  const updatePhoto = (e) => {
    e.preventDefault();
    document.querySelector("input[name='profile-photo']").click();
  };

  const updatePreviewImg = (e) => {
    const [file] = e.target.files;
    if (file) {
      setDisplayImg(URL.createObjectURL(file));
      setImgUpdated(true);
    }
  };

  const cancelChanges = (e) => {
    e.preventDefault();
    e.target.form.reset();
    if (imgUpdated) {
      setDisplayImg("../../person-fill.svg");
      fetchPhoto();
      setImgUpdated(false);
    }
  };

  useEffect(() => fetchPhoto, []);

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
        <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          Update Profile Picture:
          <button
            id="photo-btn"
            style={{
              padding: 0,
              paddingBlock: 0,
              paddingInline: 0,
              backgroundImage: `url(${displayImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "7rem",
              height: "7rem",
              border: "2px solid var(--non-chat-text-color)",
              borderRadius: "5px",
            }}
            onClick={updatePhoto}
          ></button>
        </label>
        <input
          hidden
          name="profile-photo"
          type="file"
          accept="image/*"
          style={{ fontSize: "0.8rem" }}
          onChange={updatePreviewImg}
        />
        <p style={{fontSize: "0.6rem", margin: "5px", opacity: imgUpdated ? 1 : 0}}>(Note: picture may be cropped differently when saved)</p>
        <br />
        <label>
          First Name: <br />
          <input name="firstName" maxLength={16} />
        </label>
        <br />
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={sendUpdate}>Save Changes</button>
          <button onClick={cancelChanges}>Cancel Changes</button>
        </div>
      </form>
    </>
  );
}
