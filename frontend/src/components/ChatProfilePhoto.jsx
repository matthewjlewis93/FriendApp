// import {image} from "";

export default function ChatProfilePhoto({}) {
  return (
    <span style={{ position: "relative" }}>
      <div
        className="photo-container"
        // style={{
        //   position: "absolute",
        //   top: "2px",
        //   left: "2px",
        //   borderRadius: "50%",
        //   border: "5px dashed green",
        //   width: "50px",
        //   height: "50px",
        //   zIndex: 1
        // }}
      ></div>
      <img
      className="profile-photo"
        alt="photo"
        
        src="../src/assets/20230920_170742.jpg"
      />
    </span>
  );
}
