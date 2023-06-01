import { NOTION_DEVICE_DATABASE, NOTION_USER_DATABASE } from '$env/static/private';
import { getAllowedUsersAsync, getDevices, getMacAddresses } from '../../../utils/devices';
import type { RequestHandler } from './$types';

export const GET = (async () => {
	const allowedUsers = await getAllowedUsersAsync(NOTION_USER_DATABASE);
	const devices = getDevices(allowedUsers);
	const addresses = await getMacAddresses(NOTION_DEVICE_DATABASE, devices);

	return new Response(JSON.stringify(addresses));
}) satisfies RequestHandler;
