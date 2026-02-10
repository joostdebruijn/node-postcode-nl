/* eslint-disable no-undef */
import postcodeApi from '../index.js'
import { expect } from 'chai'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

// Loading assets
const source = require('./assets/mergeResults/source.json')
const destination = require('./assets/mergeResults/destination.json')
const expectedResult = require('./assets/mergeResults/expected.json')
const noArray = {
  _embedded: {
    addresses: {
      isNotAnArray: true
    }
  }
}

describe('helpers/mergeResults()', () => {
  it('should merge the source and destination properly', () => {
    return postcodeApi.helpers.mergeResults(source, destination, (error, mergedResult) => {
      expect(error).to.eql(null)
      expect(mergedResult).to.eql(expectedResult)
    })
  })
  it('should merge the source and destination properly when it is called to times synchroniously', () => {
    return postcodeApi.helpers.mergeResults(source, destination, (error, mergedResult) => {
      expect(error).to.eql(null)
      expect(mergedResult).to.eql(expectedResult)
    })
  })
  it('should check if the source has a _embedded-object', () => {
    return postcodeApi.helpers.mergeResults({}, destination, (error, mergedResult) => {
      expect(error).to.be.instanceof(Error)
      expect(mergedResult).to.eql(null)
    })
  })
  it('should check if the destination has a _embedded-object', () => {
    return postcodeApi.helpers.mergeResults(source, {}, (error, mergedResult) => {
      expect(error).to.be.instanceof(Error)
      expect(mergedResult).to.eql(null)
    })
  })
  it('should check if the mergeKey exists in the source', () => {
    const differentMergeKey = {
      _embedded: {
        postcodes: [
          'test1', 'test2'
        ]
      }
    }
    return postcodeApi.helpers.mergeResults(differentMergeKey, destination, (error, mergedResult) => {
      expect(error).to.be.instanceof(Error)
      expect(mergedResult).to.eql(null)
    })
  })
  it('should check if the mergeKey contains an array in the source', () => {
    return postcodeApi.helpers.mergeResults(noArray, destination, (error, mergedResult) => {
      expect(error).to.be.instanceof(Error)
      expect(mergedResult).to.eql(null)
    })
  })
  it('should check if the mergeKey contains an array in the destination', () => {
    return postcodeApi.helpers.mergeResults(source, noArray, (error, mergedResult) => {
      expect(error).to.be.instanceof(Error)
      expect(mergedResult).to.eql(null)
    })
  })
})
