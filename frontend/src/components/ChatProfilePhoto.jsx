// import {image} from "";

export default function ChatProfilePhoto({}) {
  return (
    <span style={{ position: "relative" }}>
      <div
        className="photo"
        style={{
          position: "absolute",
          top: "2px",
          left: "2px",
          borderRadius: "50%",
          border: "5px dashed green",
          width: "50px",
          height: "50px",
          zIndex: 1
        }}
      ></div>
      <img
        alt="photo"
        style={{
          position: "absolute",
          height: "60px",
          width: "60px",
          borderRadius: "50%",
          zIndex: 0,
          top: "0",
          border: "2px solid #ffffff00",
          objectFit: "cover"
        }}
        src="../src/assets/20230920_170742.jpg"
      />
    </span>
  );
}
