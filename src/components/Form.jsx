"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import { getToday } from "../utils/utils";

export default function Form({ action, movie }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: movie
      ? {
          title: movie.title,
          description: movie.description,
          releaseDate: movie.release_date,
        }
      : { releaseDate: getToday() },
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    clearErrors("file");
  };

  const onFormSubmit = (_, e) => {
    const formData = new FormData(e.target);
    action(formData);
  };

  return (
    <form
      action={action}
      onSubmit={handleSubmit(onFormSubmit)}
      className={styles.formContainer}
    >
      <label>Title</label>
      <input
        type="text"
        {...register("title", {
          required: "Title is required",
          maxLength: {
            value: 40,
            message: "Title cannot exceed 40 characters",
          },
        })}
      />
      {errors.title && (
        <div className={styles.errormessage}>{errors.title.message}</div>
      )}

      <label>Description</label>
      <textarea
        {...register("description", {
          required: "Description is required",
          maxLength: {
            value: 255,
            message: "Description cannot exceed 255 characters",
          },
        })}
      />
      {errors.description && (
        <div className={styles.errormessage}>{errors.description.message}</div>
      )}

      <label>Release Date</label>
      <input
        type="date"
        {...register("releaseDate", { required: "Event date is required" })}
      />

      <label>Upload File</label>
      <input
        type="file"
        multiple
        {...register("file", {
          required: "At least one file is required",
        })}
        onChange={handleFileChange}
      />
      {errors.file && (
        <div className={styles.errormessage}>{errors.file.message}</div>
      )}
      <div className={styles.fileNames}>
        {selectedFiles.length > 0 && (
          <ul>
            {selectedFiles.map((file, index) => (
              <React.Fragment key={index}>
                <li key={`li-${index}`}>
                  {file.name.length > 25
                    ? `${file.name.substring(0, 25)}...`
                    : file.name}
                </li>
              </React.Fragment>
            ))}
          </ul>
        )}
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  );
}
