module.exports.PaymayaSDK = require('./lib/paymaya/PaymayaSDK');
module.exports.Checkout = require('./lib/paymaya/api/Checkout');
module.exports.Customization = require('./lib/paymaya/api/Customization');
module.exports.Payments = require('./lib/paymaya/api/Payments');
module.exports.Webhook = require('./lib/paymaya/api/Webhook');
module.exports.APIManager = require('./lib/paymaya/core/APIManager');
module.exports.Constants = require('./lib/paymaya/core/Constants');
module.exports.HttpConfig = require('./lib/paymaya/core/HttpConfig');
module.exports.HttpConnection = require('./lib/paymaya/core/HttpConnection');
module.exports.PaymayaApiError = require('./lib/paymaya/core/PaymayaApiError');
module.exports.Address = require('./lib/paymaya/model/checkout/Address');
module.exports.Buyer = require('./lib/paymaya/model/checkout/Buyer');
module.exports.Contact = require('./lib/paymaya/model/checkout/Contact');
module.exports.Item = require('./lib/paymaya/model/checkout/Item');
module.exports.ItemAmount = require('./lib/paymaya/model/checkout/ItemAmount');
module.exports.ItemAmountDetails = require('./lib/paymaya/model/checkout/ItemAmountDetails');

var rek = require('rekuire');
var _ = require('lodash');
var PaymentVault = rek('payment-vault');
var constants = rek('Constants');

module.exports = {
	initPaymentVault: function (options) {
		options = _.cloneDeep(options);
		options.baseUrl = options.env == 'production' ?
			constants.PAYMENTS_PRODUCTION_URL : constants.PAYMENTS_SANDBOX_URL;
		return new PaymentVault(options);
	}
};
