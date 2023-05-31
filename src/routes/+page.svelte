<script lang="ts">
	import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
	import { useQuery } from '@sveltestack/svelte-query';
	import type { AxiosResponse } from 'axios';
	import axios from 'axios';

	type RelationProps = {
		type: 'relation';
		relation: Array<{
			id: string;
		}>;
		id: string;
	};

	function getDevicePages(params: PageObjectResponse[]): string[] {
		return params.reduce((previous, current) => {
			const relationProperty = current.properties['デバイス'] as RelationProps;
			const ids = relationProperty.relation.map((value) => value.id);
			return previous.concat(ids);
		}, [] as string[]);
	}
	const url = '/api/devices';
	const queryResult = useQuery('devices', async () => {
		const response: AxiosResponse<PageObjectResponse[]> = await axios.get(url).catch((error) => {
			throw new Error(error);
		});
		const devicePages = getDevicePages(response.data);
		return devicePages;
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
