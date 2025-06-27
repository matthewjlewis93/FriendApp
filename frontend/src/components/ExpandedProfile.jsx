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
      <p style={{ fontSize: "1.5rem", margin: "2px" }}>{profile.firstName}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          overflow: "auto",
          backgroundColor: "#ffffff44",
          margin: "4px"
        }}
      >
        <p style={{ flexGrow: 1, padding: "2px 10px", margin: "4px" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur
          finibus elementum. Nam dapibus purus eget condimentum vestibulum.
          Suspendisse rutrum id elit vel vehicula. Suspendisse quis dictum enim.
          Nulla facilisi. Aenean fringilla ac sem et varius. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Cras ultricies metus
          vel ex congue, vitae ultrices est venenatis. Sed mi nulla, egestas ac
          gravida blandit, imperdiet sit amet elit. Praesent ac semper purus, id
          condimentum neque. Ut eu sagittis tortor, quis dignissim elit. Duis
          non fermentum lacus. Pellentesque semper lacus sit amet varius
          pretium. In suscipit dapibus est ac pellentesque. Curabitur
          ullamcorper orci velit, id aliquam erat ornare sed. In at facilisis
          mauris, ut hendrerit sapien. Curabitur arcu nulla, condimentum ac
          bibendum ac, luctus id libero. Proin lobortis nec sapien in placerat.
          Mauris non diam urna. Cras dictum, nunc at imperdiet sodales, mauris
          dolor vehicula enim, nec interdum enim massa in lacus. Praesent felis
          nisl, faucibus id turpis eget, vehicula commodo leo. Nullam fermentum
          lorem libero, non interdum neque scelerisque et. Aenean volutpat enim
          non congue tristique. Praesent a venenatis leo. Quisque pulvinar
          facilisis eros, sed ultrices lorem. Sed molestie molestie erat non
          malesuada. Vestibulum aliquet vel neque at dapibus. Nam ac ligula
          consectetur, rhoncus massa sed, maximus mi. Duis eget semper sem.
          Phasellus diam diam, placerat et suscipit et, varius scelerisque
          mauris. Morbi placerat mi sed ipsum aliquam vulputate. Etiam mattis
          euismod quam ut commodo. Vestibulum dictum non ipsum eget ornare. Ut
          semper volutpat ligula sit amet aliquam. Phasellus at tortor congue,
          ultricies velit eget, eleifend felis. Proin placerat erat at neque
          dictum auctor. Praesent pharetra lectus sit amet neque egestas
          porttitor.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur
          finibus elementum. Nam dapibus purus eget condimentum vestibulum.
          Suspendisse rutrum id elit vel vehicula. Suspendisse quis dictum enim.
          Nulla facilisi. Aenean fringilla ac sem et varius. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Cras ultricies metus
          vel ex congue, vitae ultrices est venenatis. Sed mi nulla, egestas ac
          gravida blandit, imperdiet sit amet elit. Praesent ac semper purus, id
          condimentum neque. Ut eu sagittis tortor, quis dignissim elit. Duis
          non fermentum lacus. Pellentesque semper lacus sit amet varius
          pretium. In suscipit dapibus est ac pellentesque. Curabitur
          ullamcorper orci velit, id aliquam erat ornare sed. In at facilisis
          mauris, ut hendrerit sapien. Curabitur arcu nulla, condimentum ac
          bibendum ac, luctus id libero. Proin lobortis nec sapien in placerat.
          Mauris non diam urna. Cras dictum, nunc at imperdiet sodales, mauris
          dolor vehicula enim, nec interdum enim massa in lacus. Praesent felis
          nisl, faucibus id turpis eget, vehicula commodo leo. Nullam fermentum
          lorem libero, non interdum neque scelerisque et. Aenean volutpat enim
          non congue tristique. Praesent a venenatis leo. Quisque pulvinar
          facilisis eros, sed ultrices lorem. Sed molestie molestie erat non
          malesuada. Vestibulum aliquet vel neque at dapibus. Nam ac ligula
          consectetur, rhoncus massa sed, maximus mi. Duis eget semper sem.
          Phasellus diam diam, placerat et suscipit et, varius scelerisque
          mauris. Morbi placerat mi sed ipsum aliquam vulputate. Etiam mattis
          euismod quam ut commodo. Vestibulum dictum non ipsum eget ornare. Ut
          semper volutpat ligula sit amet aliquam. Phasellus at tortor congue,
          ultricies velit eget, eleifend felis. Proin placerat erat at neque
          dictum auctor. Praesent pharetra lectus sit amet neque egestas
          porttitor.
        </p>
      </div>
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
