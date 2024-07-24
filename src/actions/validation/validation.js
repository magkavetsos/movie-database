import { z } from "zod";
import { isDateBeforeOrEqualToday } from "../../utils/utils";

// Define the schema for movie data validation
export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  releaseDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, use YYYY-MM-DD")
    .refine((dateString) => isDateBeforeOrEqualToday(dateString), {
      message: "Event date must be today or earlier",
    }),
});

export function validateMovieData(data) {
  return movieSchema.safeParse(data);
}
