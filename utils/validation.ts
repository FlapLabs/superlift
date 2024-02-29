import { z } from "zod";

export const dietFormSchema = z.object({
  age: z
    .number()
    .min(18, { message: "Must be 18 or older" })
    .max(120, { message: "Seems a bit high..." }),

  gender: z.enum(["male", "female"]),

  weight: z.number().positive({ message: "Weight must be positive" }),

  height: z.number().positive({ message: "Height must be positive" }),

  activityLevel: z.enum([
    "Sedentary",
    "Lightly Active",
    "Moderately Active",
    "Very Active",
  ]),

  dietaryPreferences: z.string().optional(),

  healthConditions: z.string().optional(),
});
