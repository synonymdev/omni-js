import { decodeFieldHex, decToHex, parseOmniHex } from '../utils';
import { fieldSizes, messagePrefix } from '../utils/constants';
import { TDecodeOmniHex } from '../types';

/**
 * Creates Buffer data necessary to perform an Omni Simple Send.
 * @param {number} currencyIdentifier - ID of asset
 * @param {number} numberOfCoins -  How much to send
 * @return {Buffer}
 */
export const createSimpleSend = ({
	currencyIdentifier = 8, // ID of asset
	numberOfCoins = 0, // How much to send
}: {
	currencyIdentifier: number;
	numberOfCoins: number;
}): Buffer => {
	const hex = createSimpleSendHex({
		currencyIdentifier,
		numberOfCoins,
	});
	return Buffer.from(hex, "hex");
}

/**
 * Creates hex data necessary to perform an Omni Simple Send.
 * @param currencyIdentifier
 * @param numberOfCoins
 * @return {string}
 */
export const createSimpleSendHex = ({
	currencyIdentifier = 8, // ID of asset
	numberOfCoins = 0, // How much to send
}: {
	currencyIdentifier: number;
	numberOfCoins: number;
}): string => {
	const transactionVersion = decToHex(0, fieldSizes['transactionVersion']);
	const transactionType = decToHex(0, fieldSizes['transactionType']);
	const _currencyIdentifier = decToHex(currencyIdentifier, fieldSizes['currencyIdentifier']);
	const _numberOfCoins = decToHex(numberOfCoins, fieldSizes['numberOfCoins']);
	return [
		messagePrefix,
		transactionVersion,
		transactionType,
		_currencyIdentifier,
		_numberOfCoins,
	].join('');
}

/**
 * Decodes the provided hex
 * @param {string} hex
 * @return {Promise<TDecodeOmniHex>}
 */
export const decodeOmniHex = async (hex: string): Promise<TDecodeOmniHex> => {
	const parsedHex = await parseOmniHex(hex);
	let decodedHex: TDecodeOmniHex = {};
	await Promise.all(Object.keys(parsedHex).map((field = '') => {
		decodedHex[field] = decodeFieldHex(field, parsedHex[field]);
	}));
	return decodedHex;
}
