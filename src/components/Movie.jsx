"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ThumbsUp, Clock2, Trash2, Pencil, Star } from "lucide-react";
import styles from "./movie.module.css";
import { getYearFromDate } from "../utils/utils";
import Link from "next/link";

export default function Movie({ movie }) {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    storedFavorites && setFavorites(JSON.parse(storedFavorites));
  }, []);

  const addFavorite = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeFavorite = (movieId) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const deleteMovie = async (id) => {
    try {
      // const response = await fetch(`http://127.0.0.1:8000/movie/${id}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to delete the movie");
      // } //TODO: uncomment this

      // const result = await response.json(); //TODO: uncomment this
      const result = {
        id: 0,
        title: "Tenet",
        description: "This is a movie",
        release_date: "2024-07-19",
        images: [
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
          "https://picsum.photos/200/300",
        ],
      };
      router.refresh();
      return result;
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw error;
    }
  };

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
          src={movie.images[0]}
          width={300}
          height={450}
          alt="movie_name"
          style={{ cursor: "pointer" }}
        />
      </Link>
      <div className={styles.actions}>
        <div className={styles.actionButtons}>
          <a
            onClick={() => {
              deleteMovie(movie.id);
            }}
          >
            <Trash2 color="#fff" />
          </a>
          <Link href={`/movie/${movie.id}?editable=true`}>
            <Pencil color="#fff" />
          </Link>
        </div>
        <div className={styles.favoriteActions}>
          <a
            onClick={() => {
              isFavorite(movie.id)
                ? removeFavorite(movie.id)
                : addFavorite(movie);
            }}
          >
            <Star
              color={isFavorite(movie.id) ? "#e4d804" : "#fff"}
              fill={isFavorite(movie.id) ? "#e4d804" : "#fff"}
            />
          </a>
        </div>
      </div>
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
