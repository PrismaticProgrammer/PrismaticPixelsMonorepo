import { redirect } from '@sveltejs/kit';
export async function GET(request) {
	const {
		locals: { supabase }
	} = request;
	await supabase.auth.signOut();
	throw redirect(303, '/');
}
