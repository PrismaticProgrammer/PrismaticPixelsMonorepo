import { fail, redirect } from '@sveltejs/kit';
import { AuthApiError } from '@supabase/supabase-js';

export const actions = {
	default: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { data:profile, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
console.log('profile', profile)
console.error('error', error)
if (error) {
			if (error instanceof AuthApiError && error.status === 400) {
				return fail(400, { message: 'Invalid credentials', success: false, email });
			}
			return fail(500, {
				error: 'Server error. Try again later.',
				values: {
					email
				}
			});
		}

		throw redirect(303, '/');
	}
};
