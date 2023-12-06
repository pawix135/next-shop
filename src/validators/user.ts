import { z } from "zod";

export const emailSchema = z.string().email().max(128);
export const passwordSchema = z.string().min(8).max(24);

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
