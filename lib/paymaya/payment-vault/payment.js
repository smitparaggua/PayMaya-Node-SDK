var rek = require('rekuire');
var resource = rek('resource');

function Payment (options) {
	this._baseUrl = options.baseUrl;
	this._secretKey = options.secretKey;
}

Payment.prototype = {
	create: function (paymentDetails, callback) {
		if (paymentDetails.customerId && paymentDetails.cardId) {
			return resource.call({
				url: this._baseUrl + '/customers/' + paymentDetails.customerId +
					'/cards/' + paymentDetails.cardId + '/payments',
				key: this._secretKey,
				method: 'post',
				json: { totalAmount: paymentDetails.totalAmount }
			}, callback);
		} else {
			return resource.call({
				url: this._baseUrl + '/payments',
				key: this._secretKey,
				method: 'post',
				json: paymentDetails
			}, callback);
		}
	},

	retrieve: function (id, callback) {
		return resource.call({
			url: this._baseUrl + '/payments/' + id,
			key: this._secretKey
		}, callback);
	}
};

module.exports = Payment;

