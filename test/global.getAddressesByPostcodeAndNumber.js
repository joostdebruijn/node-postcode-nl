/* eslint-disable no-undef, no-unused-expressions */
import postcodeApi from '../index.js'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import * as chai from 'chai'
import api from '../lib/requestApi.js'
const expect = chai.expect

chai.use(sinonChai)

let sandbox
beforeEach(() => {
  sandbox = sinon.createSandbox()
})

afterEach(() => {
  sandbox.restore()
})

describe('global/getAddressesByPostcodeAndNumber()', () => {
  it('should check the postcode parameter is required', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const number = 12

    return postcodeApi.getAddressesByPostcodeAndNumber({}, { number }, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.not.called
    })
  })
  it('should check the postcode parameter to be valid', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = '1234 AB'

    return postcodeApi.getAddressesByPostcodeAndNumber({}, { postcode }, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.not.called
    })
  })
  it('should check the number parameter is required', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = '1234AB'

    return postcodeApi.getAddressesByPostcodeAndNumber({}, { postcode }, (error, body, rateLimit) => {
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

    return postcodeApi.getAddressesByPostcodeAndNumber({}, { postcode, number }, (error, body, rateLimit) => {
      expect(error).to.be.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
      expect(requestApiStub).to.be.not.called
    })
  })
  it('should be able to call the API with the apiKey, postcode and number parameters', () => {
    // Setting up the test data
    const requestApiStub = sandbox.stub(api, 'get').callsFake((options, callback) => {
      callback(null, null)
    })
    const postcode = '1234AB'
    const number = 12
    const requestApiOptions = {
      url: 'https://postcode-api.apiwise.nl/v2/addresses/?postcode=' + postcode + '&number=' + number,
      headers: {
        'X-Api-Key': 'test'
      },
      apiKey: 'test'
    }

    return postcodeApi.getAddressesByPostcodeAndNumber({ apiKey: 'test' }, { postcode, number },
      (error, body, rateLimit) => {
        expect(error).to.eql(null)
        expect(body).to.eql(null)
        expect(rateLimit).to.eql(undefined)
        expect(requestApiStub).to.be.calledWith(requestApiOptions)
      })
  })
})
