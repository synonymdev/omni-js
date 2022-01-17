import * as chai from 'chai';
import { simpleSendHex } from './constants';
import { createSimpleSend, decodeOmniHex } from '../src';
import { parseOmniHex, getTransactionType } from '../src/utils';

const expect = chai.expect;

describe('Omni-JS Library', () => {

	it('Should parse a simple-send hex' , async () => {
		const response = await parseOmniHex(simpleSendHex);
		expect(response).to.be.a('object');
		expect(response.messagePrefix).to.equal('6f6d6e69');
		expect(response.transactionVersion).to.equal('0000');
		expect(response.transactionType).to.equal('0000');
		expect(response.currencyIdentifier).to.equal('0000001f');
		expect(response.numberOfCoins).to.equal('0000001d2ebbef40');
	});

	it('Should decode simple-send hex data' , async () => {
		const response = await decodeOmniHex(simpleSendHex);
		expect(response.messagePrefix).to.equal('omni');
		expect(response.transactionVersion).to.equal(0);
		expect(response.transactionType).to.equal(0);
		expect(response.currencyIdentifier).to.equal(31);
		expect(response.numberOfCoins).to.equal(125338120000);
	});


	it('Should return the transaction type for the provided omni hex' , async () => {
		const transactionType = getTransactionType(simpleSendHex);
		expect(transactionType).to.equal('simpleSend');
	});

	it('Should create simple-send data' , async () => {
		const response = createSimpleSend({ currencyIdentifier: 31, numberOfCoins: 10 });
		//const arrByte = new Uint8Array(response)
		const arrByte = [
			111, 109, 110, 105,  0,  0, 0,
			0,   0,   0,   0, 31,  0, 0,
			0,   0,   0,   0,  0, 10
		];
		const expectedBuffer = Buffer.from(arrByte);
		expect(response).to.deep.equal(expectedBuffer);
	});

});

