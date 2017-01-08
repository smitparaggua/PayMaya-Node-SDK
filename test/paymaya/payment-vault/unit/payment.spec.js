var nock = require('nock');
var rek = require('rekuire');
var sinon = require('sinon');
var Payment = rek('payment');
var PaymayaApiError = rek('PaymayaApiError');
var resource = rek('resource');

var testHelper = rek('test-helper');


describe('Payment', () => {
	var subject, sandbox;

	before(() => { nock.disableNetConnect(); });

	after(() => { nock.enableNetConnect(); });

	beforeEach(() => {
		subject = new Payment({
			secretKey: 'secret-key',
			baseUrl: 'http://example.com'
		});
		sandbox = sinon.sandbox.create();
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('#create', () => {
		var resourceStub;

		beforeEach(() => {
			resourceStub = sandbox.stub(resource, 'call')
				.returns(Promise.resolve({ foo: 'bar' }));
		});

		context('when Payment Token ID and Buyer Details are provided', () => {
			it('creates one time payment', () => {
				var paymentDetails = buildPaymentDetails();
				return subject.create(paymentDetails).should.be.fulfilled
					.then(result => result.should.deep.equal({ foo: 'bar' }))
					.then(() => {
						resourceStub.should.have.been.calledWith({
							url: 'http://example.com/payments',
							json: paymentDetails,
							method: 'post',
							key: 'secret-key'
						});
					});
			});

			function buildPaymentDetails() {
				return {
					paymentTokenId: '68aKLAN64CXK7XWDA1HwSE6COo',
					totalAmount: { 'amount': 100, 'currency': 'PHP' },
					buyer: testHelper.buildBuyerDetails()
				};
			}
		});

		context('when Customer ID and Card ID are provided', () => {
			it('creates payment using vaulted card', () => {
				var totalAmount = { amount: 150, currency: 'PHP' };
				var paymentDetails = {
					cardId: 'card-id',
					customerId: 'customer-id',
					totalAmount: totalAmount
				};
				return subject.create(paymentDetails)
					.should.eventually.become({ foo: 'bar' })
					.then(() => {
						resourceStub.should.have.been.calledWith({
							url: 'http://example.com/customers/customer-id/cards/card-id/payments',
							key: 'secret-key',
							method: 'post',
							json: { totalAmount: totalAmount }
						});
					});
			});
		});
	});
});
