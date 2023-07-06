/**
 * ルーターコマンド <https://www.rtpro.yamaha.co.jp/RT/manual/rt-common/index.html>
 *
 * 返値の補足：文字列の先頭に`\n`がないと`<Code>`コンポーネントで表示が崩れる
 * @param params
 */
export function generateCode(params: string[]) {
	const passFilters = params.map(
		(param, index) => `ethernet filter ${index + 1} pass-log ${param}`,
	);
	const rejectFilters = ['ethernet filter 512 reject-nolog *:*:*:*:*:*'];
	const filters = passFilters.concat(rejectFilters);
	return '\n' + filters.join('\n');
}
