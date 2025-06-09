// import {image} from "";

import { useState, useEffect } from "react";

export default function ChatProfilePhoto({
  profileId,
  profileName,
  profilePic,
  recipientId,
  setReceiptientId,
}) {
  const [img, setImg] = useState("../../person-fill.svg");

  const fetchPhoto = async () => {
    console.log(profilePic);
    if (profilePic) {
      let res = await fetch("/api/photos/" + profilePic);
      res = await res.blob();
      const imgObjURL = URL.createObjectURL(res);
      setImg(imgObjURL);
     }
  };

  useEffect(() => {fetchPhoto()}, [profilePic]);

  return (
    <span
      className={
        "photo-container " +
        (recipientId === profileId ? "selected-profile" : "")
      }
      onClick={(e) => {
        setReceiptientId(profileId);
      }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2px solid #00000066",
        margin: "3px",
        width: "fit-content",
        borderRadius: "5px",
      }}
    >
      <img loading="lazy" className="profile-photo" alt="photo" src={img} />
      {profileName}
    </span>
  );
}
