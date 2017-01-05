var rek = require('rekuire');
var paymaya = rek('index');

var paymentVault = rek('test-helper').createPaymentVault();

describe('Payments', () => {
	it('allows creation of payment', () => {
		return createPayment()
			.should.eventually.include.keys(
				'id', 'isPaid', 'status', 'amount', 'currency'
			);
	});

	it('allows retrieval of created payment', () => {
		var createdPayment;
		return createPayment()
			.then(payment => {
				createdPayment = payment;
				return paymentVault.payment.retrieve(payment.id);
			}).then(retrievedPayment => {
				retrievedPayment.should.deep.equal(createdPayment);
			});
	});

	function createPayment() {
		return paymentVault.paymentToken.create({
			number: '5123456789012346',
			expMonth: '05',
			expYear: '2017',
			cvc: '111'
		}).then(paymentToken => {
			var payload = paymentCreatePayload(paymentToken.paymentTokenId);
			return paymentVault.payment.create(payload);
		});
	}

	function paymentCreatePayload(tokenId) {
		return {
			paymentTokenId: tokenId,
			totalAmount: { 'amount': 100, 'currency': 'PHP' },
			buyer: {
				firstName: 'Ysa',
				middleName: 'Cruz',
				lastName: 'Santos',
				contact: { phone: '09123456789', email: 'test@example.com' },
				billingAddress: {
					line1: '9F Robinsons Cybergate 3',
					line2: 'Pioneer Street',
					city: 'Mandaluyong City',
					state: 'Metro Manila',
					zipCode: '12345',
					countryCode: 'PH'
				}
			}
		};
	}
});
