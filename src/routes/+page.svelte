<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import axios from 'axios';

	const url = '/api/devices';
	const queryResult = useQuery('devices', async () => {
		const response = await axios
			.get<string[]>(url)
			.then((res) => res.data)
			.catch((error) => {
				throw new Error(error);
			});
		return response;
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if $queryResult.isLoading}
	<p>LOADING</p>
{:else if $queryResult.isError}
	<p>{$queryResult.error}</p>
{:else}
	<p>{JSON.stringify($queryResult.data)}</p>
{/if}
