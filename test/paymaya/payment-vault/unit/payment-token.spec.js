var _ = require('lodash');
var nock = require('nock');
var rek = require('rekuire');
var sinon = require('sinon');
var PaymentToken = rek('payment-token');
var PaymayaApiError = rek('PaymayaApiError');

rek('chai-helper');


describe('PaymentToken', () => {
	var subject;

	before(() => { nock.disableNetConnect(); });

	after(() => { nock.enableNetConnect(); });

	beforeEach(() => {
		subject = new PaymentToken({
			publicKey: 'public-key',
			baseUrl: 'http://example.com'
		});
	});

	describe('#create', () => {
		var card, fakeResult;

		beforeEach(() => {
			card = {
				number: '5123456789012346',
				expMonth: '05',
				expYear: '2017',
				cvc: '111'
			};
			fakeResult = { foo: 'bar' };
		});

		it('calls create token API', () => {
			mockEndpointSuccess();
			return subject.create(card).should.be.fulfilled;
		});

		it('returns payment token created', () => {
			mockEndpointSuccess();
			return subject.create(card).should.eventually.become(fakeResult);
		});

		context('when unknown error occurs', () => {
			it('reports the error', () => {
				mockEndpoint().replyWithError('some unknown error');
				return subject.create(card)
					.should.be.rejected
					.then(error => {
						error.should.have.property('message', 'some unknown error');
					});
			});
		});

		context('when API replies with error object', () => {
			var sandbox, apiError, stub;

			beforeEach(() => {
				apiError = {
					'code': '2553',
					'message': 'Error message',
					'parameters': [
						{ 'field': 'card', 'description': 'desc' }
					],
					'details': { 'requestReferenceNumber': '001300000001' }
				};
				sandbox = sinon.sandbox.create();
				stub = sandbox.stub(PaymayaApiError, 'fromPaymentVaultReply')
					.returns(apiError);
				mockEndpoint().reply(400, apiError);
			});

			afterEach(() => { sandbox.restore(); });

			it('returns API error', () => {
				return subject.create(card)
					.should.be.rejected
					.then(error => { error.should.deep.equal(apiError); });
			});

			it('constructs the error with the response body', () => {
				return subject.create(card)
					.should.be.rejected
					.then(() => { stub.should.be.calledWith(400, apiError); });
			});
		});

		function mockEndpointSuccess() {
			return mockEndpoint().reply(200, fakeResult);
		}

		function mockEndpoint() {
			return nock('http://example.com')
				.post('/payment-tokens', { card: card })
				.basicAuth({ user: 'public-key', pass: '' })
		}
	});
});
