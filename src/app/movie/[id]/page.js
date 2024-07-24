import Heading from "../../../app/_components/Heading/Heading";
import Image from "next/image";
import styles from "./page.module.css";
import MovieData from "./_components/MovieData";

async function getMovieById(id) {
  const response = await fetch(`http://127.0.0.1:8000/movies/${id}`);
  return response.json();
}

export async function generateMetadata({ params }) {
  const id = params.id;
  const movie = await getMovieById(id);

  return {
    title: movie.title,
    description: movie.description,
  };
}

export default async function Movie({
  params: { id },
  searchParams: { editable },
}) {
  try {
    const movie = await getMovieById(id);

    return (
      <>
        <Heading title={movie.title} highlighted="MOVIE DETAILS" />
        <div className={styles.movieDetails}>
          <div>
            <Image
              src={movie.images[0]}
              width={300}
              height={450}
              alt={movie.title}
            />
          </div>
          <MovieData editable={editable} movie={movie} />
        </div>
      </>
    );
  } catch (e) {
    console.error(e);
    <div>Something went wrong. Try again</div>;
  }
}
