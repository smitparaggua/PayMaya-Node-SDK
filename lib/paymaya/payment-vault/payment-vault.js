var rek = require('rekuire');
var constants = rek('Constants');
var PaymentToken = rek('payment-token');

function PaymentVault(options) {
	this._baseUrl = options.baseUrl;
	this._secretKey = options.secretKey;
	this._publicKey = options.publicKey;
	this.paymentToken = new PaymentToken(options);
}

PaymentVault.prototype = {
	getBaseUrl: function () { return this._baseUrl; },
	getSecretKey: function () { return this._secretKey; },
	getPublicKey: function () { return this._publicKey; }
};

module.exports = PaymentVault;
