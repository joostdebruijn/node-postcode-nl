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
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });
    const query = {
      postcodeArea : 1234
    };

    return postcodeApi.getPostcodes({}, query, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.not.called;
    });
  });
  it('should check the postcodeArea parameter to be P4 formatted', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });
    const query = {
      postcodeArea : '1234AB'
    };

    return postcodeApi.getPostcodes({}, query, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.not.called;
    });
  });
  it('should be able to call the API without any parameter', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/postcodes',
      headers : {
        'X-Api-Key' : undefined
      },
      qs: {}
    };

    return postcodeApi.getPostcodes({}, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
  it('should be able to call the API with the API-key', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/postcodes',
      headers : {
        'X-Api-Key' : 'test'
      },
      apiKey : 'test',
      qs: {}
    };

    return postcodeApi.getPostcodes({apiKey: 'test'}, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
  it('should be able to call the API with the postcodeArea parameter', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });
    const query = {
      postcodeArea : '1234'
    };
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/postcodes',
      headers : {
        'X-Api-Key' : undefined
      },
      qs: {
        postcodeArea: '1234'
      }
    };

    return postcodeApi.getPostcodes({}, query, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
  it('should be able to call the API with the distance functionalities', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });
    const query = {
      postcodeArea : '1234',
      longitude: 1.111,
      latitude: 1.222,
      sort: 'distance'
    };
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/postcodes',
      headers : {
        'X-Api-Key' : undefined
      },
      qs: {
        postcodeArea: '1234',
        coords: {
          longitude: 1.111,
          latitude: 1.222
        },
        sort: 'distance'
      }
    };

    return postcodeApi.getPostcodes({}, query, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.calledWith(requestApiOptions);
    });
  });
  it('should check that both the longitude as latitude are given', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });
    const query = {
      postcodeArea : '1234',
      longitude: 1.111,
      sort: 'distance'
    };

    return postcodeApi.getPostcodes({}, query, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.not.called;
    });
  });
  it('should check that the sort parameter has a valid value', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null);
    });
    const query = {
      postcodeArea : '1234',
      longitude: 1.111,
      latitude: 1.222,
      sort: 'test'
    };

    return postcodeApi.getPostcodes({}, query, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(requestApiStub).to.be.not.called;
    });
  });
  it('should be able to send a followNext request', () => {
    // Setting up the test data
    const followNextStub = sandbox.stub(postcodeApi.helpers, 'followNext').callsFake((options, callback) => {
      callback(null, null);
    });
    const query = {
      postcodeArea : '1234'
    };
    const followNextOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/postcodes',
      headers : {
        'X-Api-Key' : undefined
      },
      followNext: true,
      qs: {
        postcodeArea: '1234'
      }
    };

    return postcodeApi.getPostcodes({ followNext: true }, query, (error, body, rateLimit) => {
      expect(error).to.eql(null);
      expect(body).to.eql(null);
      expect(rateLimit).to.eql(undefined);
      expect(followNextStub).to.be.calledWith(followNextOptions);
    });
  });
});
