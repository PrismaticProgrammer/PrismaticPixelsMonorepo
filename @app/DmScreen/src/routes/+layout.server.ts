
export const load = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();

	return {
		session: await getSession(),
	};
};
