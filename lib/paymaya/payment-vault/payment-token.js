var rek = require('rekuire');
var resource = rek('resource');

function PaymentToken(options) {
	this._baseUrl = options.baseUrl;
	this._publicKey = options.publicKey;
}

PaymentToken.prototype = {
	create: function (card, callback) {
		return resource.call({
			url: this._baseUrl + '/payment-tokens',
			method: 'post',
			key: this._publicKey,
			json: { card: card }
		}, callback);
	}
};

module.exports = PaymentToken;
