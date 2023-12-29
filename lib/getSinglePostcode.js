/**
 * Returns the details of one P6 postcode. Instance of GET /postcodes.
 * @name getSinglePostcode
 * @method
 * @static
 * @since 1.0.0
 * @param {Object} options - Options for performing the API call and influencing the callback.
 * @param {String} options.apiKey - The API-token to access the API.
 * @param {Boolean} [options.returnRateLimit] - If set to true, the callback will be invoked with an extra result containing an object with the limit and the remaining amount of API calls.
 * @param {String} postcode - The postcode to query, formatted in P6.
 * @param {Function} callback - A callback which is called when the API-request is finished.
 * @param {Error} callback.error - May contain an instance of Error, if no error occured null is responded.
 * @param {Object} callback.result - Contains the response as a json in exactly the same format as provided by the API. If no results are found, null is responded.
 * @param {Object} [callback.rateLimit] - If requested in options, an object with information about the API limits is returned. Otherwise, it will return undefined.
 * @example
 * const postcodeApi = require('postcode-nl');
 *
 * let options = {
 *    apiKey : 'abcdefghijklmnopQRSTUVWXYZ123'
 * };
 * let postcode = '1234AB';
 *
 * postcodeApi.getSinglePostcode(options, postcode, (error, result) => {
 *  if (!error) {
 *   console.log(result); // Shows the json-output of the API directy in the console
 *  }
 * });
 */

'use strict'
const helpers = require('./helpers.js')
const api = require('./requestApi.js')

function getSinglePostcode (options, postcode, callback) {
  // Check if postcode is correctly formatted for this API-call
  if (!postcode || typeof (postcode) !== 'string' || !helpers.validatePostcodeP6(postcode)) {
    return callback(new Error('The postcode is required and must be in P6-formatted for this API-call'), null)
  }

  options.url = 'https://postcode-api.apiwise.nl/v2/postcodes/' + postcode
  options.headers = {
    'X-Api-Key': options.apiKey
  }

  // Executing API-request
  return api.get(options, callback)
}

module.exports = getSinglePostcode
