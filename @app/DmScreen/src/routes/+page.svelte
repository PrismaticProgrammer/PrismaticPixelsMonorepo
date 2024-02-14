<script lang="ts">
	import { getProfileState } from '$lib/state.svelte';
	import { onMount } from 'svelte';
	const profile = getProfileState();

	onMount(() => {
		// console.log($profile);
	});
</script>

<h1>Welcome to SvelteKit {$profile?.name}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

this is a test

<p>why not work</p>
