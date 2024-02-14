export const profileCall = async (supabase: any, session: any) => {
	let initialData;
	let errors;
	let user = session.user;
	let { data: profile, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single();
	if (error) {
		errors = error;
		initialData = null;
	} else {
		initialData = profile;
	}
	return { errors, initialData };
};
