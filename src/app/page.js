import styles from "./page.module.css";
import MovieList from "./_components/MovieList";
import Empty from "./_components/Empty/Empty";
import Heading from "./_components/Heading/Heading";

async function getMovies() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`);
  return response.json();
}

export default async function Home() {
  try {
    const movies = await getMovies();
    return (
      <>
        <Heading />
        <div className={styles.moviesContainer}>
          {movies.length > 0 ? <MovieList movies={movies} /> : <Empty />}
        </div>
      </>
    );
  } catch (e) {
    console.error(e);
    throw new Error("Movies retrieval went wrong. Please try again later.");
  }
}
