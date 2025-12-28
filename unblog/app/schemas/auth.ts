import z from "zod";
export const SignupSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(20, "Name must be at most 20 characters long"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must be at most 20 characters long"),
})