var rek = require('rekuire');
var keys = rek('test-config').paymentVault.keys;
var paymaya = rek('index');

var chai = require('chai')
chai.should();
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));

module.exports = {
	chai: chai,

	createPaymentVault: () => {
		var paymentVaultOptions = { publicKey: keys.public, secretKey: keys.secret, env: 'sandbox' };
		return paymaya.initPaymentVault(paymentVaultOptions);
	},

	buildCreateCustomerPayload: () => {
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
	},

	buildCardDetails: () => {
		return {
			number: '5123456789012346',
			expMonth: '05',
			expYear: '2017',
			cvc: '111'
		}
	}
}
