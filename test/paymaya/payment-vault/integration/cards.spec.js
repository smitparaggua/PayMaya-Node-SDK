var rek = require('rekuire');
var paymaya = rek('index');
var _ = require('lodash');

var testHelper = rek('test-helper');
var paymentVault = testHelper.createPaymentVault();

describe('Cards', () => {
	var customer, paymentToken;

	before(() => {
		var payload = testHelper.buildBuyerDetails();
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
		var cardDetails = 
			testHelper.buildCreateCardPayload(paymentToken.paymentTokenId);
		return paymentVault.card.create(customer.id, cardDetails)
			.should.eventually.include({
				state: 'PREVERIFICATION',
				cardType: 'master-card',
				maskedPan: '2346',
				default: true
			}).and.include.keys('id', 'cardTokenId', 'verificationUrl')
			.then(card => paymentVault.card.destroy(customer.id, card.cardTokenId));
	});

	context('Operations on existing cards', () => {
		const CARD_ATTRIBUTES = Object.freeze([
			'state', 'cardType', 'maskedPan', 'default', 'cardTokenId'
		]);
		var card;

		beforeEach(() => {
			var cardDetails = 
				testHelper.buildCreateCardPayload(paymentToken.paymentTokenId);
			return paymentVault.card.create(customer.id, cardDetails)
				.then(created => card = created);
		});

		afterEach(() => {
			return paymentVault.card.destroy(customer.id, card.cardTokenId);
		});

		it('allows listing of cards', () => {
			return paymentVault.card.list(customer.id)
				.then(cards => {
					cards[0].should.include.keys(CARD_ATTRIBUTES);
				});
		});

		it('allows retrieving card details', () => {
			var expected = _.pick(card, CARD_ATTRIBUTES);
			return paymentVault.card.retrieve(customer.id, card.cardTokenId)
				.should.eventually.include(expected);
		});

		it('allows updating cards', () => {
			var update = { isDefault: true };
			var expected = _.pick(card, CARD_ATTRIBUTES);
			return paymentVault.card.update(customer.id, card.cardTokenId, update)
				.then(card => card.should.include(expected));
		});
	});
});
