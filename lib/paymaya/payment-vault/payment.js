var rek = require('rekuire');
var resource = rek('resource');

function Payment (options) {
	this._baseUrl = options.baseUrl;
	this._secretKey = options.secretKey;
}

Payment.prototype = {
	create: function (paymentDetails, callback) {
		return resource.call({
			url: this._baseUrl + '/payments',
			key: this._secretKey,
			method: 'post',
			json: paymentDetails
		}, callback);
	},

	retrieve: function (id, callback) {
		return resource.call({
			url: this._baseUrl + '/payments/' + id,
			key: this._secretKey
		}, callback);
	}
};

module.exports = Payment;

