/**
 * The helpers from this module are globally exported under the namespace helpers for use in your own application
 * @module helpers
 */

'use strict';

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
  return /[1-9][0-9]{3}([A-RT-Z][A-Z]|[S][BCE-RT-Z])$/g.test(postcode);
};

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
  return /[1-9][0-9]{3}$/g.test(postcode);
};

/**
  * Helper to handle responses from the API that are not specifically defined
  * @name handleOtherResponses
  * @method
  * @static
  * @private
  * @param {Object} response - The response object from the request-module
  * @param {Object} body - The body object from the request-module
  * @param {Function} callback - The callback as defined by the end-user
  * @returns {Function} - callback
  * @since 1.0.0
  */
exports.handleOtherResponses = (response, body, callback) => {
  // The API will respond with an error-key in the body in some cases, so we pass it to the end user
  if (body && body.error) {
    return callback(new Error(body.error), null);
  } else {
    // If there is no error in the body, the error is unknown, so we inform the end user about that
    return callback(new Error('An unknown error has occuring while calling the external API. HTTP status code: ' +
    response.statusCode), null);
  }
};
