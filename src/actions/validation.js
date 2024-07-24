import { z } from "zod";

// Define the schema for movie data validation
export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  releaseDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, use YYYY-MM-DD"),
});

export function validateMovieData(data) {
  return movieSchema.safeParse(data);
}
