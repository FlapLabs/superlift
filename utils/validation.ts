import { z } from "zod";
import { Gender, ActivityLevel } from "./enums";

export const dietFormSchema = z.object({
  age: z
    .number({
      required_error: "Age is required!",
      invalid_type_error: "Age should be number!",
    })
    .min(18, { message: "Age must be 18 or older" })
    .max(120, { message: "Age seems a bit high..." }),

  gender: z.enum([Gender.MALE, Gender.FEMALE]),

  weight: z
    .number({
      required_error: "Weight is required",
      invalid_type_error: "Weight should be number!",
    })
    .positive({ message: "Weight must be positive" }),

  height: z
    .number({
      required_error: "Height is required!",
      invalid_type_error: "Height should be number!",
    })
    .positive({ message: "Height must be positive" }),

  activityLevel: z.enum([
    ActivityLevel.SEDENTARY,
    ActivityLevel.LIGHTLY_ACTIVE,
    ActivityLevel.MODERATELY_ACTIVE,
    ActivityLevel.VERY_ACTIVE,
  ]),

  dietaryPreferences: z.string().optional(),

  healthConditions: z.string().optional(),
});
