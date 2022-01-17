import { decToHex, fieldSizes, messagePrefix } from '../utils';

/**
 * Creates data necessary to perform an Omni Simple Send.
 * @param {number} currencyIdentifier - ID of asset
 * @param {number} numberOfCoins -  How much to send
 */
export const createSimpleSend = ({
	currencyIdentifier = 8, // ID of asset
	numberOfCoins = 0, // How much to send
}: {
	currencyIdentifier: number;
	numberOfCoins: number;
}): Buffer => {
	const transactionVersion = decToHex(0, fieldSizes['transactionVersion']);
	const transactionType = decToHex(0, fieldSizes['transactionType']);
	const _currencyIdentifier = decToHex(currencyIdentifier, fieldSizes['currencyIdentifier']);
	const _numberOfCoins = decToHex(numberOfCoins, fieldSizes['numberOfCoins']);
	const simple_send = [
		messagePrefix,
		transactionVersion,
		transactionType,
		_currencyIdentifier,
		_numberOfCoins,
	].join('');

	console.log(simple_send.length);

	return Buffer.from(simple_send, "hex");
}
