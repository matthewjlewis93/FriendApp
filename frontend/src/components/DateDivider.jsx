export default function DateDivider({ dateString }) {
  return (
    <div
      // id={"date-divider-" + dateString}
      className="date-divider"
      style={{
        display: "flex",
        alignItems: "center",
        position: "sticky",
        top: "0px",
        margin: "2px -12px",
        padding: "0 12px",
        backgroundColor: "var(--chat-background)",
        boxShadow: "1px 1px 2px var(--chat-background)",
        color: "var(--non-chat-text-color)",
      }}
    >
      <hr
        color="#1b2631"
        style={{ flexGrow: 1, borderColor: "var(--non-chat-text-color)" }}
      />
      <h2
        style={{
          padding: "0px 10px",
          margin: 0,
          fontSize: "1.2rem",
          letterSpacing: "4px",
          fontFamily: "sans-serif",
          fontWeight: 500,
        }}
      >
        {dateString}
      </h2>
      <hr
        color="#1b2631"
        style={{ flexGrow: 1, borderColor: "var(--non-chat-text-color)" }}
      />
    </div>
  );
}
