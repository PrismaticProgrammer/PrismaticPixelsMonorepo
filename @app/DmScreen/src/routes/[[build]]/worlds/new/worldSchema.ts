import { z } from 'zod';
// Name has a default value just to display something in the form.
export const worldSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters'),
	description: z.string().default(''),
	map: z.string().default('')
});
