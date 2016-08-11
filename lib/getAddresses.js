/**
 * Returns a list of addresses, it is possible to filter on postcode (P6-formatted) and number. Instance of GET /addresses.
 * @name getAddresses
 * @method
 * @static
 * @since 1.2.0
 * @param {Object} options - Options for performing the API call and influencing the callback.
 * @param {String} options.apiKey - The API-token to access the API.
 * @param {Boolean} [options.returnRateLimit] - If set to true, the callback will be invoked with an extra result containing an object with the limit and the remaining amount of API calls.
 * @param {Object} query - Containing the query for calling the API. Must be an empty object if no filtering is needed.
 * @param {String} [query.postcode] - Must contain the keys postcode (P6-formatted).
 * @param {Number} [query.number] - The streetnumber of the address that must be queried. It is ignored when no postcode is given.
 * @param {Function} callback - A callback which is called when the API-request is finished.
 * @param {Error} callback.error - May contain an instance of Error, if no error occured null is responded.
 * @param {Object} callback.result - Contains the response as a json in exactly the same format as provided by the API. If no results are found, null is responded.
 * @param {Object} [callback.rateLimit] - If requested in options, an object with information about the API limits is returned. Otherwise, it will return undefined.
 * @example
 * const postcodeApi = require('postcode-nl');
 *
 * let options = {
 *   apiKey : 'abcdefghijklmnopQRSTUVWXYZ123',
 *   returnRateLimit : true
 * };
 * let query = {
 *   postcode: '1234AB'
 * };
 *
 * postcodeApi.getAddresses(options, query, (error, result, rateLimit) => {
 *   if (!error) {
 *     console.log(result); // Shows the output of the API directy in the console
 *     console.log(rateLimit); // Shows the rateLimit information in the console
 *   }
 * });
 */

const helpers = require('./helpers.js');
const api = require('./doApiCall.js');

function getAddresses (options, query, callback) {
  // Preparing options for request
  options.url = 'https://postcode-api.apiwise.nl/v2/addresses'
  options.headers = {
    'X-Api-Key' : options.apiKey
  };

  // Optional postcode and number quering, only if postcode is given
  if (query.postcode) {
    // Check if it is in the right format
    if (helpers.validatePostcodeP6(query.postcode)) {
      options.url = 'https://postcode-api.apiwise.nl/v2/addresses/?postcode=' + query.postcode;
      // Check if there is a number given in the right format
      if (query.number) {
        // Check if it is in the right format
        if (typeof(query.number) == 'number') {
          options.url = 'https://postcode-api.apiwise.nl/v2/addresses/?postcode=' + query.postcode + '&number=' + query.number;
        } else {
          // If the numberis not in the right format, throw an error
          return callback(new Error('The key number must be an integer'), null);
        }
      }
    } else {
      // If the postcode is not in P6-format, throw an error
      return callback(new Error('The key postcode must be in P6-formatted for this API-call'), null);
    }
  }

  // Executing API-request
  return api(options, callback);
}

module.exports = getAddresses;
