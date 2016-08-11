/**
 * To search for an address based on a postcode and number.
 * @name getSinglePostcode
 * @method
 * @static
 * @since 1.0.0
 * @param {Object} options - Options for performing the API call and influencing the callback
 * @param {String} options.apiKey - The API-token to access the API
 * @param {String} postcode - Must contain the keys postcode (P6-formatted) as a string
 * @param {Function} callback - A callback which is called when the API-request is finished.
 * @param {Error} callback.error - May contain an instance of Error, if no error occured null is responded.
 * @param {Object} callback.result - Contains the response as a json. If no results are found, null is responded.
 * @example
 * const postcodeApi = require('postcode-nl');
 *
 * let options = {
 *    apiKey : 'abcdefghijklmnopQRSTUVWXYZ123'
 *  }
 * let postcode = '1234AB'
 *
 * postcodeApi.getSinglePostcode(options, postcode, (error, result) => {
 *  if (!error) {
 *   console.log(result); // Shows the json-output of the API directy in the console
 *  }
 * });
 */

const request = require('request');
const helpers = require('./helpers.js');

// Function for: GET /postcodes/{postcode}/
module.exports = (options, postcode, callback) => {

  // Check if postcode is correctly formatted for this API-call
  if (typeof(postcode) !== 'string' || !helpers.validatePostcodeP6(postcode)) {
    return callback(new Error('The postcode is required and must be in P6-formatted for this API-call'), null);
  }

  // Preparing options for request
  let requestOptions = {
    url : 'https://postcode-api.apiwise.nl/v2/postcodes/' + postcode,
    headers : {
      'X-Api-Key' : options.apiKey
    },
    json: true
  };

  // Preparing callback to end-user
  function requestCallback (error, response, body) {
    if (!error) {
      switch (response.statusCode) {
        // Response received without errors
        case 200:
          return callback(null, body);
        // No response received
        case 404:
          return callback(null, null);
        // In other cases, there is some kind of an error or unexpected return
        default:
          return helpers.handleOtherResponses(response, body, callback);
      }
    } else {
      // There was an error with the request-module
      return callback(new Error(error), null);
    }
  }

  // Executing API-request
  return request(requestOptions, requestCallback);
};
