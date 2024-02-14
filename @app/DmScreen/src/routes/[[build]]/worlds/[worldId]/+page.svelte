<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	// console.log(data);
	const { world } = data;
	export let invite: boolean = false;
	const { form, errors, enhance } = superForm(data.formData, {
		onSubmit({ formData }) {
			formData.set('world_id', world.id);
			formData.set('owner_id', world.owner_id);
		}
	});
</script>

<div class="main">
	<h1>{world.name}</h1>
	<p>{world.description}</p>

	<a href="/worlds">back to worlds</a>
</div>
<div class="invite-box">
	<h2>Player List</h2>

	{#if invite}
		<form method="POST" use:enhance>
			<label>
				Email:
				<input type="email" name="target_email" bind:value={$form.target_email} />
			</label>
			<button>Invite</button>
		</form>
	{:else}
		<button
			on:click={() => {
				invite = true;
			}}>Add Player</button
		>
	{/if}
</div>
