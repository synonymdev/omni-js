import { createSimpleSend } from '../src';
import { parseHex } from '../src/utils';
import { simpleSendHex } from '../tests/constants';

const runExample = async (): Promise<void> => {
	const createSimpleSendResponse = createSimpleSend({ currencyIdentifier: 31, numberOfCoins: 12090980 });
	console.log(createSimpleSendResponse);

	const parseHexResponse = await parseHex(simpleSendHex);
	console.log(parseHexResponse);
}

runExample().then();
