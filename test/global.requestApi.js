/* eslint-disable no-undef */
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import * as chai from 'chai'
import requestApi from '../lib/requestApi.js'
const expect = chai.expect

function fakeResponse (response = {}) {
  let headers = {
    'Content-type': 'application/json'
  }
  if (response.headers) {
    headers = Object.assign(response.headers, headers)
  }

  let status = 200
  if (response.status) {
    status = response.status
  }

  const mockResponse = new global.Response(JSON.stringify({}), {
    status, headers
  })

  return Promise.resolve(mockResponse)
}

chai.use(sinonChai)

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
    const requestStub = sandbox.stub(global, 'fetch')
    requestStub.onCall(0).returns(fakeResponse())

    return requestApi.get(options, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql({})
      expect(rateLimit).to.eql(undefined)
    })
  })
  it('should return the rateLimits if requested', () => {
    // Setting up the test data
    const options = {
      url: 'https://testapi.net',
      returnRateLimit: true
    }
    const response = {
      status: 200,
      headers: {
        'x-ratelimit-limit': 500,
        'x-ratelimit-remaining': 400
      }
    }
    const rateLimitReturn = {
      limit: response.headers['x-ratelimit-limit'],
      remaining: response.headers['x-ratelimit-remaining']
    }

    const requestStub = sandbox.stub(global, 'fetch')
    requestStub.onCall(0).returns(fakeResponse(response))

    return requestApi.get(options, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(rateLimit).to.eql(rateLimitReturn)
    })
  })
  it('should return a error when the statusCode is not ok', () => {
    const options = {
      url: 'https://testapi.net'
    }
    const response = {
      status: 403
    }

    const requestStub = sandbox.stub(global, 'fetch')
    requestStub.onCall(0).returns(fakeResponse(response))

    return requestApi.get(options, (error, body, rateLimit) => {
      expect(error).to.instanceof(Error)
      expect(body).to.eql(null)
      expect(rateLimit).to.eql(undefined)
    })
  })
  it('should process query string parameters', () => {
    const options = {
      url: 'https://testapi.net',
      qs: {
        a: 'test'
      }
    }

    const requestStub = sandbox.stub(global, 'fetch')
    requestStub.onCall(0).returns(fakeResponse())

    return requestApi.get(options, (error, body, rateLimit) => {
      expect(error).to.eql(null)
      expect(body).to.eql({})
      expect(rateLimit).to.eql(undefined)
    })
  })
})
