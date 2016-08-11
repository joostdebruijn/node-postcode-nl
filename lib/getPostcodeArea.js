/**
 * Query for the summarized information of a whole postcode area
 * @name getPostcodeArea
 * @method
 * @static
 * @since 1.1.0
 * @param {Object} options - Options for performing the API call and influencing the callback.
 * @param {String} options.apiKey - The API-token to access the API.
 * @param {Boolean} [options.returnRateLimit] - If set to true, the callback will be invoked with an extra result containing an object with the limit and the remaining amount of API calls.
 * @param {String} postcodeArea - The postcode area to be queried, formatted as P4.
 * @param {Function} callback - A callback which is called when the API-request is finished.
 * @param {Error} callback.error - May contain an instance of Error, if no error occured null is responded.
 * @param {Object} callback.result - Contains the response as a json in exactly the same format as provided by the API. If no results are found, null is responded.
 * @param {Object} [callback.rateLimit] - If requested in options, an object with information about the API limits is returned. Otherwise, it will return undefined.
 * @todo Support for pagination
 * @example
 * const postcodeApi = require('postcode-nl');
 *
 * let options = {
 *   apiKey : 'abcdefghijklmnopQRSTUVWXYZ123',
 *   returnRateLimit : true
 * };
 * let postcodeArea = '1234';
 *
 * postcodeApi.getPostcodeArea(options, id, (error, result, rateLimit) => {
 *   if (!error) {
 *     console.log(result); // Shows the output of the API directy in the console
 *     console.log(rateLimit); // Shows the rateLimit information in the console
 *   }
 * });
 */

const helpers = require('./helpers.js');
const api = require('./doApiCall.js');

module.exports = (options, postcodeArea, callback) => {

  // Check if postcode is correctly formatted for this API-call
  if (!postcodeArea == null || typeof(postcodeArea) !== 'string' || !helpers.validatePostcodeP4(postcodeArea)) {
    return callback(new Error('A postcode formatted in P4 is a required for this API'), null);
  }

  // Preparing options for request
  options.url = 'https://postcode-api.apiwise.nl/v2/postcodes/?postcodeArea=' + postcodeArea;
  options.headers = {
    'X-Api-Key' : options.apiKey
  };

  // Executing API-request
  return api(options, callback);
};
