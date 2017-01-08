var rek = require('rekuire');
var resource = rek('resource');

function Subscription (options) {
	this._baseUrl = options.baseUrl;
	this._secretKey = options.secretKey;
}

Subscription.prototype = {
	create: function (customerId, cardId, subscriptionDetails, callback) {
		return resource.call({
			url: this._buildUrl(customerId, cardId),
			method: 'post',
			key: this._secretKey,
			json: subscriptionDetails
		}, callback);
	},

	list: function (customerId, cardId, callback) {
		return resource.call({
			url: this._buildUrl(customerId, cardId),
			key: this._secretKey,
		}, callback);
	},

	retrieve: function (id, callback) {
		return resource.call({
			url: this._baseUrl + '/subscriptions/' + id,
			key: this._secretKey
		}, callback);
	},

	retrievePayments: function (id, callback) {
		return resource.call({
			url: this._baseUrl + '/subscriptions/' + id + '/payments',
			key: this._secretKey
		}, callback);
	},

	cancel: function (id, callback) {
		return resource.call({
			url: this._baseUrl + '/subscriptions/' + id,
			key: this._secretKey
		}, callback);
	},

	_buildUrl: function (customerId, cardId) {
		return this._baseUrl + '/customers/' + customerId + '/cards/' +
			cardId + '/subscriptions';
	}
};

module.exports = Subscription;

