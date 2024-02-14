<script lang="ts">
	let active = false;
	export let sticky: boolean;
	export let bgColor: string | null;
	export let lineColor: string | null;
	export let shadow: boolean;
	export let shadowColor: string | null;
	export let backgroundTile: string | null;
</script>

<nav
	class:active
	class:sticky
	class={`p-1-5`}
	style={`background-image: url('${backgroundTile}'); background-repeat: repeat; background-color: ${bgColor} ; ${
		shadow ? 'filter: drop-shadow(0px 3px 10px ' + shadowColor + ');' : ''
	} ${lineColor ? 'border-bottom: 1px solid ' + lineColor + ';' : ''}`}
>
	<slot />
</nav>

<style>
	nav {
		display: flex;
		width: 100%;
		justify-content: space-between;
		position: relative;
		z-index: 5;
	}

	nav.active {
		background-color: green;
	}
</style>
