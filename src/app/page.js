import styles from "./page.module.css";
import MovieList from "./_components/MovieList";
import Empty from "./_components/Empty/Empty";
import Heading from "./_components/Heading/Heading";

async function getMovies() {
  const response = await fetch("http://127.0.0.1:8000/movies");
  return response.json();
  // return [
  //   {
  //     id: 0,
  //     title: "Tenet",
  //     description: "This is a movie",
  //     release_date: "2024-07-19",
  //     images: [
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //     ],
  //   },
  //   {
  //     id: 9,
  //     title: "Tenet",
  //     description: "This is a movie",
  //     release_date: "2024-07-19",
  //     images: [
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //     ],
  //   },
  //   {
  //     id: 8,
  //     title: "Tenet",
  //     description: "This is a movie",
  //     release_date: "2024-07-19",
  //     images: [
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //     ],
  //   },
  //   {
  //     id: 7,
  //     title: "Tenet",
  //     description: "This is a movie",
  //     release_date: "2024-07-19",
  //     images: [
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //     ],
  //   },
  //   {
  //     id: 6,
  //     title: "Tenet",
  //     description: "This is a movie",
  //     release_date: "2024-07-19",
  //     images: [
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //     ],
  //   },
  //   {
  //     id: 1,
  //     title: "Tenet",
  //     description: "This is a movie",
  //     release_date: "2024-07-19",
  //     images: [
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     title: "Tenet",
  //     description: "This is a movie",
  //     release_date: "2024-07-19",
  //     images: [
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //     ],
  //   },
  //   {
  //     id: 4,
  //     title: "Tenet",
  //     description: "This is a movie",
  //     release_date: "2024-07-19",
  //     images: [
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //     ],
  //   },
  //   {
  //     id: 3,
  //     title: "Tenet",
  //     description: "This is a movie",
  //     release_date: "2024-07-19",
  //     images: [
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //       "https://picsum.photos/200/300",
  //     ],
  //   },
  // ];
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
