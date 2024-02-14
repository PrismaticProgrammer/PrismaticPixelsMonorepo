import { setContext, getContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import type { World } from './types/locations.Types';

const PROFILE_CTX = 'profile';
const WORLD_CTX = 'world';

type ProfileData = {
	id: string;
	name: string;
	email: string;
	display_name: string;
	player: boolean;
	dm: boolean;
};

export const setProfileState = (initialData: ProfileData | null) => {
	const profileState = writable(initialData);
	setContext(PROFILE_CTX, profileState);
	return profileState;
};

export const getProfileState = () => {
	return getContext<Writable<ProfileData>>(PROFILE_CTX);
};

export const setWorldState = (initialData: World | null) => {
	const worldState = writable(initialData);
	setContext(WORLD_CTX, worldState);
	return worldState;
};

export const getWorldState = () => {
	return getContext<Writable<World>>(WORLD_CTX);
};
