<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	import { onMount } from 'svelte';
	export let link: string | null;
	export let settings: string | null;
	let active: boolean;

	$: currentPath = $page.url.pathname;
	const checkLink = () => {
		return (currentPath.startsWith(link as string) && link !== '/') || link === currentPath;
	};
	onMount(() => {
		active = checkLink();
	});

	afterNavigate(() => {
		active = checkLink();
	});
</script>

<a href={`${link}`} class={`${settings}`} class:active><slot /></a>

<style>
	a {
		position: relative;
	}
</style>
