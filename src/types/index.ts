/**
 * Valid values: 0 to 65535
 * Source:https://github.com/OmniLayer/spec/blob/master/OmniSpecification.adoc#field-transaction-version
 */
export type TTransactionVersion = string;

/**
 * Source: https://github.com/OmniLayer/spec/blob/master/OmniSpecification.adoc#field-transaction-type
 */
export type TTransactionType = '0' | '3' | '20' | '21' | '22' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '70';

/**
 * 1 = OMNI
 * 2 = Test OMNI
 * Source: https://github.com/OmniLayer/spec/blob/master/OmniSpecification.adoc#field-currency-identifier
 */
export type TCurrencyIdentifier = string;

/**
 * Source: https://github.com/OmniLayer/spec/blob/master/OmniSpecification.adoc#field-number-of-coins
 */
export type TNumberOfCoins = string;

export type TFields = 'messagePrefix' | 'transactionVersion' | 'transactionType' | 'currencyIdentifier' | 'numberOfCoins';

export type TParseOmniHex = Partial<{ [key in TFields]: string  }>;

export interface ISimpleSend {
    transactionVersion: TTransactionVersion;
    transactionType: TTransactionType;
    currencyIdentifier: TCurrencyIdentifier;
    numberOfCoins: TNumberOfCoins;
}
