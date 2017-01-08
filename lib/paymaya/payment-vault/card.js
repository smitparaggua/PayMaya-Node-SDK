var rek = require('rekuire');
var resource = rek('resource');

function Card(options) {
	this._baseUrl = options.baseUrl;
	this._secretKey = options.secretKey;
}

Card.prototype = {
	create: function (customerId, cardDetails, callback) {
		return resource.call({
			url: this._getUrl(customerId),
			method: 'post',
			key: this._secretKey,
			json: cardDetails
		}, callback);
	},

	destroy: function (customerId, cardId, callback) {
		return resource.call({
			url: this._getUrl(customerId, cardId),
			method: 'delete',
			key: this._secretKey,
		}, callback);
	},

	list: function (customerId, callback) {
		return resource.call({
			url: this._getUrl(customerId),
			key: this._secretKey
		}, callback);
	},

	update: function (customerId, cardId, updates, callback) {
		return resource.call({
			url: this._getUrl(customerId, cardId),
			method: 'put',
			key: this._secretKey,
			json: updates
		}, callback);
	},

	retrieve: function (customerId, cardId, callback) {
		return resource.call({
			url: this._getUrl(customerId, cardId),
			key: this._secretKey
		}, callback);
	},

	_getUrl: function(customerId, cardId) {
		var url = this._baseUrl + '/customers/' + customerId + '/cards';
		if (cardId) {
			url = url + '/' + cardId;
		}
		return url;
	}
}


module.exports = Card;
