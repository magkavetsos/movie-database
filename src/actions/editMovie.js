"use server";
import { movieSchema } from "./validation/validation";
import { formDataToObject } from "../utils/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editMovie(formData, id, images) {
  let isErrorHandled = false;
  try {
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

    if (!images || images.length === 0) {
      throw new Error(`Validation error: No images provided.`);
    }

    const { title, description, releaseDate } = parsedData.data;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`,
      {
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
          images: images,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    revalidatePath("/");
    revalidatePath(`/movie/${id}`);
    return response.json();
  } catch (error) {
    console.error("Error editing movie:", error);
    isErrorHandled = true;
    throw new Error("Error editing movie. Please try again");
  } finally {
    if (!isErrorHandled) {
      redirect("/");
    }
  }
}
