import Link from "next/link";
import styles from "./styledLink.module.css";

const StyledLink = ({ href, children }) => (
  <Link href={href}>
    <span className={styles.link}>{children}</span>
  </Link>
);

export default StyledLink;
