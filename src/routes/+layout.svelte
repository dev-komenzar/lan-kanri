<script lang="ts">
	import { QueryClientProvider } from '@sveltestack/svelte-query';
	import { AppShell, Header, Seo, SvelteUIProvider, Title } from '@svelteuidev/core';
</script>

<QueryClientProvider>
	<SvelteUIProvider withNormalizeCSS withGlobalStyles>
		<Seo title="トップ" titleTemplate="%t% | C12LAN管理" />
		<AppShell>
			<Header height={60} mb={20}><Title>C12LAN管理</Title></Header>

			<slot />
		</AppShell>
	</SvelteUIProvider>
</QueryClientProvider>
