/**
 * The helpers from this module are globally exported under the namespace helpers for use in your own application
 * @module helpers
 */

'use strict'
const api = require('./requestApi.js')

/**
  * Returns if a postcode is P6-formatted where spaces are not allowed (e.g. 1234AB)
  * @name validatePostcodeP6
  * @method
  * @static
  * @param {String} postcode - The postcode that must be checked
  * @returns {Boolean} - True when the postcode is valid
  * @since 1.0.0
  * @example
  * const postcodeApi = require('postcode-nl');
  * console.log(postcodeApi.helpers.validatePostcodeP6('1234')); // Shows 'false' in the console
  * console.log(postcodeApi.helpers.validatePostcodeP6('1234AB')); // Shows 'true' in the console
  */
exports.validatePostcodeP6 = (postcode) => {
  // Validate P6-formatted postcode:
  // 4 digits where first one is not 0, followed by two letters without space where SA, SD en SS are not allowed
  return /[1-9][0-9]{3}([A-RT-Z][A-Z]|[S][BCE-RT-Z])$/g.test(postcode)
}

/**
  * Returns if a postcode is P4-formatted (e.g. 1234)
  * @name validatePostcodeP4
  * @method
  * @static
  * @param {String} postcode - The postcode that must be checked
  * @returns {Boolean} - True when the postcode is valid
  * @since 1.0.0
  * @example
  * const postcodeApi = require('postcode-nl');
  * console.log(postcodeApi.helpers.validatePostcodeP4('1234')); // Shows 'true' in the console
  * console.log(postcodeApi.helpers.validatePostcodeP4('1234AB')); // Shows 'false' in the console
  */
exports.validatePostcodeP4 = (postcode) => {
  // Validate P4-formatted postcode:
  // 4 digits where first one is not 0
  return /[1-9][0-9]{3}$/g.test(postcode)
}

/**
 * Helper that is able to merge two results in the _embedded-object from the API together in one single response. It is used within followNext(), however it may be useful in other circumstanses.
 * @method
 * @static
 * @param {Object} source -The response that must be merged with the destination. It is assumed that this object contains a _embedded-object within it (like in the remote API response).
 * @param {Object} destination - The response that must incude the source object.
 * @param {Function} callback - A callback that is returned when the merge is finished
 * @param {Object} callback.error - Returns an instance of a Error when something went wrong
 * @param {Object} callback.mergedResult - The destination with the source merged in the _embedded-object.
 * @returns {Function} - callback
 * @since 1.3.0
 */
exports.mergeResults = (source, destination, callback) => {
  // Check for the _embedded object within the objects to be merged
  if (!source._embedded || !destination._embedded) {
    return callback(new Error('The source and/or the destination did not have a _embedded object'), null)
  }

  // Determing the key to be merged: this should be the only key within _embedded
  const mergeKey = Object.keys(destination._embedded)[0]

  // Check if the mergeKey exists in the source.
  if (!source._embedded[mergeKey]) {
    return callback(new Error('The key to be merged is not available in the source object. It could not be merged'),
      null)
  }

  // Check if the mergeKey is an array
  if (!Array.isArray(source._embedded[mergeKey]) || !Array.isArray(destination._embedded[mergeKey])) {
    return callback(new Error('The _embedded-object did not contain an array for the mergeKey. It could not be merged'),
      null)
  }

  // Merge _embedded from source and from the destination array
  const mergedArray = destination._embedded[mergeKey].concat(source._embedded[mergeKey])
  // Make a copy to avoid collisions while running this function repeatedly
  const mergedDestination = JSON.parse(JSON.stringify(destination))
  // Save the mergedArray into the copied object and return it
  mergedDestination._embedded[mergeKey] = mergedArray
  return callback(null, mergedDestination)
}

/**
  * Helper that can follow _links.next.href and returns a single response. The final returned result contains the _self URL of the first call and (if requested) the rateLimit of the last call. Basicly it is a wrapper for the requestApi.get-method.
  * @name followNext
  * @method
  * @static
  * @param {Object} options - It is basicly the options-object from higher instances, however it must contain some additional keys as described below
  * @param {String} options.url - The URL that must be requested of the first or *next* (when repeating) item in the collection
  * @param {Object} options.headers - Must at least contain the auth header, but can also contain other HTTP-headers that must be send
  * @param {Object} [previous] - May contain the previous fetched result from the API to extend
  * @param {Function} callback - The callback as defined by the end-user
  * @returns {Function} - callback
  * @since 1.3.0
  */
function followNext (options, previous, callback) {
  // As previous is optional and there are only two arguments, the second argument must be the callback
  if (arguments.length === 2) {
    callback = arguments[1]
    previous = undefined
  }

  // Execute API-call
  api.get(options, (error, result, rateLimit) => {
    if (result) {
      if (previous !== undefined && result._links.next) {
        // There is a previous response, so we have to merge it with the current response
        this.mergeResults(result, previous, (error, mergedResult) => {
          if (error) {
            // Return the error that happened while merging the results
            return callback(error, null)
          } else {
            // Follow the next-href
            options.url = result._links.next.href
            return this.followNext(options, mergedResult, callback)
          }
        })
      } else if (!previous && result._links.next) {
        // If there is no previous result, we don't need to merge it and follow the next url
        options.url = result._links.next.href
        // Execute the next request
        return this.followNext(options, result, callback)
      } else if (previous && !result._links.next) {
        // If there is a previous result, bot there is no link to follow, we merge and return the result
        this.mergeResults(result, previous, (error, mergedResult) => {
          if (error) {
            // Return the error that happened while merging the results
            return callback(error, null)
          } else {
            // Return the result
            if (options.returnRateLimit) {
              return callback(null, mergedResult, rateLimit)
            } else {
              return callback(null, mergedResult)
            }
          }
        })
      } else {
        // There is no next link and no previous result, so we can just pass the result
        if (options.returnRateLimit) {
          return callback(null, result, rateLimit)
        } else {
          return callback(null, result)
        }
      }
    } else if (error) {
      // There was an error calling the API.
      return callback(error, null)
    } else {
      // There was completely no response.
      return callback(null, null)
    }
  })
}

exports.followNext = followNext
