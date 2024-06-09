const {z} = require('zod');

const updateUserDataSchema = z.object({
    password: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .optional(),
    firstname: z.string()
        .max(50, { message: "First name must be at most 50 characters long" })
        .optional(),
    lastname: z.string()
        .max(50, { message: "Last name must be at most 50 characters long" })
        .optional()
});

module.exports = updateUserDataSchema;