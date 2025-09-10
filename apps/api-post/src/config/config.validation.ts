import { z } from 'zod';

//ze tu trzeba bedzie zmienic ten port
export const EnvSchema = z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().default(3000),
});

export type Env = z.infer<typeof EnvSchema>;
