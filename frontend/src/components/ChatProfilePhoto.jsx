// import {image} from "";

import { useState, useEffect } from "react";

export default function ChatProfilePhoto({ friend, setReceiptientId }) {
  const [img, setImg] = useState("../../public/person-fill.svg");

  const fetchPhoto = async () => {
    if (friend.profilePic) {
      let res = await fetch("/api/photos/" + friend.profilePic);
      console.log(res);
      res = await res.blob();
      const imgObjURL = URL.createObjectURL(res);
      setImg(imgObjURL);
    }
  };

  useEffect(() => fetchPhoto, []);

  return (
    <span
      onClick={(e) => {
        setReceiptientId(friend._id);
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
      <div className="photo-container"></div>
      <img loading="lazy" className="profile-photo" alt="photo" src={img} />
      matt
    </span>
  );
}
