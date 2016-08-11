/**
 * To search for an address based on the BAG identifier of the object. Instance of GET /addresses.
 * @name getAddressById
 * @method
 * @static
 * @since 1.1.0
 * @param {Object} options - Options for performing the API call and influencing the callback.
 * @param {String} options.apiKey - The API-token to access the API.
 * @param {Boolean} [options.returnRateLimit] - If set to true, the callback will be invoked with an extra result containing an object with the limit and the remaining amount of API calls.
 * @param {String} id - The BAG identifier of the object.
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
 * let id = '0268200000075156';
 *
 * postcodeApi.getAddressById(options, id, (error, result, rateLimit) => {
 *   if (!error) {
 *     console.log(result); // Shows the output of the API directy in the console
 *     console.log(rateLimit); // Shows the rateLimit information in the console
 *   }
 * });
 */

const api = require('./doApiCall.js');

module.exports = (options, id, callback) => {

  // Check if postcode is correctly formatted for this API-call
  if (!id == null || typeof(id) !== 'string') {
    return callback(new Error('The BAG identifier is a required parameter and must be formatted as a string'), null);
  }

  // Preparing options for request
  options.url = 'https://postcode-api.apiwise.nl/v2/addresses/' + id;
  options.headers = {
    'X-Api-Key' : options.apiKey
  };

  // Executing API-request
  return api(options, callback);
};
