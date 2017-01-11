var rek = require('rekuire');
var resource = rek('resource');
var _ = require('lodash');

function Refund(options) {
	this._baseUrl = options.baseUrl;
	this._secretKey = options.secretKey;
}

Refund.prototype = {
	create: function (refundDetails, callback) {
		return resource.call({
			url: this._buildUrl(refundDetails.paymentId),
			method: 'post',
			key: this._secretKey,
			json: _.pick(refundDetails, 'reason', 'totalAmount')
		}, callback);
	},

	list: function (paymentId, callback) {
		return resource.call({
			url: this._buildUrl(paymentId),
			key: this._secretKey
		}, callback);
	},

	retrieve: function (paymentId, refundId, callback) {
		return resource.call({
			url: this._buildUrl(paymentId, refundId),
			key: this._secretKey
		}, callback);
	},

	_buildUrl: function (paymentId, refundId) {
		var url = this._baseUrl + '/payments/' + paymentId + '/refunds';
		if (refundId) {
			url = url + '/' + refundId;
		}
		return url;
	}
};

module.exports = Refund;
