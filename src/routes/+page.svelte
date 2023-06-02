<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import { Center, Code, Container, Loader, Text } from '@svelteuidev/core';
	import { typewriter } from '@svelteuidev/motion';
	import axios from 'axios';
	import { generateCode } from '../utils/ui';

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

<Text size="lg" mb="2rem">下のスクリプトをコピーして、ルーターの管理画面から実行</Text>

<Container>
	{#if $queryResult.isLoading}
		<Center override={{ backgroundColor: '$gray50', width: '100%', height: '200px' }}>
			<Loader variant="bars" />
		</Center>
	{:else if $queryResult.isError}
		<p>{$queryResult.error}</p>
	{:else if !$queryResult.data}
		<Text>No data!</Text>
	{:else}
		{@const code = generateCode($queryResult.data)}
		<Code
			block
			copy
			message={code}
			override={{
				overflowX: 'scroll',
				textAlign: 'left',
				maxW: '100%',
			}}
		>
			<span in:typewriter={{ speed: 15 }}>{code}</span>
		</Code>
	{/if}
</Container>
