// import {image} from "";

import { useState, useEffect } from "react";
import ExpandedProfile from "./ExpandedProfile";

export default function ChatProfilePhoto({
  profile,
  recipientId,
  setReceiptientId,
  friendProfile = true,
}) {
  const [displayImg, setDisplayImg] = useState("../../person-fill.svg");
  const [expanded, setExpanded] = useState(false);

  const fetchPhoto = async () => {
    if (profile.profilePic) {
      let res = await fetch("/api/photos/" + profile.profilePic);
      res = await res.blob();
      const imgObjURL = URL.createObjectURL(res);
      setDisplayImg(imgObjURL);
    }
  };

  const handleClick = () => {
    setReceiptientId(profile._id);
    if (recipientId === profile._id && friendProfile && !expanded) {
      setExpanded(true);
    }
  };

  useEffect(() => {
    fetchPhoto();
  }, [profile.profilePic]);

  return (
    <>
      <span
        className={
          "photo-container " +
          (recipientId === profile._id ? "selected-profile" : "")
        }
        onClick={handleClick}
        style={{
          transition:
            "all 300ms allow-discrete, background-color 100ms, color 120ms" +
            (expanded ? ", position 0s 500ms" : ", position 0s"),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid #00000066",
          borderRadius: "5px",
        }}
      >
        <img
          loading="lazy"
          className="profile-photo"
          alt="photo"
          src={displayImg}
          style={{
            transition: "inherit",
            minHeight: "2.5rem",
            minWidth: "2.5rem",
            borderRadius: "50%",
          }}
        />
        <p style={{ margin: "0 2px", fontSize: "0.6rem" }}>
          {profile.firstName}
        </p>
      </span>
      <ExpandedProfile
        profile={profile}
        expanded={expanded}
        setExpanded={setExpanded}
        displayImg={displayImg}
      />
    </>
  );
}
