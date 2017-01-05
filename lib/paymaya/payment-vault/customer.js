var rek = require('rekuire');
var resource = rek('resource');

function Customer(options) {
	this._baseUrl = options.baseUrl;
	this._secretKey = options.secretKey;
}

Customer.prototype = {
	create: function(customerDetails, callback) {
		return resource.call({
			url: this._baseUrl + '/customers',
			method: 'post',
			key: this._secretKey,
			json: customerDetails
		});
	}
}

module.exports = Customer;
