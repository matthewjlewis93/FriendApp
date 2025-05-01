export default function Loading() {
  return (
    <div
    style={{position: "fixed",
        top: "40vh",
        left: 'calc(50vw - 85px)'
    }}
    >
      <div className="loading-balls" id="loading-ball-1"></div>
      <div className="loading-balls" id="loading-ball-2"></div>
      <div className="loading-balls" id="loading-ball-3"></div>
    </div>
  );
}
