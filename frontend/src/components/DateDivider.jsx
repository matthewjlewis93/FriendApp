export default function DateDivider({ dateString }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <hr color="#1b2631" style={{ flexGrow: 1 }} />
      <p style={{ padding: "0px 5px" }}>{dateString}</p>
      <hr color="#1b2631" style={{ flexGrow: 1 }} />
    </div>
  );
}
