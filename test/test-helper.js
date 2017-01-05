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
	}
}
