// import {image} from "";

import { useState, useEffect } from "react";

export default function ChatProfilePhoto({
  profile,
  recipientId,
  setReceiptientId,
  friendProfile = true,
}) {
  const [img, setImg] = useState("../../person-fill.svg");
  const [expanded, setExpanded] = useState(false);

  const fetchPhoto = async () => {
    if (profile.profilePic) {
      let res = await fetch("/api/photos/" + profile.profilePic);
      res = await res.blob();
      const imgObjURL = URL.createObjectURL(res);
      setImg(imgObjURL);
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
    <span
      className={
        expanded
          ? "expanded-photo-container"
          : "photo-container " +
            (recipientId === profile._id ? "selected-profile" : "")
      }
      onClick={handleClick}
      style={{
        transition:
          "all 500ms allow-discrete, background-color 100ms" +
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
        src={img}
        style={{
          transition: "inherit",
          minHeight: expanded ? "8rem" : "2.5rem",
          minWidth: expanded ? "8rem" : "2.5rem",
          borderRadius: expanded ? "10px" : "50%"
        }}
      />
      <p style={{margin: 0, fontSize: expanded ? "1.5rem" : "0.6rem"}}>
      {profile.firstName}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          transition: "inherit",
          transitionDuration: "250ms",
          transitionDelay: expanded ? "250ms" : "0s",
          visibility: expanded ? "visible" : "hidden",
          opacity: expanded ? 1 : 0,
          height: expanded ? "auto" : "0px",
          overflow: "auto",
          // display: expanded ? "block" : "none"
        }}
      >
        <p style={{flexGrow: 1, padding: "2px 10px"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur
          finibus elementum. Nam dapibus purus eget condimentum vestibulum.
          Suspendisse rutrum id elit vel vehicula. Suspendisse quis dictum enim.
          Nulla facilisi. Aenean fringilla ac sem et varius. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Cras ultricies metus
          vel ex congue, vitae ultrices est venenatis. Sed mi nulla, egestas ac
          gravida blandit, imperdiet sit amet elit. Praesent ac semper purus, id
          condimentum neque. Ut eu sagittis tortor, quis dignissim elit. Duis
          non fermentum lacus. Pellentesque semper lacus sit amet varius
          pretium. In suscipit dapibus est ac pellentesque. Curabitur
          ullamcorper orci velit, id aliquam erat ornare sed. In at facilisis
          mauris, ut hendrerit sapien. Curabitur arcu nulla, condimentum ac
          bibendum ac, luctus id libero. Proin lobortis nec sapien in placerat.
          Mauris non diam urna. Cras dictum, nunc at imperdiet sodales, mauris
          dolor vehicula enim, nec interdum enim massa in lacus. Praesent felis
          nisl, faucibus id turpis eget, vehicula commodo leo. Nullam fermentum
          lorem libero, non interdum neque scelerisque et. Aenean volutpat enim
          non congue tristique. Praesent a venenatis leo. Quisque pulvinar
          facilisis eros, sed ultrices lorem. Sed molestie molestie erat non
          malesuada. Vestibulum aliquet vel neque at dapibus. Nam ac ligula
          consectetur, rhoncus massa sed, maximus mi. Duis eget semper sem.
          Phasellus diam diam, placerat et suscipit et, varius scelerisque
          mauris. Morbi placerat mi sed ipsum aliquam vulputate. Etiam mattis
          euismod quam ut commodo. Vestibulum dictum non ipsum eget ornare. Ut
          semper volutpat ligula sit amet aliquam. Phasellus at tortor congue,
          ultricies velit eget, eleifend felis. Proin placerat erat at neque
          dictum auctor. Praesent pharetra lectus sit amet neque egestas
          porttitor.
        </p>
        <button style={{position: "absolute", top: "2px", right: "2px", width: "1.5rem", height: "1.5rem"}} onClick={() => setExpanded(false)}>X</button>
      </div>
    </span>
  );
}
