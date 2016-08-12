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
  sandbox = sinon.sandbox.create();
});

afterEach(() => {
  sandbox.restore();
});

describe('global/getPostcodes()', () => {
  it('should check the postcodeArea parameter to be a string', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const postcodeArea = 1234;

    postcodeApi.getPostcodes({}, postcodeArea, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.not.called;
    });
  });
  it('should check the postcodeArea parameter to be P4 formatted', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const postcodeArea = '1234AB';

    postcodeApi.getPostcodes({}, postcodeArea, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.not.called;
    });
  });
  it('should be able to call the API without any parameter', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/postcodes',
      headers : {
        'X-Api-Key' : undefined
      }
    };

    postcodeApi.getPostcodes({}, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
  it('should be able to call the API with the API-key', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/postcodes',
      headers : {
        'X-Api-Key' : 'test'
      },
      apiKey : 'test'
    };

    postcodeApi.getPostcodes({apiKey: 'test'}, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
  it('should be able to call the API with the postcodeArea parameter', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const postcodeArea = '1234';
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/postcodes/?postcodeArea=' + postcodeArea,
      headers : {
        'X-Api-Key' : undefined
      }
    };

    postcodeApi.getPostcodes({}, postcodeArea, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
});
