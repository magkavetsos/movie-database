import Heading from "../../../app/_components/Heading/Heading";
import Image from "next/image";
import styles from "./page.module.css";
import MovieData from "./_components/MovieData";
import { base64ToImageUrl } from "../../../utils/utils";

async function getMovieById(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`
  );
  return response.json();
}

export async function generateStaticParams() {
  const movies = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`).then(
    (res) => res.json()
  );

  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
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
              src={base64ToImageUrl(movie.images[0])}
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
    throw new Error("Movie retrieval went wrong. Please try again later.");
  }
}
