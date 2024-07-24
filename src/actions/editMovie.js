"use server";
import { movieSchema } from "./validation";
import { formDataToObject } from "../utils/utils";

export async function editMovie(formData, id) {
  // Validate the form data
  const data = formDataToObject(formData);
  const parsedData = movieSchema.safeParse(data);

  if (!parsedData.success) {
    // Handle validation errors
    const errorMessages = parsedData.error.errors
      .map((err) => err.message)
      .join(", ");
    throw new Error(`Validation error: ${errorMessages}`);
  }

  const { title, description, releaseDate } = parsedData.data;

  try {
    const response = await fetch(`http://127.0.0.1:8000/movies/${id}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        description,
        release_date: releaseDate,
        images: ["https://picsum.photos/200/300"],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error editing movie:", error);
    throw error;
  }
}
