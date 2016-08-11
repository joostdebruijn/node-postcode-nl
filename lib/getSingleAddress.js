/**
 * To search for an address based on a postcode and number. Instance of GET /address.
 * @name getSingleAddress
 * @method
 * @static
 * @since 1.0.0
 * @param {Object} options - Options for performing the API call and influencing the callback
 * @param {String} options.apiKey - The API-token to access the API
 * @param {Boolean} [options.returnRateLimit] - If set to true, the callback will be invoked with an extra result containing an object with the limit and the remaining amount of API calls
 * @param {Object} query - Containing the query for calling the API
 * @param {String} query.postcode - Must contain the keys postcode (P6-formatted)
 * @param {Number} query.number - The streetnumber of the address that must be queried
 * @param {Function} callback - A callback which is called when the API-request is finished.
 * @param {Error} callback.error - May contain an instance of Error, if no error occured null is responded.
 * @param {Object} callback.result - Contains the response as a json. If no results are found, null is responded.
 * @param {Object} [callback.rateLimit] - If requested in options, an object with information about the API limits is returned. Otherwise, it will return undefined.
 * @example
 * const postcodeApi = require('postcode-nl');
 *
 * let options = {
 *   apiKey : 'abcdefghijklmnopQRSTUVWXYZ123',
 *   returnRateLimit : true
 * }
 * let query = {
 *   postcode: '1234AB',
 *   number: 10
 * }
 *
 * console.log(postcodeApi.getSingleAddress);
 *
 * postcodeApi.getSingleAddress(options, query, (error, result, rateLimit) => {
 *   if (!error) {
 *     console.log(result); // Shows the output of the API directy in the console
 *     console.log(rateLimit); // Shows the rateLimit information in the console
 *   }
 * });
 */

const helpers = require('./helpers.js');
const api = require('./doApiCall.js');

module.exports = (options, query, callback) => {

  // Check if postcode is correctly formatted for this API-call
  if (!query.postcode == null || !helpers.validatePostcodeP6(query.postcode)) {
    return callback(new Error('The key postcode must be in P6-formatted for this API-call'), null);
  }

  // Validate if number is in the query and if it is really a number (as required by external API)
  if (!query.number == null || typeof(query.number) !== 'number') {
    return callback(new Error('The key number is required in the query and must be an integer'), null);
  }

  // Preparing options for request
  options.url = 'https://postcode-api.apiwise.nl/v2/addresses';
  options.headers = {
    'X-Api-Key' : options.apiKey,
    'postcode' : query.postcode,
    'number' : query.number
  };

  // Executing API-request
  return api(options, callback);
};
