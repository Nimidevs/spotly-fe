import * as z from "zod";

export const authSchema = z.object({
  // Needs to be a string schema before calling .email()
  email: z.email("Invalid email address"),
  password: z
    .string({ message: "Password is required" })
    .trim()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export const profileInfoSchema = z.object({
  firstname: z.string({ message: "First name is required" }).trim().min(4, "First name must be at least 4 characters long"),
  lastname: z.string().optional().refine((val) => !val || val.trim().length >= 4, {message:"Last name must be at least 4 characters long"}),
  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is required" }),
  dateOfBirth: z
  .coerce
  .date({ message: "Date of birth is required" })
  .max(new Date(), "Date cannot be in the future")
  .refine((date) => {
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 18;
  }, {
    message: "You must be at least 18 years old"
  })
  .transform((val) => val.toISOString().split("T")[0]),
  bio: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim().length >= 10,
      { message: "Bio must be at least 10 characters long" }
    )
});