import { NOTION_DEVICE_DATABASE } from '$env/static/private';
import { getMacAddresses } from '../../../utils/devices';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	const addresses = await getMacAddresses(NOTION_DEVICE_DATABASE);

	return new Response(JSON.stringify(addresses));
}) satisfies RequestHandler;
