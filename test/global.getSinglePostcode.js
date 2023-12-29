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

describe('global/getSinglePostcode()', () => {
  it('should check the postcode parameter is required', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })

    return postcodeApi.getSinglePostcode({}, null, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.not.called
    })
  })
  it('should check the postcode parameter to be a string', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = 1234

    return postcodeApi.getSinglePostcode({}, postcode, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.not.called
    })
  })
  it('should check the postcode to be P6 formatted', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = '1234'

    return postcodeApi.getSinglePostcode({}, postcode, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.not.called
    })
  })
  it('should be able to call the API with the apiKey and postcode parameters', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = '1234AB'
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/postcodes/' + postcode,
      headers: {
        'X-Api-Key': 'test'
      },
      apiKey: 'test'
    }

    return postcodeApi.getSinglePostcode({ apiKey: 'test' }, postcode, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.calledWith(requestApiOptions)
    })
  })
})
