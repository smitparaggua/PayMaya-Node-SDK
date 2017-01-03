require('chai').should();
var rek = require('rekuire');
var paymentVault = rek('payment-vault');

describe('PaymentVault', () => {
	var subject;

	beforeEach(() => {
		subject = new PaymentVault({
			url: 'http://example.com',
			secretKey: 'secret-key',
			publicKey: 'public-key'
		});
	});
});
