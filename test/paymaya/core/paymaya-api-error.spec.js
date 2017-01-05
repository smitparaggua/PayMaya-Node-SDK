var rek = require('rekuire');
var PaymayaApiError = rek('PaymayaApiError');
rek('test-helper');

describe('PaymayaApiError', () => {
	describe('fromPaymentVaultReply', () => {
		it('converts error parameter to PaymayaApiError', () => {
			var error = {
				code: '123',
				message: 'error',
				parameters: { foo: 'bar' },
				details: { baz: 'qux' }
			};
			var instance = PaymayaApiError.fromPaymentVaultReply(400, error)
			instance.should.include(error);
			instance.should.have.property('httpStatusCode', 400);
			instance.name.should.equal('PaymayaApiError');
		});
	});
});
