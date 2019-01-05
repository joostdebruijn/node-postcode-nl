'use strict';
const postcodeApi = require('../index.js');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');
const requestApi = require('../lib/requestApi.js');

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

// Loading assets
const response1 = require('./assets/followNext/response1.json');
const response2 = require('./assets/followNext/response2.json');
const response3 = require('./assets/followNext/response3.json');
const expectedResult = require('./assets/followNext/expected.json');
const rateLimit = {
  limit: 123,
  remaining: 123
};
const rateLimitLast = {
  limit: 123,
  remaining: 0
};

describe('helpers/followNext()', () => {
  it('should be able to follow next-href of the _links object in a response', () => {
    // Preparing requestApi
    const requestApiStub = sandbox.stub(requestApi, 'get').callsFake((options, callback) => {
      switch (options.url) {
        // Respond with the correct json
        case 'https://www.test.nl/page1':
          return callback(null, response1, rateLimit);
        case 'https://www.test.nl/page2':
          return callback(null, response2, rateLimit);
        case 'https://www.test.nl/page3':
          return callback(null, response3, rateLimitLast);
      }
    });

    // Preparing options
    let options = {
      url: 'https://www.test.nl/page1'
    };

    // Run the function
    return postcodeApi.helpers.followNext(options, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(expectedResult);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(options);
      expect(requestApiStub).to.be.calledThrice;
    });
  });
  it('should be to return the correct rateLimits after performing several requests', () => {
    // Preparing requestApi
    const requestApiStub = sandbox.stub(requestApi, 'get').callsFake((options, callback) => {
      switch (options.url) {
        // Respond with the correct json
        case 'https://www.test.nl/page1':
          return callback(null, response1, rateLimit);
        case 'https://www.test.nl/page2':
          return callback(null, response2, rateLimit);
        case 'https://www.test.nl/page3':
          return callback(null, response3, rateLimitLast);
      }
    });

    // Setting options
    let options = {
      url: 'https://www.test.nl/page1',
      returnRateLimit: true
    };

    // Run the function
    return postcodeApi.helpers.followNext(options, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(expectedResult);
      expect(rateLimit).to.eql(rateLimitLast);
      expect(requestApiStub).to.be.calledWith(options);
      expect(requestApiStub).to.be.calledThrice;
    });
  });
  it('should be able to handle a single response without next-href', () => {
    // Preparing requestApi
    const requestApiStub = sandbox.stub(requestApi, 'get').callsFake((options, callback) => {
      return callback(null, response3);
    });

    postcodeApi.helpers.followNext({}, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(response3);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledOnce;
    });
  });
  it('should be able to handle a single response without next-href and return the right rateLimit', () => {
    // Preparing requestApi
    const requestApiStub = sandbox.stub(requestApi, 'get').callsFake((options, callback) => {
      return callback(null, response3, rateLimitLast);
    });

    // Setting options
    let options = {
      returnRateLimit: true
    };

    return postcodeApi.helpers.followNext(options, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(response3);
      expect(rateLimit).to.eql(rateLimitLast);
      expect(requestApiStub).to.be.calledWith(options);
      expect(requestApiStub).to.be.calledOnce;
    });
  });
  it('should be able to handle errors from requestApi.get()', () => {
    // Preparing requestApi
    const requestApiStub = sandbox.stub(requestApi, 'get').callsFake((options, callback) => {
      return callback(new Error('Error'), null);
    });

    return postcodeApi.helpers.followNext({}, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledOnce;
    });
  });
  it('should be able to handle no results from the external API', () => {
    // Preparing requestApi
    const requestApiStub = sandbox.stub(requestApi, 'get').callsFake((options, callback) => {
      return callback(null, null);
    });

    return postcodeApi.helpers.followNext({}, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledOnce;
    });
  });
  it('should be able to handle errors from mergeResults() when performing there is a next-href', () => {
    // Preparing requestApi
    const requestApiStub = sandbox.stub(requestApi, 'get').callsFake((options, callback) => {
      return callback(null, response1);
    });
    const mergeResults = sandbox.stub(postcodeApi.helpers, 'mergeResults')
      .callsFake((source, destination, callback) => {
        return callback(new Error('Error'), null);
      });

    return postcodeApi.helpers.followNext({}, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledTwice;
      expect(mergeResults).to.be.calledOnce;
    });
  });
  it('should be able to handle errors from mergeResults() when performing there is no next-href', () => {
    // Preparing requestApi
    const requestApiStub = sandbox.stub(requestApi, 'get').callsFake((options, callback) => {
      return callback(null, response3);
    });
    const mergeResults = sandbox.stub(postcodeApi.helpers, 'mergeResults')
      .callsFake((source, destination, callback) => {
        return callback(new Error('Error'), null);
      });

    return postcodeApi.helpers.followNext({}, response2, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledOnce;
      expect(mergeResults).to.be.calledOnce;
    });
  });
});
