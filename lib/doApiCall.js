/**
 * Internal method to perform requests to the API, handle errors, based on given paramters and return the result to the end-user
 * @name doApiCall
 * @method
 * @static
 * @private
 * @since 1.1.0
 * @param {Object} options - It is basicly the options-object from higher instances, however it must contain some additional keys as described below
 * @param {String} options.url - The URL that must be requested
 * @param {Object} options.headers - Must at least contain the auth header, but can also contain other HTTP-headers that must be send
 * @param {Function} callback - The callback as defined by the end-user
 */

const request = require('request');
const helpers = require('./helpers.js');

module.exports = (options, callback) => {

  // Preparing options for request
  let requestOptions = {
    url : options.url,
    headers : options.headers,
    json: true
  };

  // Preparing callback to end-user
  function requestCallback (error, response, body) {
    if (!error) {
      // If requested, prepare rateLimit statistics from response
      var rateLimit;
      if (options.returnRateLimit === true) {
        rateLimit = {
          limit: response.headers['x-ratelimit-limit'],
          remaining: response.headers['x-ratelimit-remaining']
        }
      }

      switch (response.statusCode) {
        // Response received without errors
        case 200:
          return callback(null, body, rateLimit);
        // No response received
        case 404:
          return callback(null, null);
        // In other cases, there is some kind of an error or unexpected return
        default:
          helpers.handleOtherResponses(response, body, callback);
      }
    } else {
      // There was an error with the request-module
      return callback(new Error(error), null);
    }
  }

  // Executing API-request
  request(requestOptions, requestCallback);
};
