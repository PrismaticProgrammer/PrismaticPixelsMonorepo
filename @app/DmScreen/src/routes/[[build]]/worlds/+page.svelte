<script lang="ts">
	import type { World } from '$lib/types/locations.Types';
	import type { PageData } from './$types';
	import { getWorldState } from '$lib/state.svelte';
	import type { WorldInvitation } from '$lib/types/players.Types';

	export let data: PageData;
	const { supabase, session, worlds, worldInvitations } = data;
	console.log(worldInvitations);
	console.log(session?.user);
	const activeWorld = getWorldState();

	const makeActive = (world: World) => {
		console.log(world);
		localStorage.setItem('activeWorld', JSON.stringify(world));
		activeWorld.set(world);
		// console.log(world);
	};
	const accept = async (invitation: WorldInvitation, index: number) => {
		console.log(invitation);

		const { data: newInvitation, error } = await supabase
			.from('world_invitations')
			.update({ accepted: true })
			.eq('id', invitation.id)
			.select('*, worlds(*)')
			.single();
		if (error) {
			console.log(error);
		} else {
			worldInvitations[index] = newInvitation;
		}
	};
	const decline = async (invitation: WorldInvitation, index: number) => {
		const { error } = await supabase.from('world_invitations').delete().eq('id', invitation.id);
		if (!error) {
			worldInvitations.splice(index, 1);
		}
	};
	// console.log(data);
</script>

<div class="container">
	<h1>Your Worlds</h1>
	{#if worlds.length > 0}
		{#each worlds as world}
			<a href="/worlds/{world.id}">{world.name}</a>
			{#if $activeWorld?.id === world.id}
				<span>Active World</span>
			{:else}
				<button
					on:click={() => {
						makeActive(world);
					}}>Make Active</button
				>
			{/if}
			<br />
		{/each}
		<a href="/worlds/new">New world</a>
	{:else}
		<p>Oh no! you have no worlds</p>
		<a href="/worlds/new">Create a world</a>
	{/if}
	{#if worldInvitations.length > 0}
		<h2>Shared Worlds</h2>
		{#each worldInvitations as invitation, index}
			<p>{invitation.worlds.name}</p>
			{#if invitation.accepted === null}
				<button
					on:click={() => {
						accept(invitation, index);
					}}>Accept</button
				>
				<button
					on:click={() => {
						decline(invitation, index);
					}}>Decline</button
				>
			{:else if $activeWorld?.id === invitation.worlds.id}
				<span>Active World</span>
			{:else}
				<button
					on:click={() => {
						makeActive(invitation.worlds);
					}}>Make Active</button
				>
			{/if}
			<br />
		{/each}
	{/if}
</div>
