<!-- // src/routes/login/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { TextInput, PasswordInput } from '@prismatic/components';
	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form);
</script>

<div class="page">
	<h2>Sign up</h2>
	<form method="post" use:enhance>
		<TextInput
			type="text"
			label="Name"
			name="name"
			bind:inputValue={$form.name}
			error={$errors?.name}
			description="Please enter your name"
		/>
		<TextInput
			type="text"
			label="Display Name"
			name="display_name"
			bind:inputValue={$form.display_name}
			error={$errors?.display_name}
			description="Please enter your display name"
		/>
		<TextInput
			type="email"
			label="Email"
			name="email"
			bind:inputValue={$form.email}
			error={$errors?.email}
			description="Please enter your email"
		/>
		<PasswordInput
			label="Password"
			name="password"
			bind:inputValue={$form.password}
			error={$errors?.password}
			description="Please enter your password"
		/>
		<PasswordInput
			label="Confirm Password"
			name="confirm"
			bind:inputValue={$form.confirm}
			error={$errors?.confirm}
			description="Please confirm your password"
		/>
		<button>Sign up</button>
	</form>
</div>
