export default function ChatTextBar() {
  return (
    <div
      style={{
        // height: "30px",
        width: "100svw",
        position: "fixed",
        bottom: "0px",
        left: "0px",
        backgroundColor: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <textarea
        style={{
          flexGrow: 1,
          margin: "10px 15px",
          borderRadius: "8px",
          paddingLeft: "10px",
          // width: "75%",
          border: "1px solid",
          maxHeight: "150px",
          fieldSizing: "content",
          resize: "none",
          fontSize: "normal"
        }}
      />
      <button style={{fontSize: "normal"}} onClick={(e) => e.preventDefault()}>Send</button>
    </div>
  );
}
