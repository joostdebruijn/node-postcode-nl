/**
 * Internal wrapper method for request.
 * @module requestApi
 * @private
 */

'use strict'
const helpers = require('./helpers.js')

/**
* To perform requests to the API, handle errors, based on given paramters and return the result to the end-user
* @name get
* @method
* @static
* @private
* @since 1.1.0
* @param {Object} options - It is basicly the options-object from higher instances, however it must contain some additional keys as described below
* @param {String} options.url - The URL that must be requested
* @param {Object} options.headers - Must at least contain the auth header, but can also contain other HTTP-headers that must be send
* @param {Function} callback - The callback as defined by the end-user
* @returns {Function} callback
*/
async function get (options, callback) {
  const url = new URL(options.url)

  if (options.qs) {
    for (const [key, value] of Object.entries(options.qs)) {
      url.searchParams.set(key, value)
    }
  }

  if (!options.headers) {
    options.headers = {}
  }

  options.headers.Accept = 'application/json'

  const res = await fetch(options.url, {
    headers: options.headers
  })

  if (res.ok) {
    // If requested, prepare rateLimit statistics from response
    let rateLimit
    if (options.returnRateLimit === true) {
      rateLimit = {
        limit: res.headers['x-ratelimit-limit'],
        remaining: res.headers['x-ratelimit-remaining']
      }
    }

    const body = await res.json()

    return callback(null, body, rateLimit)
  } else {
    return callback(new Error(`Something went wrong executing the request, statuscode: ${res.status}`), null)
  }
}

exports.get = get
