var rek = require('rekuire');
var resource = rek('resource');

function Customer(options) {
	this._baseUrl = options.baseUrl + '/customers';
	this._secretKey = options.secretKey;
}

Customer.prototype = {
	create: function(customerDetails, callback) {
		return resource.call({
			url: this._baseUrl,
			method: 'post',
			key: this._secretKey,
			json: customerDetails
		});
	},

	retrieve: function (customerId, callback) {
		return resource.call({
			url: this._baseUrl + '/' + customerId,
			key: this._secretKey
		});
	},

	update: function (customerId, updates, callback) {
		return resource.call({
			url: this._baseUrl + '/' + customerId,
			key: this._secretKey,
			method: 'put',
			json: updates
		});
	},

	destroy: function(customerId, callback) {
		return resource.call({
			url: this._baseUrl + '/' + customerId,
			method: 'delete',
			key: this._secretKey,
		})
	}
}

module.exports = Customer;
