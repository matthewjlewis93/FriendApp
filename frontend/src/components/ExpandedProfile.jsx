export default function ExpandedProfile({
  profile,
  expanded,
  setExpanded,
  displayImg,
}) {
  return (
    <div
      className={"expanded-photo-container" + (expanded ? " displayed" : "")}
    >
      <img
        loading="lazy"
        className="profile-photo"
        alt={`${profile.firstName}'s photo`}
        style={{ height: "8rem", width: "8rem", borderRadius: "10px" }}
        src={displayImg}
      />
      <p style={{ fontSize: "1.5rem" }}>{profile.firstName}</p>

      <button
        style={{
          position: "absolute",
          top: "2px",
          right: "2px",
          width: "1.5rem",
          height: "1.5rem",
        }}
        onClick={() => setExpanded(false)}
      >
        X
      </button>
    </div>
  );
}
