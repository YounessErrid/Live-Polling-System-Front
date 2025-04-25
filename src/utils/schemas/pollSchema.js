import { z } from "zod";

export const pollSchema = z.object({
  question: z.string().min(1, "Poll question is required"),
  choices: z
    .array(z.string().min(1, "Choice cannot be empty"))
    .min(2, "At least 2 choices are required"),
});