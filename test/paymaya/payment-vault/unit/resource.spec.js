var nock = require('nock');
var rek = require('rekuire');
var sinon = require('sinon');
var PaymayaApiError = rek('PaymayaApiError');
var resource = rek('resource');

var testHelper = rek('test-helper');
var expect = testHelper.chai.expect;

const URL = 'http://example.com';

describe('resource', () => {
	describe('.call', () => {
		before(() => { nock.disableNetConnect(); });

		after(() => { nock.enableNetConnect(); });

		it('sends GET request to the provided url by default', () => {
			var mockedServer = nock(URL).get('/').reply(200, { foo: 'bar' });
			return resource.call({ url: URL })
				.should.be.fulfilled
				.then(result => {
					mockedServer.isDone().should.be.true;
					result.should.deep.equal({ foo: 'bar' });
				});
		});

		it('uses HTTP method based on method option', () => {
			var mockedServer = nock(URL).post('/').reply(200, 'success');
			return resource.call({ url: URL, method: 'post' })
				.should.be.fulfilled
				.then(() => {
					mockedServer.isDone().should.be.true;
				});
		});

		context('when key is provided', () => {
			it('uses basic auth', () => {
				var mockedServer = nock(URL)
					.get('/')
					.basicAuth({ user: 'key', pass: '' })
					.reply(200, 'success');
				return resource.call({ url: URL, key: 'key' })
					.should.be.fulfilled
					.then(() => {
						mockedServer.isDone().should.be.true;
					});
			});
		});

		it('uses json option as request parameter', () => {
			var mockedServer = nock(URL).post('/', { foo: 'bar' })
				.reply(200, 'success');
			return resource.call({ url: URL, json: { foo: 'bar' }, method: 'post' })
				.should.be.fulfilled
				.then(() => {
					mockedServer.isDone().should.be.true;
				});
		});

		it('supports traditional callbacks on success', done => {
			var mockedServer = nock(URL).get('/').reply(200, { foo: 'bar' });
			resource.call({ url: URL }, function (error, data) {
				expect(error).to.not.exist;
				data.should.deep.equal({ foo: 'bar' });
				done();
			});
		});

		it('supports traditional callbacks on fail', done => {
			var mockedServer = nock(URL).get('/').replyWithError('some unkown error');
			resource.call({ url: URL }, function (error, data) {
				expect(data).to.not.exist;
				error.should.have.property('message', 'some unkown error');
				done();
			});
		});
	});
});
