var _ = require('lodash');
var rek = require('rekuire');
var testHelper = rek('test-helper');
var paymentVault = testHelper.createPaymentVault();

describe('Customers', () => {
	it('allows creation of customer in card vault', () => {
		var payload = testHelper.buildBuyerDetails();
		return paymentVault.customer.create(payload)
			.should.eventually.include.keys(
				'id', 'firstName', 'middleName', 'lastName', 'birthday', 'sex',
				'contact', 'billingAddress'
			).then(customer => paymentVault.customer.destroy(customer.id))
	});

	context('Operations on existing customers', () => {
		var customer;

		beforeEach(() => {
			var payload = testHelper.buildBuyerDetails();
			return paymentVault.customer.create(payload)
				.then(created => customer = created);
		});

		afterEach(() => {
			return paymentVault.customer.destroy(customer.id);
		});

		it('allows retrieval of customer', () => {
			return paymentVault.customer.retrieve(customer.id)
				.should.eventually.become(customer);
		});

		it('allows updating customer', () => {
			var update = {
				contact: {
					phone: "+63(2)1234567777",
					email: "test@example.com"
				}
			}
			return paymentVault.customer.update(customer.id, update)
				.then(updated => {
					updated.contact.should.deep.equal(update.contact);
				});
		});
	});
});
