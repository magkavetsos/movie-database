"use client";
import { useState, useEffect } from "react";
import { Trash2, Pencil, Star } from "lucide-react";
import styles from "./movie.module.css";
import Link from "next/link";
import { deleteMovie } from "../../actions/deleteMovie";

export default function MovieActions({ movie }) {
  const [favorites, setFavorites] = useState([]);

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

  const onDelete = async (id) => {
    try {
      await deleteMovie(id);
    } catch (error) {
      console.error("Failed to edit movie:", error);
    }
  };

  return (
    <div className={styles.actions}>
      <div className={styles.actionButtons}>
        <a
          onClick={() => {
            onDelete(movie.id);
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
  );
}
