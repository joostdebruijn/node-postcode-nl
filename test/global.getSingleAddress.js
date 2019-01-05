'use strict';
const postcodeApi = require('../index.js');
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const api = require('../lib/requestApi.js');
const expect = chai.expect;

before(() => {
  chai.use(sinonChai);
});

var sandbox;
beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  sandbox.restore();
});

describe('global/getSingleAddress()', () => {
  it('should check the BAG-id parameter is required', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });

    return postcodeApi.getSingleAddress({}, null, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.not.called;
    });
  });
  it('should check the BAG-id parameter to be a string', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });
    const id = 1234;

    return postcodeApi.getSingleAddress({}, id , (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.not.called;
    });
  });
  it('should be able to call the API with the apiKey and BAG-id parameters', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });
    const id = '1234';
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses/' + id,
      headers : {
        'X-Api-Key' : 'test'
      },
      apiKey: 'test'
    };

    return postcodeApi.getSingleAddress({ apiKey : 'test' }, id, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
});
