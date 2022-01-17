import { TFields, TParseOmniHex } from '../types';
import { fieldSizes, fieldTypes, formats, transactionTypes } from './constants';

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
 * @return {string}
 */
export const decToHex = (dec: number, targetLength: number): string => {
	const hex = dec.toString(16);
	return hex.padStart(targetLength, '0');
}

/**
 * Converts hexadecimal to ascii.
 * @param {string} hex
 * @return {string}
 */
export const hexToAscii = (hex: string): string => {
	hex  = hex.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
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
 * Returns the field type for the provided field.
 * @param {TFields | string} field
 * @return {string}
 */
export const getFieldType = (field: TFields | string): string => {
	return fieldTypes[field];
};

/**
 * Used to decode the provided hex field.
 * @param {TFields | string} field
 * @param {string} hex
 * @return {string | number}
 */
export const decodeFieldHex = (field: TFields | string, hex: string): string | number => {
	const fieldType = getFieldType(field);
	let decodedField: string | number;
	switch (fieldType) {
		case 'string':
			decodedField = hexToAscii(hex ?? '');
			break;
		case 'number':
			decodedField = hexToDec(hex ?? '');
			break;
		default:
			decodedField = '';
			break;
	}
	return decodedField;
};

/**
 * Parses the provided Omni hex into it's corresponding fields.
 * @param {string} hex
 * @return {Promise<TParseOmniHex>}
 */
export const parseOmniHex = async (hex: string): Promise<TParseOmniHex> => {
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
 * @return {TFields}
 */
export const getTransactionType = (hex: string): TFields => {
	const value = hexToDec(hex.substring(12, 16));
	return transactionTypes[value];
};
