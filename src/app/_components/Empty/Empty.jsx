import Link from "next/link";
import styles from "./empty.module.css";

export default function Empty() {
  return (
    <div className={styles.empty}>
      <h2>There is no movies for now.</h2>
      <h4>Try adding yours now!</h4>
      <Link href="/movie/add">
        <button>ADD MOVIE</button>
      </Link>
    </div>
  );
}
