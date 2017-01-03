require('chai').should();
var rek = require('rekuire');
var sdk = rek('index');
var constants = rek('Constants');


describe('index', () => {
	describe('.initPaymentVault', () => {
		var options;

		beforeEach(() => {
			options = {
				publicKey: 'public-key',
				secretKey: 'secret-key',
				env: 'sandbox'
			}
		});

		context('when env is sandbox', () => {
			it('connects to sandbox endpoint', () => {
				options.env = 'sandbox'
				paymentVault = sdk.initPaymentVault(options);
				paymentVault.getBaseUrl().should.equal(constants.PAYMENTS_SANDBOX_URL);
			});
		});

		context('when env is production', () => {
			it('connects to production endpoint', () => {
				options.env = 'production'
				paymentVault = sdk.initPaymentVault(options);
				paymentVault.getBaseUrl().should.equal(constants.PAYMENTS_PRODUCTION_URL);
			});
		});

		it('sets up the keys', () => {
			paymentVault = sdk.initPaymentVault(options);
			paymentVault.getSecretKey().should.equal('secret-key');
			paymentVault.getPublicKey().should.equal('public-key');
		});
	});
});
