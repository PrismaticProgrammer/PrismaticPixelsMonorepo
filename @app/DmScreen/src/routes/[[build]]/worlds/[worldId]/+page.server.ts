import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/client';
import { invitationSchema } from './invitationSchema';
import { fail } from '@sveltejs/kit';

export const load = (async ({ request, params, locals: { supabase } }) => {
	// console.log(params);
	const formData = await superValidate(request, invitationSchema);
	const worldId = params.worldId;
	console.log(worldId);
	let { data: world, error } = await supabase.from('worlds').select('*').eq('id', worldId).single();
	if (error) {
		// console.error(error);
		throw new Error(`Server error. Try again later.`);
	} else {
		return { world, formData };
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, params, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, invitationSchema);
		// const formData = await superValidate(request, invitationSchema);

		// console.log(form);
		if (!form.valid) {
			return fail(400, { message: 'Invalid credentials', success: false, form });
		}
		// console.log(form);
		let { data: profiles, error: sbError } = await supabase
			.from('profiles')
			.select('display_name, id')
			.eq('email', form.data?.target_email);

		if (sbError) {
			console.log(sbError);
		} else {
			const { data, error } = await supabase
				.from('world_invitations')
				.insert([
					{ owner_id: form.data?.owner_id, target_id: profiles[0].id, world_id: params.worldId }
				])
				.select();
		}
		return { form };
	}
};
