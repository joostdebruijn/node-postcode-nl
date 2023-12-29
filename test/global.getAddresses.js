/* eslint-disable no-undef, no-unused-expressions */
'use strict'
const postcodeApi = require('../index.js')
const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const api = require('../lib/requestApi.js')
const expect = chai.expect

before(() => {
  chai.use(sinonChai)
})

let sandbox
beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})

describe('global/getAddresses()', () => {
  it('should check the postcode parameter to be valid', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = '1234 AB'

    return postcodeApi.getAddresses({}, { postcode }, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.not.called
    })
  })
  it('should check the number parameter to be valid', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = '1234AB'
    const number = '12'

    return postcodeApi.getAddresses({}, { postcode, number }, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.not.called
    })
  })
  it('should ignore the number parameter if there is no postcode', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const number = 12
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses',
      headers: {
        'X-Api-Key': undefined
      },
      qs: {}
    }

    return postcodeApi.getAddresses({}, { number }, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.calledWith(requestApiOptions)
    })
  })
  it('should be able to call the API without any parameter', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses',
      headers: {
        'X-Api-Key': undefined
      },
      qs: {}
    }

    return postcodeApi.getAddresses({}, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.calledWith(requestApiOptions)
    })
  })
  it('should be able to call the API with the API-key', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses',
      headers: {
        'X-Api-Key': 'test'
      },
      apiKey: 'test',
      qs: {}
    }

    return postcodeApi.getAddresses({ apiKey: 'test' }, {}, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.calledWith(requestApiOptions)
    })
  })
  it('should be able to call the API with the postcode parameter', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = '1234AB'
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses',
      headers: {
        'X-Api-Key': undefined
      },
      qs: {
        postcode: '1234AB'
      }
    }

    return postcodeApi.getAddresses({}, { postcode }, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.calledWith(requestApiOptions)
    })
  })
  it('should be able to call the API with the postcode and number parameter', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = '1234AB'
    const number = 12
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses',
      headers: {
        'X-Api-Key': undefined
      },
      qs: {
        postcode: '1234AB',
        number: 12
      }
    }

    return postcodeApi.getAddresses({}, { postcode, number }, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.calledWith(requestApiOptions)
    })
  })
  it('should be able to call the API with the distance functionalities', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const query = {
      postcode: '1234AB',
      number: 12,
      longitude: 1.111,
      latitude: 1.222,
      sort: 'distance'
    }
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses',
      headers: {
        'X-Api-Key': undefined
      },
      qs: {
        postcode: '1234AB',
        number: 12,
        coords: {
          longitude: 1.111,
          latitude: 1.222
        },
        sort: 'distance'
      }
    }

    return postcodeApi.getAddresses({}, query, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.calledWith(requestApiOptions)
    })
  })
  it('should check that both the longitude as latitude are given', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const query = {
      postcode: '1234AB',
      number: 12,
      longitude: 1.111,
      sort: 'distance'
    }

    return postcodeApi.getAddresses({}, query, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.not.called
    })
  })
  it('should check that the sort parameter has a valid value', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const query = {
      postcode: '1234AB',
      number: 12,
      longitude: 1.111,
      latitude: 1.222,
      sort: 'test'
    }

    return postcodeApi.getAddresses({}, query, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.not.called
    })
  })
  it('should be able to send a followNext request', () => {
    // Setting up the test data
    const followNextStub = sandbox.stub(postcodeApi.helpers, 'followNext').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = '1234AB'
    const number = 12
    const followNextOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses',
      headers: {
        'X-Api-Key': undefined
      },
      qs: {
        postcode: '1234AB',
        number: 12
      },
      followNext: true
    }

    return postcodeApi.getAddresses({ followNext: true }, { postcode, number }, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(followNextStub).to.be.calledWith(followNextOptions)
    })
  })
})
