export default function PlaceholderPicture(props) {
  const height = props.height;
  const width = props.width;
  const initial = props.name[0] ? props.name[0].toUpperCase() : null;
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "var(--accent-lightpink)",
        borderRadius: "var(--br-sm)",
        height: `${height}`,
        width: `${width}`,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="profilepicture"
    >
      {initial}
    </div>
  );
}
