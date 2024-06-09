import {z} from 'zod';

const signinBodySchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(50, { message: "Username must be at most 50 characters long" })
        .regex(/^[a-z0-9_]+$/, { message: "Username must be lowercase and can include numbers and underscores" }),
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
});

export default signinBodySchema;