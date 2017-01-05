var nock = require('nock');
var rek = require('rekuire');
var sinon = require('sinon');
var Payment = rek('payment');
var PaymayaApiError = rek('PaymayaApiError');

rek('test-helper');


describe('Payment', () => {
	var subject;

	before(() => { nock.disableNetConnect(); });

	after(() => { nock.enableNetConnect(); });

	beforeEach(() => {
		subject = new Payment({
			secretKey: 'secret-key',
			baseUrl: 'http://example.com'
		});
	});

	describe('#create', () => {
		it('calls create payment API', () => {
			var paymentDetails = buildPaymentDetails();
			nock('http://example.com')
				.post('/payments', paymentDetails)
				.basicAuth({ user: 'secret-key', pass: '' })
				.reply(200, { foo: 'bar' });
			return subject.create(paymentDetails).should.be.fulfilled
				.then(result => result.should.deep.equal({ foo: 'bar' }));
		});

		function buildPaymentDetails() {
			return {
				paymentTokenId: '68aKLAN64CXK7XWDA1HwSE6COo',
				totalAmount: { 'amount': 100, 'currency': 'PHP' },
				buyer: {
					firstName: 'Ysa',
					middleName: 'Cruz',
					lastName: 'Santos',
					contact: { phone: '09123456789', email: 'test@example.com' },
					billingAddress: {
						line1: '9F Robinsons Cybergate 3',
						line2: 'Pioneer Street',
						city: 'Mandaluyong City',
						state: 'Metro Manila',
						zipCode: '12345',
						countryCode: 'PH'
					}
				}
			};
		}
	});
});
