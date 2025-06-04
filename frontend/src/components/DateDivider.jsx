export default function DateDivider({ dateString }) {
  return (
    <div style={{ display: "flex", alignItems: "center", position: "sticky", top: '0px', margin: "10px -12px", padding: "0 12px", backgroundColor: "var(--chat-background)" }}>
      <hr color="#1b2631" style={{ flexGrow: 1 }} />
      <h2 style={{ padding: "0px 10px", margin: 0, fontSize: "1.2rem", letterSpacing: "4px" }}>{dateString}</h2>
      <hr color="#1b2631" style={{ flexGrow: 1 }} />
    </div>
  );
}
