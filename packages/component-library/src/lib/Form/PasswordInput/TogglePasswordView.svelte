<script lang="ts">
	export let type: "text" | "password" = "password";
	const handleToggle = () => {
		type = type === "password" ? "text" : "password";
	};
</script>

<button class="icon-box" on:click={handleToggle}>
	{#if type === "password"}
		<enhanced:img src="./open.svg" />
	{:else}
		<enhanced:img src="./closed.svg" />
	{/if}
</button>

<style>
	.icon-box {
		position: absolute;
		right: 0;
		top: 0;
		height: 1.5rem;
		background-color: rgba(0, 0, 0, 0);
		border: none;
	}
	.icon-box img {
		height: 100%;
		width: auto;
	}
</style>
