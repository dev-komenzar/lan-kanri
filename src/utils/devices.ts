import { NOTION_TOKEN } from '$env/static/private';
import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import dayjs from 'dayjs';

const notion = new Client({
	auth: NOTION_TOKEN,
});
const today = dayjs();

/**
 *
 * @param database Notion データベースのID
 * @returns Notionページオブジェクトの配列
 */
export async function getAllowedUsersAsync(database: string): Promise<PageObjectResponse[]> {
	const pages = await notion.databases
		.query({
			// eslint-disable-next-line camelcase
			database_id: database,
			filter: {
				property: '支払い済',
				date: {
					after: today.format('YYYY-MM-DD'),
				},
			},
		})
		.catch((error) => {
			throw new Error(error);
		});
	console.dir(pages.results);
	return pages.results as PageObjectResponse[];
}

/**
 * デバイスページのIDを`string`として、その配列を返す関数。模式的には `デバイスID[]` を返す。
 * @param {PageObjectResponse} users 利用者 (Notion Page Objects) の配列。
 * @returns {string[]} デバイスページのIDの配列
 */
export function getDevices(users: PageObjectResponse[]): string[] {
	return users.reduce((previous, current) => {
		if (!current.properties) {
			console.log('current.properties is undifined');
			return previous;
		}

		const relationProperty = current.properties['デバイス'];
		if (relationProperty.type !== 'relation') {
			return previous;
		}

		const idArray = relationProperty.relation.map((r) => r.id);
		return previous.concat(idArray);
	}, [] as string[]);
}

/**
 * `getMacAddresses`の補助
 * @param database
 * @param startCursor
 */
async function getAllPagesAsync(
	database: string,
	startCursor: string | undefined = undefined,
): Promise<PageObjectResponse[]> {
	const response = await notion.databases.query({
		// eslint-disable-next-line camelcase
		database_id: database,
		// eslint-disable-next-line camelcase
		start_cursor: startCursor,
	});
	const pages = response.results;

	if (response.has_more && response.next_cursor) {
		pages.concat(await getAllPagesAsync(database, response.next_cursor));
	}

	return pages as PageObjectResponse[];
}

/**
 * 引数がnullの場合除外したい
 * @param {string | null} params
 * @returns `params is string`
 */
function pickStringOnlu(params: string | null): params is string {
	return typeof params === 'string';
}

export async function getMacAddresses(database: string, _devices: string[]): Promise<string[]> {
	const allDevices = await getAllPagesAsync(database);
	const addresses = allDevices
		.map((device) => {
			if (device.properties['MACアドレス'].type !== 'rich_text') {
				return null;
			}

			const textArray = device.properties['MACアドレス'].rich_text;

			if (textArray.length === 0) {
				return null;
			}

			return textArray[0].plain_text;
		})
		.filter(pickStringOnlu);
	return addresses;
}
