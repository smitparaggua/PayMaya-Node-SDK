var request = require('requestretry');
var rek = require('rekuire');
var PaymayaApiError = rek('PaymayaApiError');
var Promise = require('bluebird');

module.exports = {
	call: function(options, callback) {
		var requestOptions = {
			url: options.url,
			method: options.method || 'get',
			headers: buildHeaders(options.key),
			json: options.json
		}
		if (callback) {
			sendRequest(requestOptions, callback);
		} else {
			return Promise.promisify(sendRequest)(requestOptions);
		}
	}
}

function sendRequest(requestOptions, callback) {
	request(requestOptions, function (error, response, body) {
		if (error) { callback(error); }
		try { body = JSON.parse(body); } catch (error) { }
		if (response.statusCode >= 400) {
			callback(PaymayaApiError.fromPaymentVaultReply(response.statusCode, body));
		}
		callback(null, body);
	});
}

function buildHeaders(key) {
	var auth;
	if (key) {
		auth = 'Basic ' + new Buffer(key + ':').toString('base64');
	}
	return {
		'Content-Type': 'application/json',
		'Authorization': auth
	}
}
