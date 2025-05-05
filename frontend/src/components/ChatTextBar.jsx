export default function ChatTextBar() {
  return (
    <div
      style={{
        height: "fit-content",
        width: "100svw",
        position: "fixed",
        bottom: "0px",
        left: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "var(--page-background)"
      }}
    >
      <textarea
        style={{
          flexGrow: 1,
          margin: "10px 15px",
          borderRadius: "8px",
          paddingLeft: "10px",
          border: "1px solid",
          maxHeight: "150px",
          fieldSizing: "content",
          resize: "none",
          fontSize: "1rem",
        }}
      />
      <button
        style={{
          fontSize: "1rem",
          margin: "0 15px 0 5px",
          backgroundColor: "#f9e79f",
          border: "1px solid",
          borderRadius: "5px",
          padding: "3px 9px"
        }}
        onClick={(e) => e.preventDefault()}
      >
        Send
      </button>
    </div>
  );
}
