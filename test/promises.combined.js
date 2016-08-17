'use strict';
const postcodeApi = require('../index.js');
const interalApi = require('../lib/promisesRequires.js');

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

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

describe('promises/getAddresses()', () => {
  it('should resolve with the response in an object', () => {
    const apiStub = sandbox.stub(interalApi, 'getAddresses', (options, query, callback) => {
      return callback(null, null, null);
    });

    const expectedResult = {
      result: null
    };

    return postcodeApi.promises.getAddresses({}, {}).then((resolved) => {
      expect(resolved).to.eql(expectedResult);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({});
    });
  });
  it('should resolve with the response and rateLimit in an object', () => {
    const rateLimit = {
      limit: 30,
      remaining: 15
    };

    const apiStub = sandbox.stub(interalApi, 'getAddresses', (options, query, callback) => {
      return callback(null, null, rateLimit);
    });

    const expectedResult = {
      result: null,
      rateLimit:  {
        limit: 30,
        remaining: 15
      }
    };

    return postcodeApi.promises.getAddresses({ returnRateLimit: true }, null).then((resolved) => {
      expect(resolved).to.eql(expectedResult);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({ returnRateLimit: true });
    });
  });
  it('should reject when an error occured', () => {
    const apiStub = sandbox.stub(interalApi, 'getAddresses', (options, query, callback) => {
      return callback(new Error('Error'), null);
    });

    return postcodeApi.promises.getAddresses({}, null).catch((error) => {
      expect(error).to.be.instanceof(Error);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({});
    });
  });
});

describe('promises/getAddressesByPostcodeAndNumber()', () => {
  it('should resolve with the response in an object', () => {
    const apiStub = sandbox.stub(interalApi, 'getAddressesByPostcodeAndNumber', (options, query, callback) => {
      return callback(null, null, null);
    });

    const expectedResult = {
      result: null
    };

    return postcodeApi.promises.getAddressesByPostcodeAndNumber({}, {}).then((resolved) => {
      expect(resolved).to.eql(expectedResult);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({});
    });
  });
  it('should resolve with the response and rateLimit in an object', () => {
    const rateLimit = {
      limit: 30,
      remaining: 15
    };

    const apiStub = sandbox.stub(interalApi, 'getAddressesByPostcodeAndNumber', (options, query, callback) => {
      return callback(null, null, rateLimit);
    });

    const expectedResult = {
      result: null,
      rateLimit:  {
        limit: 30,
        remaining: 15
      }
    };

    return postcodeApi.promises.getAddressesByPostcodeAndNumber({ returnRateLimit: true }, null).then((resolved) => {
      expect(resolved).to.eql(expectedResult);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({ returnRateLimit: true });
    });
  });
  it('should reject when an error occured', () => {
    const apiStub = sandbox.stub(interalApi, 'getAddressesByPostcodeAndNumber', (options, query, callback) => {
      return callback(new Error('Error'), null);
    });

    return postcodeApi.promises.getAddressesByPostcodeAndNumber({}, null).catch((error) => {
      expect(error).to.be.instanceof(Error);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({});
    });
  });
});

describe('promises/getSingleAddress()', () => {
  it('should resolve with the response in an object', () => {
    const apiStub = sandbox.stub(interalApi, 'getSingleAddress', (options, query, callback) => {
      return callback(null, null, null);
    });

    const expectedResult = {
      result: null
    };

    return postcodeApi.promises.getSingleAddress({}, {}).then((resolved) => {
      expect(resolved).to.eql(expectedResult);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({});
    });
  });
  it('should resolve with the response and rateLimit in an object', () => {
    const rateLimit = {
      limit: 30,
      remaining: 15
    };

    const apiStub = sandbox.stub(interalApi, 'getSingleAddress', (options, query, callback) => {
      return callback(null, null, rateLimit);
    });

    const expectedResult = {
      result: null,
      rateLimit:  {
        limit: 30,
        remaining: 15
      }
    };

    return postcodeApi.promises.getSingleAddress({ returnRateLimit: true }, null).then((resolved) => {
      expect(resolved).to.eql(expectedResult);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({ returnRateLimit: true });
    });
  });
  it('should reject when an error occured', () => {
    const apiStub = sandbox.stub(interalApi, 'getSingleAddress', (options, query, callback) => {
      return callback(new Error('Error'), null);
    });

    return postcodeApi.promises.getSingleAddress({}, null).catch((error) => {
      expect(error).to.be.instanceof(Error);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({});
    });
  });
});

describe('promises/getPostcodes()', () => {
  it('should resolve with the response in an object', () => {
    const apiStub = sandbox.stub(interalApi, 'getPostcodes', (options, query, callback) => {
      return callback(null, null, null);
    });

    const expectedResult = {
      result: null
    };

    return postcodeApi.promises.getPostcodes({}, {}).then((resolved) => {
      expect(resolved).to.eql(expectedResult);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({});
    });
  });
  it('should resolve with the response and rateLimit in an object', () => {
    const rateLimit = {
      limit: 30,
      remaining: 15
    };

    const apiStub = sandbox.stub(interalApi, 'getPostcodes', (options, query, callback) => {
      return callback(null, null, rateLimit);
    });

    const expectedResult = {
      result: null,
      rateLimit:  {
        limit: 30,
        remaining: 15
      }
    };

    return postcodeApi.promises.getPostcodes({ returnRateLimit: true }, null).then((resolved) => {
      expect(resolved).to.eql(expectedResult);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({ returnRateLimit: true });
    });
  });
  it('should reject when an error occured', () => {
    const apiStub = sandbox.stub(interalApi, 'getPostcodes', (options, query, callback) => {
      return callback(new Error('Error'), null);
    });

    return postcodeApi.promises.getPostcodes({}, null).catch((error) => {
      expect(error).to.be.instanceof(Error);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({});
    });
  });
});

describe('promises/getSinglePostcode()', () => {
  it('should resolve with the response in an object', () => {
    const apiStub = sandbox.stub(interalApi, 'getSinglePostcode', (options, query, callback) => {
      return callback(null, null, null);
    });

    const expectedResult = {
      result: null
    };

    return postcodeApi.promises.getSinglePostcode({}, {}).then((resolved) => {
      expect(resolved).to.eql(expectedResult);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({});
    });
  });
  it('should resolve with the response and rateLimit in an object', () => {
    const rateLimit = {
      limit: 30,
      remaining: 15
    };

    const apiStub = sandbox.stub(interalApi, 'getSinglePostcode', (options, query, callback) => {
      return callback(null, null, rateLimit);
    });

    const expectedResult = {
      result: null,
      rateLimit:  {
        limit: 30,
        remaining: 15
      }
    };

    return postcodeApi.promises.getSinglePostcode({ returnRateLimit: true }, null).then((resolved) => {
      expect(resolved).to.eql(expectedResult);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({ returnRateLimit: true });
    });
  });
  it('should reject when an error occured', () => {
    const apiStub = sandbox.stub(interalApi, 'getSinglePostcode', (options, query, callback) => {
      return callback(new Error('Error'), null);
    });

    return postcodeApi.promises.getSinglePostcode({}, null).catch((error) => {
      expect(error).to.be.instanceof(Error);
      expect(apiStub).to.be.called.once;
      expect(apiStub).to.be.calledWith({});
    });
  });
});
