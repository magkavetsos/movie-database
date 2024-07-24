"use server";
import { movieSchema } from "./validation/validation";
import { formDataToObject } from "../utils/utils";
import { revalidatePath } from "next/cache";

export async function addMovie(formData) {
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
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Date.now(), // ID does not auto-increment from server
        title,
        description,
        release_date: releaseDate,
        images: ["https://picsum.photos/200/300"],
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    revalidatePath("/");
    return response;
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
}
