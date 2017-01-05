var rek = require('rekuire');
var testHelper = rek('test-helper');
var paymentVault = testHelper.createPaymentVault();

describe('PaymentToken', () => {
	describe('Creation of payment token', () => {
		it('allows creation of payment token', () => {
			return paymentVault.paymentToken.create(testHelper.buildCardDetails())
				.should.eventually.include({ state: 'AVAILABLE' })
				.and.have.property('paymentTokenId');
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
