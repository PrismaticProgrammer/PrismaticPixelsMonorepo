import type { Worlds } from '$lib/types/locations.Types';
import type { WorldInvitation, WorldInvitations } from '$lib/types/players.Types';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	// console.log(event.locals);
	const { supabase, getSession } = event.locals;
	const session = await getSession();

	const [worldInvitationsResponse, worldsResponse] = await Promise.all([
		supabase.from('world_invitations').select('*, worlds(*)'),
		supabase.from('worlds').select('*').eq('owner_id', session.user.id)
	]);

	const worldInvitations: WorldInvitations = worldInvitationsResponse.data.filter(
		(invitation: WorldInvitation) => {
			return invitation.target_id === session.user.id;
		}
	);
	const worlds: Worlds = worldsResponse.data;

	if (worldsResponse.error || worldInvitationsResponse.error) {
		console.error(worldsResponse.error, worldInvitationsResponse.error);
		throw new Error(`Server error. Try again later.`);
	} else {
		return { status: 200, worlds, worldInvitations };
	}
}) satisfies PageServerLoad;
