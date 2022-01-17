import { IFieldTypes } from '../types';

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

export const fieldTypes: IFieldTypes = {
	messagePrefix: 'string',
	transactionVersion: 'number',
	transactionType: 'number',
	currencyIdentifier: 'number',
	numberOfCoins: 'number',
};
