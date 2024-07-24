import Image from "next/image";
import { ThumbsUp, Clock2 } from "lucide-react";
import styles from "./movie.module.css";
import { getYearFromDate, base64ToImageUrl } from "../../utils/utils";
import MovieActions from "./MovieActions";
import Link from "next/link";

export default function Movie({ movie }) {
  const renderContent = () => (
    <div className={styles.movieContent}>
      <Link className={styles.title} href={`/movie/${movie.id}`}>
        {movie.title}
      </Link>
      <div className={styles.date}>{getYearFromDate(movie.release_date)}</div>
      <div className={styles.quality}>HD</div>
      <div className={styles.info}>
        <Clock2 color="#e4d804" size={14} />
        <div>128min</div>
        <ThumbsUp color="#e4d804" size={14} />
        <div>3.5 star</div>
      </div>
    </div>
  );

  const renderImageContent = () => (
    <div className={styles.movieImage}>
      <Link href={`/movie/${movie.id}`}>
        <Image
          src={base64ToImageUrl(movie.images[0])}
          width={300}
          height={450}
          alt="movie_name"
        />
      </Link>
      <MovieActions movie={movie} />
    </div>
  );

  return (
    <div className={styles.movie}>
      <div className={styles.moviePoster}>
        {renderImageContent()}
        {renderContent()}
      </div>
    </div>
  );
}
