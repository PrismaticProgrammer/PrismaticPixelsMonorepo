<script lang="ts">
	export let type: "text" | "email";
	export let label: String;
	export let inputValue: String;
	export let error: String;
	export let description: String;
	export let name: string;
</script>

<label>
	{label}
	<input {...{ type }} bind:value={inputValue} {name} />
	{#if error}
		<p class={`error`}>{error}</p>
	{/if}
	{#if description && !error}
		<p class={`description`}>{description}</p>
	{/if}
</label>

<style>
	input {
		height: 1.5rem;
	}
	label {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}
	.error {
		color: red;
	}
	.description {
		color: grey;
	}
</style>
