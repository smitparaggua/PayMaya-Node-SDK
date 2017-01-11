var rek = require('rekuire');
var resource = rek('resource');

function Webhook(options) {
	this._baseUrl = options.baseUrl;
	this._secretKey = options.secretKey;
}

Webhook.prototype = {
	create: function (webhookDetails, callback) {
		return resource.call({
			url: this._buildUrl(),
			method: 'post',
			key: this._secretKey,
			json: webhookDetails
		}, callback);
	},

	list: function (callback) {
		return resource.call({
			url: this._buildUrl(),
			key: this._secretKey
		}, callback);
	},

	retrieve: function (id, callback) {
		return resource.call({
			url: this._buildUrl(id),
			key: this._secretKey
		}, callback);
	},

	update: function (id, updates, callback) {
		return resource.call({
			url: this._buildUrl(id),
			method: 'put',
			key: this._secretKey,
			json: updates
		}, callback);
	},

	destroy: function (id, callback) {
		return resource.call({
			url: this._buildUrl(id),
			method: 'delete',
			key: this._secretKey
		}, callback);
	},

	_buildUrl: function (webhookId) {
		if (webhookId) {
			return this._baseUrl + '/webhooks/' + webhookId;
		}
		return this._baseUrl + '/webhooks'
	}
};

module.exports = Webhook;
