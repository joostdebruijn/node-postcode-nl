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

describe('global/getAddresses()', () => {
  it('should check the postcode parameter to be valid', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const postcode = '1234 AB';

    postcodeApi.getAddresses({}, { postcode }, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.not.called;
    });
  });
  it('should check the number parameter to be valid', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const postcode = '1234AB';
    const number = '12';

    postcodeApi.getAddresses({}, { postcode, number }, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.not.called;
    });
  });
  it('should ignore the number parameter if there is no postcode', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const number = 12;
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses',
      headers : {
        'X-Api-Key' : undefined
      }
    };

    postcodeApi.getAddresses({}, { number }, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
  it('should be able to call the API without any parameter', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses',
      headers : {
        'X-Api-Key' : undefined
      }
    };

    postcodeApi.getAddresses({}, {}, (error, body, rateLimit) => {
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
      url: 'https://postcode-api.apiwise.nl/v2/addresses',
      headers : {
        'X-Api-Key' : 'test'
      },
      apiKey : 'test'
    };

    postcodeApi.getAddresses({apiKey: 'test'}, {}, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
  it('should be able to call the API with the postcode parameter', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const postcode = '1234AB';
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses/?postcode=' + postcode,
      headers : {
        'X-Api-Key' : undefined
      }
    };

    postcodeApi.getAddresses({}, { postcode }, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
  it('should be able to call the API with the postcode and number parameter', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get', (options, callback) => {
      callback(null, null);
    });
    const postcode = '1234AB';
    const number = 12;
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses/?postcode=' + postcode + '&number=' + number,
      headers : {
        'X-Api-Key' : undefined
      }
    };

    postcodeApi.getAddresses({}, { postcode, number }, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
  it('should be able to send a followNext request', () => {
    // Setting up the test data
    const followNextStub = sandbox.stub(postcodeApi.helpers, 'followNext', (options, callback) => {
      callback(null, null);
    });
    const postcode = '1234AB';
    const number = 12;
    const followNextOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses/?postcode=' + postcode + '&number=' + number,
      headers : {
        'X-Api-Key' : undefined
      },
      followNext: true
    };

    postcodeApi.getAddresses({ followNext: true }, { postcode, number }, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(followNextStub).to.be.calledWith(followNextOptions);
    });
  });
});
