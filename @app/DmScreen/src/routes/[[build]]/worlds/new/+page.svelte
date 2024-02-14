<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';
	import { superForm, type FormResult } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	const { errors, form, enhance } = superForm(data.formData, {
		onResult: (event) => {
			const result = event.result as FormResult<ActionData>;
			console.log(result);
			if (result.type === 'success') {
				goto(`/worlds/${result.data?.world?.id}`);
			}
			// console.log(data);
		}
	});
</script>

<h1>New World</h1>
<SuperDebug data={$form} />

<form method="POST" use:enhance>
	<label>
		Name:
		<input type="text" name="name" bind:value={$form.name} />
	</label>
	{#if $errors?.name}
		<p>{$errors?.name}</p>
	{/if}
	<br />
	<label>
		Description:
		<textarea name="description" bind:value={$form.description} />
	</label>
	{#if $errors?.description}
		<p>{$errors?.description}</p>
	{/if}
	<br />

	<button>Create World</button>
</form>
