export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100svw",
        height: "100svh",
        backgroundColor: "#00000055",
        position: "fixed",
        top: "0",
        right: "0",
        zIndex: "10"
      }}
    >
      <div className="loading-balls" id="loading-ball-1"></div>
      <div className="loading-balls" id="loading-ball-2"></div>
      <div className="loading-balls" id="loading-ball-3"></div>
    </div>
  );
}
