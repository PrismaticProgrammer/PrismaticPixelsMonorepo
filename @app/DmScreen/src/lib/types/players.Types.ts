import type { World, Worlds } from './locations.Types';

export interface WorldInvitation {
	id: string;
	world_id: string;
	owner_id: string;
	target_id: string;
	accepted: boolean;
	worlds: World;
}

export type WorldInvitations = WorldInvitation[];
