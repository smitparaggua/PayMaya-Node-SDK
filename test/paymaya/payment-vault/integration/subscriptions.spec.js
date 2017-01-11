var rek = require('rekuire');
var paymaya = rek('index');
var request = require('requestretry');

var testHelper = rek('test-helper');
var paymentVault = testHelper.createPaymentVault();

// TODO: create tests for subscriptions
// not sure how to create tests since it requires verified vaulted cards
xdescribe('Subscriptions', () => {
	var customer, card;

	before(() => {
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

	after(() => {
		return paymentVault.customer.destroy(customer.id);
	});

	it('allows creation of subscriptions', () => {
		console.log(card);
		var subscriptionDetails = {
			description: 'Test subscription',
			interval: 'DAY',
			intervalCount: 1,
			startDate: '2019-07-07',
			endDate: null,
			totalAmount: { amount: 100, currency: 'PHP' }
		};
		return paymentVault.subscription
			.create(customer.id, card.cardTokenId, subscriptionDetails)
			.should.be.fulfilled;
	});
});
