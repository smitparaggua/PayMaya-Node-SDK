var rek = require('rekuire');
var paymentVault = rek('test-helper').createPaymentVault();

describe('PaymentToken', () => {
	describe('Creation of payment token', () => {
		it('allows creation of payment token', () => {
			return paymentVault.paymentToken.create({
				number: '5123456789012346',
				expMonth: '05',
				expYear: '2017',
				cvc: '111'
			}).should.eventually.include({ state: 'AVAILABLE' })
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
