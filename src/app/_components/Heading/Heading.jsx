import styles from "./heading.module.css";

export default function Heading({
  title = "Upcoming Movies",
  highlighted = "ONLINE STREAMING",
}) {
  return (
    <div className={styles.heading}>
      <span>{highlighted}</span>
      <h2>{title}</h2>
    </div>
  );
}