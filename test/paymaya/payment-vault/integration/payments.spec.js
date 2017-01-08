var rek = require('rekuire');
var paymaya = rek('index');

var testHelper = rek('test-helper');
var paymentVault = testHelper.createPaymentVault();

describe('Payments', () => {
	context('One Time Payment', () => {
		it('allows creation of payment using Payment Token and Buyer Info', () => {
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

	context('Payment with Card Vault', () => {
		var customer, card;

		beforeEach(() => {
			var token;
			var cardDetails = testHelper.buildCardDetails();
			var buyerDetails = testHelper.buildBuyerDetails()
			return paymentVault.paymentToken.create(cardDetails)
				.then(created => token = created)
				.then(() => paymentVault.customer.create(buyerDetails))
				.then(createdCustomer => {
					var payload = testHelper.buildCreateCardPayload(token.paymentTokenId)
					customer = createdCustomer;
					return paymentVault.card.create(customer.id, payload)
				}).then(createdCard => card = createdCard);
		});

		afterEach(() => {
			return paymentVault.customer.destroy(customer.id);
		});

		it('allows creation of payment using Customer and Card ID', () => {
			return paymentVault.payment.create({
				customerId: customer.id,
				cardId: card.cardTokenId,
				totalAmount: { amount: 150, currency: 'PHP' }
			}).should.be.fulfilled;
		});
	});
});
