"use client";
import { useRouter } from "next/navigation";
import styles from "./movieData.module.css";
import Link from "next/link";

export default function Content({
  movie: { title, description, release_date },
}) {
  const router = useRouter();
  const { pathname, query } = router;

  return (
    <div className={styles.movieContainer}>
      <div>
        Title: <span>{title}</span>
      </div>
      <div>
        Description: <span>{description}</span>
      </div>
      <div>
        Release Date: <span>{release_date}</span>
      </div>
      <Link
        href={{
          pathname: pathname,
          query: { ...query, editable: "true" },
        }}
      >
        <button>EDIT THIS MOVIE</button>
      </Link>
    </div>
  );
}
