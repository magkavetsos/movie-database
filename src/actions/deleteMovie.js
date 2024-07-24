"use server";

import { revalidatePath } from "next/cache";

export async function deleteMovie(id) {
  if (!id) {
    throw new Error(`Validation error: No ID found`);
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    revalidatePath("/");
    return response.json();
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
}
