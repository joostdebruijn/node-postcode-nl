/**
 * Returns a list of postcodes (P6), optionally filtered on postcode area. Instance of GET /postcodes.
 * @name getPostcodes
 * @method
 * @static
 * @since 1.2.0
 * @param {Object} options - Options for performing the API call and influencing the callback.
 * @param {String} options.apiKey - The API-token to access the API.
 * @param {Boolean} [options.returnRateLimit] - If set to true, the callback will be invoked with an extra result containing an object with the limit and the remaining amount of API calls.
 * @param {Boolean} [options.followNext] - If set to true, the pagination links will be followed an a single response will be returned.
 * @param {Object} [query] - Containing the query for calling the API. Must be an empty object if no filtering is needed.
 * @param {String} [query.postcodeArea] - The postcode area to be queried, formatted as P4.
 * @param {Number} [query.latitude] - The latitude from which the distance to the addresses is calculated. It is ignored when no longitude is given.
 * @param {Number} [query.longitude] - The longitude from which the distance to the addresses is calculated. It is ignored when no latitude is given.
 * @param {String} [query.sort] - At this moment the only possible value is 'distance' and it is required when using the distance functionalities. The results will be sorted on distance, when `latitude` and `longitude` are given.
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
 * let postcodeArea = '1234';
 *
 * postcodeApi.getPostcodeArea(options, id, (error, result, rateLimit) => {
 *   if (!error) {
 *     console.log(result); // Shows the output of the API directy in the console
 *     console.log(rateLimit); // Shows the rateLimit information in the console
 *   }
 * });
 */

'use strict';
const helpers = require('./helpers.js');
const api = require('./requestApi.js');

function getPostcodes(options, query, callback) {
  // As query is optional and there are only two arguments, the second argument must be the callback
  if (arguments.length === 2) {
    callback = arguments[1];
    query = {};
  }

  // Preparing options for request
  options.url = 'https://postcode-api.apiwise.nl/v2/postcodes';
  options.qs = {};
  options.headers = {
    'X-Api-Key' : options.apiKey
  };

  // Check if postcodeArea has a value
  if (query.postcodeArea) {
    // Check if postcode is correctly formatted for this API-call
    if (typeof(query.postcodeArea) == 'string' && helpers.validatePostcodeP4(query.postcodeArea)) {
      options.qs.postcodeArea = query.postcodeArea;
    } else {
      // Throw an error if the postcodeArea is not in the right format
      return callback(new Error('A postcode formatted in P4 is a required for this API'), null);
    }
  }

  // Optional distance features
  if (typeof(query.latitude) === 'number' && typeof(query.longitude) === 'number' &&  query.sort === 'distance') {
    // If everything is allright, fill the query parameters
    options.qs.coords = {};
    options.qs.coords.latitude = query.latitude;
    options.qs.coords.longitude = query.longitude;
    options.qs.sort = 'distance';
  } else if (query.sort && query.sort !== 'distance') {
    // When the query parameter is filled, but not with a valid value, throw an error.
    return callback(new Error('Query parameter \'sort\' did not have a valid value'), null);
  } else if (query.latitude || query.longitude) {
    // When one of the two is filled, or filled with an incorrect value, throw an error.
    return callback(new Error('Both latitude and longitude must be provided as a number, also sort is required'), null);
  }

  // Executing API-request
  if (options.followNext) {
    return helpers.followNext(options, callback);
  } else {
    return api.get(options, callback);
  }
}

module.exports = getPostcodes;
