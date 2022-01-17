import { TFields, TParseOmniHex } from '../types';

export const messagePrefix = '6f6d6e69'; // omni

export const formats = {
	simpleSend: ['messagePrefix', 'transactionVersion', 'transactionType', 'currencyIdentifier', 'numberOfCoins'],
}

export const transactionTypes = {
	0: 'simpleSend',
	50: 'createFixed',
	54: 'createManaged',
};

export const fieldSizes = {
	messagePrefix: 8,
	transactionVersion: 4,
	transactionType: 4,
	currencyIdentifier: 8,
	numberOfCoins: 16,
};

/**
 * Convert hexadecimal to decimal.
 * @param {string} hex
 */
export const hexToDec = (hex: string): number => {
	return parseInt(hex, 16);
}

/**
 * Convert decimal to hexadecimal padded to the provided target length.
 * @param {number} dec
 * @param {number} targetLength
 */
export const decToHex = (dec: number, targetLength: number): string => {
	const hex = dec.toString(16);
	return hex.padStart(targetLength, '0');
}

/**
 * Returns the required format as an array as per the transaction type in the provided hex.
 * @param {string} hex
 */
export const getFieldFormat = (hex: string): TFields[] => {
	const transactionType = getTransactionType(hex);
	return formats[transactionType];
}

/**
 * Parses the provided Omni hex.
 * @param {string} hex
 */
export const parseHex = async (hex: string): Promise<TParseOmniHex> => {
	let i = 0;
	let response: TParseOmniHex = {};
	const format = getFieldFormat(hex);
	await Promise.all(format.map((field: string): void => {
		const fieldSize = fieldSizes[field];
		response[field] = hex.substring(i, i + fieldSize);
		i += fieldSize;
	}));
	return response;
}

/**
 * Returns the transaction type for the provided Omni hex.
 * @param {string} hex
 */
export const getTransactionType = (hex: string): TFields => {
	const value = hexToDec(hex.substring(12, 16));
	return transactionTypes[value];
};
