import { createSimpleSend, decodeOmniHex } from '../src';
import { parseOmniHex } from '../src/utils';
import { simpleSendHex } from '../tests/constants';

const runExample = async (): Promise<void> => {
	const createSimpleSendResponse = createSimpleSend({ currencyIdentifier: 31, numberOfCoins: 12090980 });
	console.log(createSimpleSendResponse);

	const parseHexResponse = await parseOmniHex('6f6d6e69000000000000001f0000b5e620f48000');
	console.log(parseHexResponse);

	const decodedHex = await decodeOmniHex(simpleSendHex);
	console.log('decodedHex', decodedHex);
}

runExample().then();
