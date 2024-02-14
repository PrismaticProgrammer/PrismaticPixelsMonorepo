import { z } from 'zod';

// Name has a default value just to display something in the form.
export const invitationSchema = z.object({
	owner_id: z.string(),
	target_email: z.string().email('Not a valid email address'),
	world_id: z.string()
});
