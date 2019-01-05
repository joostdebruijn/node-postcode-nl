'use strict';
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const request = require('request');
const requestApi = require('../lib/requestApi.js');
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

describe('global/requestApi()', () => {
  it('should requests data from the API based on the given options', () => {
    // Setting up the test data
    const options = {
      url: 'https://testapi.net',
      headers: {
        'X-Api-Key' : 'abcdefghijklmnopQRSTUVWXYZ123'
      }
    };
    const requestOptions = {
      url : options.url,
      headers : options.headers,
      json: true,
      qs: {}
    };
    const requestStub = sandbox.stub(request, 'get').callsFake((options, callback) => {
      callback(null, { statusCode: 200 }, 'test');
    });

    return requestApi.get(options, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql('test');
      expect(rateLimit).to.eql(undefined);
      expect(requestStub).to.be.calledWith(requestOptions);
    });
  });
  it('should return the rateLimits if requested', () => {
    // Setting up the test data
    const options = {
      returnRateLimit: true
    };
    const response = {
      statusCode : 200,
      headers: {
        'x-ratelimit-limit': 500,
        'x-ratelimit-remaining': 400
      }
    };
    const rateLimitReturn = {
      limit: response.headers['x-ratelimit-limit'],
      remaining: response.headers['x-ratelimit-remaining']
    };

    sandbox.stub(request, 'get').callsFake((options, callback) => {
      callback(null, response, null);
    });

    return requestApi.get(options, (error, body, rateLimit) => {
      expect(rateLimit).to.eql(rateLimitReturn);
    });
  });
  it('should return null if a 404 was responded by the API', () => {
    // Setting up the test data
    const response = {
      statusCode : 404,
    };

    sandbox.stub(request, 'get').callsFake((options, callback) => {
      callback(null, response, null);
    });

    return requestApi.get({}, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
    });
  });
  it('should return a error when the statusCode is not 200 or 404', () => {
    // Setting up the test data
    const response = {
      statusCode : 403,
    };

    sandbox.stub(request, 'get').callsFake((options, callback) => {
      callback(null, response, null);
    });

    return requestApi.get({}, (error, body, rateLimit) => {
      expect(error).to.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
    });
  });
  it('should be able to handle errors from the request module and pass them through', () => {
    sandbox.stub(request, 'get').callsFake((options, callback) => {
      callback(new Error(''), null, null);
    });

    return requestApi.get({}, (error, body, rateLimit) => {
      expect(error).to.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
    });
  });
});
