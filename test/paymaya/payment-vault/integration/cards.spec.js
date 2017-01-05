var rek = require('rekuire');
var paymaya = rek('index');

var testHelper = rek('test-helper');
var paymentVault = testHelper.createPaymentVault();

describe('Cards', () => {
	var customer, paymentToken;

	before(() => {
		var payload = testHelper.buildCreateCustomerPayload();
		return paymentVault.customer.create(payload)
			.then(created => customer = created);
	});

	after(() => {
		return paymentVault.customer.destroy(customer.id);
	});

	beforeEach(() => {
		return paymentVault.paymentToken.create(testHelper.buildCardDetails())
			.then(token => paymentToken = token);
	});

	it('allows creation of cards', () => {
		var cardDetails = buildCreateCardPayload();
		console.log(cardDetails);
		return paymentVault.card.create(customer.id, cardDetails)
			.should.eventually.include({
				state: 'PREVERIFICATION',
				cardType: 'master-card',
				maskedPan: '2346',
				default: true
			}).and.include.keys('id', 'cardTokenId', 'verificationUrl')
			.then(card => paymentVault.card.destroy(customer.id, card.cardTokenId));
	});

	function buildCreateCardPayload() {
		return {
			paymentTokenId: paymentToken.paymentTokenId,
			isDefault: true,
			redirectUrl: {
				success: "http://shop.server.com/success?id=123",
				failure: "http://shop.server.com/failure?id=123",
				cancel: "http://shop.server.com/cancel?id=123"
			}
		}
	}
});
