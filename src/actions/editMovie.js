"use server";
import { movieSchema } from "./validation/validation";
import { formDataToObject } from "../utils/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editMovie(formData, id) {
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
          images: ["https://picsum.photos/200/300"],
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
    throw error;
  } finally {
    if (!isErrorHandled) {
      redirect("/");
    }
  }
}
