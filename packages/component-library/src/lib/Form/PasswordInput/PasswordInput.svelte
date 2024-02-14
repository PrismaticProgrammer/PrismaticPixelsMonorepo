<script lang="ts">
	import TogglePasswordView from "./TogglePasswordView.svelte";

	let type: "text" | "password" = "password";
	export let label: String;
	export let inputValue: String;
	export let error: String;
	export let description: String;
	export let name: string;
</script>

<label>
	{label}
	<div class="password-box">
		<input {...{ type }} bind:value={inputValue} {name} />
		<TogglePasswordView bind:type />
	</div>

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
		width: 100%;
	}
	label {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}
	.password-box {
		position: relative;
	}
	.error {
		color: red;
	}
	.description {
		color: grey;
	}
</style>
