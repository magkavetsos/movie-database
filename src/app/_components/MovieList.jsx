import Movie from "../../components/Movie";

export default function MovieList({ movies }) {
  return movies.map((movie) => <Movie movie={movie} key={movie.id} />);
}
