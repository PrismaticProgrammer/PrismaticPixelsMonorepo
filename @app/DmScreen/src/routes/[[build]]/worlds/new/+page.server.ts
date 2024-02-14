import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/client';
import { worldSchema } from './worldSchema.js';
import { fail } from '@sveltejs/kit';
import type { World } from '$lib/types/locations.Types';

export const load = (async (request) => {
	const formData = await superValidate(request, worldSchema);
	return { formData };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, url, locals: { supabase, getSession } }) => {
		const formData = await superValidate(request, worldSchema);
		const session = await getSession();
		const user_id = session.user.id;
		console.log(user_id);

		if (!formData.valid) {
			console.log(formData);
			return fail(400, { message: 'Invalid credentials', success: false, formData });
		}
		const input = { ...formData.data, owner_id: user_id };
		const { data, error } = await supabase.from('worlds').insert([input]).select().single();
		const world: World = data;
		if (error) {
			const errorString = JSON.stringify(error);
			throw new Error(`Server error. Try again later. ${errorString}`);
		}
		return { formData, world };
	}
};
