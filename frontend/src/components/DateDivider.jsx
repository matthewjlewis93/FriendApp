export default function DateDivider({ dateString }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <hr color="#1b2631" style={{ flexGrow: 1 }} />
      <h2 style={{ padding: "0px 10px" }}>{dateString}</h2>
      <hr color="#1b2631" style={{ flexGrow: 1 }} />
    </div>
  );
}
