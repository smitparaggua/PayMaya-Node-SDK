var Promise = require('bluebird');
var request = require('requestretry');
var rek = require('rekuire');
var PaymayaApiError = rek('PaymayaApiError');

function PaymentToken (options) {
	this._baseUrl = options.baseUrl;
	this._publicKey = options.publicKey;
}

PaymentToken.prototype = {
	create: function (card, callback) {
		var requestOptions = {
			url: this._baseUrl + '/payment-tokens',
			method: 'post',
			headers: this._requestHeaders(),
			json: { card: card }
		}
		return request(requestOptions)
			.then(function (response) {
				if(response.statusCode >= 400) {
					throw PaymayaApiError.fromPaymentVaultReply(400, response.toJSON().body);
				}
				return response.toJSON().body;
			});
	},

	_requestHeaders: function () {
		var auth = 'Basic ' + new Buffer(this._publicKey + ':').toString('base64');
		return {
			'Content-Type': 'application/json',
			'Authorization': auth
		}
	}
};

module.exports = PaymentToken;
