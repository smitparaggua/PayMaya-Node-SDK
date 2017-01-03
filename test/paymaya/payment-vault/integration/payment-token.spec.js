var rek = require('rekuire');
var _ = require('lodash');
var paymaya = rek('index');

var keys = rek('test-config').paymentVault.keys;
rek('chai-helper');

describe('PaymentToken', () => {
	var paymentVaultOptions = { publicKey: keys.public, secretKey: keys.secret, env: 'sandbox' };
	var paymentVault = paymaya.initPaymentVault(paymentVaultOptions);

	describe('Creation of payment token', () => {
		it('allows creation of payment token', () => {
			return paymentVault.paymentToken.create({
				number: '5123456789012346',
				expMonth: '05',
				expYear: '2017',
				cvc: '111'
			}).should.eventually.include({ state: 'AVAILABLE' });
		});

		context('when error occurs', () => {
			it('reports the errors', () => {
				return paymentVault.paymentToken.create({})
					.should.be.rejected
					.then(error => {
						error.httpStatusCode.should.not.be.empty;
						error.code.should.not.be.empty;
						error.message.should.not.be.empty;
						error.parameters.should.not.be.empty;
					});
			});
		});
	});
});
