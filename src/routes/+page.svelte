<script>
	import { useQuery } from '@sveltestack/svelte-query';
	import axios from 'axios';

	const url = '/api/devices';
	const queryResult = useQuery('devices', async () => {
		const response = await axios.get(url).catch((error) => {
			throw new Error(error);
		});
		console.log('respones: ', response);
		return response.data;
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if $queryResult.isLoading}
	<p>LOADING</p>
{:else if $queryResult.isError}
	<p>ERROR: {$queryResult.error}</p>
{:else}
	<span>{$queryResult.data}</span>
{/if}
