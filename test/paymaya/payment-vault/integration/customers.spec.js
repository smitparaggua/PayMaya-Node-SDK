var _ = require('lodash');
var rek = require('rekuire');
var paymentVault = rek('test-helper').createPaymentVault();

describe('Customers', () => {
	it('allows creation of customer in card vault', () => {
		var payload = buildCreateCustomerPayload();
		return paymentVault.customer.create(payload)
			.should.eventually.include.keys(
				'id', 'firstName', 'middleName', 'lastName', 'birthday', 'sex',
				'contact', 'billingAddress'
			).then(customer => paymentVault.customer.destroy(customer.id))
	});

	context('Operations on existing customers', () => {
		var customer;

		beforeEach(() => {
			var payload = buildCreateCustomerPayload();
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

	function buildCreateCustomerPayload() {
		return {
			firstName: 'Ysa',
			middleName: 'Cruz',
			lastName: 'Santos',
			birthday: '1987-10-10',
			sex: 'F',
			contact: {
				phone: '+63(2)1234567890',
				email: 'ysadcsantos@gmail.com'
			},
			billingAddress: {
				line1: '9F Robinsons Cybergate 3',
				line2: 'Pioneer Street',
				city: 'Mandaluyong City',
				state: 'Metro Manila',
				zipCode: '12345',
				countryCode: 'PH'
			}
		}
	}
});
