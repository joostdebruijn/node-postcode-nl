/* eslint-disable no-undef */
'use strict'
const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const requestApi = require('../lib/requestApi.js')
const expect = chai.expect

function fakeResponse (status = 200) {
  const mockResponse = new window.Response(JSON.stringify({}), {
    status,
    headers: {
      'Content-type': 'application/json'
    }
  })

  return Promise.resolve(mockResponse)
}

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

describe('global/requestApi()', () => {
  it('should requests data from the API based on the given options', () => {
    // Setting up the test data
    const options = {
      url: 'https://testapi.net',
      headers: {
        'X-Api-Key': 'abcdefghijklmnopQRSTUVWXYZ123'
      }
    }
    const requestOptions = {
      url: options.url,
      headers: options.headers,
      json: true,
      qs: {}
    }
    const requestStub = sandbox.stub(window, 'fetch')
    requestStub.onCall(0).returns(fakeResponse())

    return requestApi.get(options, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql('test')
      expect(rateLimit).to.eql(undefined)
      expect(requestStub).to.be.calledWith(requestOptions)
    })
  })
  it('should return the rateLimits if requested', () => {
    // Setting up the test data
    const options = {
      returnRateLimit: true
    }
    const response = {
      statusCode: 200,
      headers: {
        'x-ratelimit-limit': 500,
        'x-ratelimit-remaining': 400
      }
    }
    const rateLimitReturn = {
      limit: response.headers['x-ratelimit-limit'],
      remaining: response.headers['x-ratelimit-remaining']
    }

    const requestStub = sandbox.stub(window, 'fetch')
    requestStub.onCall(0).returns(fakeResponse())

    return requestApi.get(options, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(rateLimit).to.eql(rateLimitReturn)
    })
  })
  it('should return a error when the statusCode is not ok', () => {
    const requestStub = sandbox.stub(window, 'fetch')
    requestStub.onCall(0).returns(fakeResponse(403))

    return requestApi.get({}, (error, body, rateLimit) => {
      expect(error).to.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
    })
  })
})
