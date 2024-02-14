<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { profileCall } from '$lib/profile.js';
	import { type SupabaseClient, type Session } from '@supabase/supabase-js';
	import {
		setProfileState,
		getProfileState,
		setWorldState,
		getWorldState
	} from '$lib/state.svelte.js';
	import { onMount } from 'svelte';
	import type { World } from '$lib/types/locations.Types';
	import { Menu, NavLink } from '@prismatic/components';
	// import NavLink from '@prismatic/components';

	export let data: { supabase: SupabaseClient; session: Session | null };

	let authReset: Boolean = false;

	let { supabase, session } = data;
	$: {
		({ supabase, session } = data);
		if (session) {
			supabase.auth.setSession(session);
		}
	}
	setWorldState(null);
	const world = getWorldState();
	setProfileState(null);
	const profile = getProfileState();

	$: {
		if (authReset) {
			getProfile();
			authReset = false;
		}
	}
	const getProfile = async () => {
		const { initialData, errors } = await profileCall(supabase, session);
		if (errors) {
			console.log(errors);
		} else {
			profile.set(initialData);
		}
	};

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
			if (_session) {
				authReset = true;
			}
		});
		let activeWorldString: string | null = localStorage?.getItem('activeWorld') || null;
		let activeWorld: World | null = activeWorldString ? JSON.parse(activeWorldString) : null;
		if (activeWorld) {
			world.set(activeWorld);
		}
		return () => subscription.unsubscribe();
	});
</script>

<Menu
	bgColor="#000"
	sticky={false}
	lineColor="#fff"
	shadow={true}
	shadowColor="#fff"
	backgroundTile={null}
>
	<NavLink link="/" settings={'white fs-3 link-underline'}>Home</NavLink>
	<NavLink link="/worlds" settings={'white fs-3 link-underline'}>Worlds</NavLink>
	{#if session}
		<NavLink link="/auth/logout" settings={'white fs-3 link-underline'}>Logout</NavLink>
	{:else}
		<NavLink link="/auth/login" settings={'white fs-3 link-underline'}>login</NavLink>
		<NavLink link="/auth/signup" settings={'white fs-3 link-underline'}>signup</NavLink>
	{/if}
	{#if !$world}
		<NavLink link="/worlds" settings={'white fs-3 link-underline'}>Select an active world</NavLink>
	{:else}
		<span class="fs-3">World: {$world.name}</span>
	{/if}
</Menu>

<div class="relative">
	<slot />
</div>
