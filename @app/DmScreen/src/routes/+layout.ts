// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { profileCall } from '$lib/profile.js';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');
	// console.log(data);
	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	// let initialData;
	// let errors;
	// if (session) {
	// 	const data = await profileCall(supabase, session);
	// 	initialData = data.initialData;
	// 	errors = data.errors;
	// }

	// if (errors) {
	// 	return error(500, { message: 'Server error. Try again later.' });
	// }
	return { supabase, session };
};
