var rek = require('rekuire');
var paymentVault = rek('test-helper').createPaymentVault();

describe('Customers', () => {
	it('allows creation of customer in card vault', () => {
		var payload = buildCreateCustomerPayload();
		paymentVault.customer.create(payload)
			.should.eventually.include(payload);
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
