// src/routes/login/+page.server.ts
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import { signupSchema } from './signupSchema.js';

export const load = async () => {
	const form = await superValidate(signupSchema);
	return { form };
};

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await superValidate(request, signupSchema);

		console.log(formData);
		if (!formData.valid) {
			return fail(400, { message: 'Invalid credentials', success: false, formData });
		}

		const email = formData.data.email as string;
		const password = formData.data.password as string;

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`,
				data: {
					display_name: formData.data.display_name,
					name: formData.data.name
				}
			}
		});

		// if (error) {
		// 	const errorString = JSON.stringify(error);
		// 	return fail(500, { message: 'Server error. Try again later.', success: false, errorString });
		// }

		if (error) {
			const errorString = JSON.stringify(error);
			throw new Error(`Server error. Try again later. ${errorString}`);
		}

		// return {
		// 	message: 'Please check your email for a magic link to log into the website.',
		// 	success: true
		// };
		return { formData };
	}
};
