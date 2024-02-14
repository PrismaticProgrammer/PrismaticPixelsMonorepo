import { z } from 'zod';

const passwordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,;:!?@#\$%^&*()_+\-=\[\]{}()<>/~|\\])[A-Za-z\d.,;:!?@#\$%^&*()_+\-=\[\]{}()<>/~|\\]{8,}$/;

// Name has a default value just to display something in the form.
export const signupSchema = z
	.object({
		name: z.string().min(3, 'Name must be at least 3 characters'),
		display_name: z.string().min(8, 'Display name must be at least 8 characters'),
		email: z.string().email('Not a valid email address'),
		password: z.string().regex(passwordRegex, 'Password must be 8 digits'),
		confirm: z.string()
	})
	.refine((data) => data.password === data.confirm, {
		message: "Passwords didn't match",
		path: ['confirm']
	});
