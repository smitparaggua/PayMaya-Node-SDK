var rek = require('rekuire');
var constants = rek('Constants');
var PaymentToken = rek('payment-token');
var Payment = rek('payment');
var Customer = rek('customer');
var Card = rek('card');
var Subscription = rek('subscription');
var Webhook = require('./webhook');

function PaymentVault(options) {
	this._baseUrl = options.baseUrl;
	this._secretKey = options.secretKey;
	this._publicKey = options.publicKey;
	this.paymentToken = new PaymentToken(options);
	this.payment = new Payment(options);
	this.customer = new Customer(options);
	this.card = new Card(options);
	this.subscription = new Subscription(options);
	this.webhook = new Webhook(options);
}

PaymentVault.prototype = {
	getBaseUrl: function () { return this._baseUrl; },
	getSecretKey: function () { return this._secretKey; },
	getPublicKey: function () { return this._publicKey; }
};

module.exports = PaymentVault;
