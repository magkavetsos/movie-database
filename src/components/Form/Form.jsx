"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import { getToday, isDateBeforeOrEqualToday } from "../../utils/utils";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) {
      return;
    }
    let base64Array = [];
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target && e.target.result) {
          const base64String = e.target.result.split(",")[1];
          base64Array.push(base64String);
        }
      };
      reader.readAsDataURL(f);
    });
    setSelectedFiles(base64Array);
    clearErrors("file");
  };

  const validateDate = (value) => {
    return (
      isDateBeforeOrEqualToday(value) || "Event date must be today or earlier"
    );
  };

  const onFormSubmit = async (_, e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    try {
      await action(formData, selectedFiles);
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
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
        {...register("releaseDate", {
          required: "Event date is required",
          validate: validateDate,
        })}
      />
      {errors.releaseDate && (
        <div className={styles.errormessage}>{errors.releaseDate.message}</div>
      )}

      <label>Upload File</label>
      <input
        type="file"
        multiple
        accept="image/*"
        {...register("file", {
          required: "At least one file is required",
          validate: {
            filesRequired: (files) =>
              files.length > 0 || "At least one file is required",
            validTypes: (files) => {
              for (const file of files) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                  return "Only JPG and PNG images are allowed";
                }
              }
              return true;
            },
          },
        })}
        onChange={handleFileChange}
      />
      {errors.file && (
        <div className={styles.errormessage}>{errors.file.message}</div>
      )}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "loading..." : "SUBMIT"}
      </button>
    </form>
  );
}
