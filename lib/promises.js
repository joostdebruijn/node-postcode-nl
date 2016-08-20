/**
 * All the global methods are exposed as a promise. This allows to chain different API-calls asynchroniously. The example below shows how you can easily get details from another API-call, while error handling is very easy and nested callbacks are prevented. The methods follow exactly the same parameters as the global exposed callback-methods, however they do not have a callback parameter (of course). When a promise is fullfiled, the promise resolved one single object with the result and the rateLimit (if requested).
 *
 * The most easy way to enable the methods as promise is to add `const postcodeApi = require('postcode-nl').promises;` in your code. All the functions will be exposed as promise.
 * @module promises
 * @since 1.3.0
 * @example
 * const postcodeApi = require('postcode-nl').promises;
 *
 * options = {
 *   returnRateLimit: true,
 *   apiKey: "EcLHlMMn8M3fFbxjBIkNX6jZ1NOVlILXRQltUAg1"
 * }
 *
 * postcodeApi.getSingleAddress(options, '0362200001001845')
 *   .then((resolved) => {
 *     console.log(resolved); // Result for getSingleAddress()
 *     let postcode = resolved.result.postcode;
 *     return postcodeApi.getSinglePostcode(options, postcode);
 *   }).then((resolved) => {
 *     console.log(resolved); // Result for getSinglePostcode()
 *   }).catch((error) => {
 *     console.log(error); // Handle errors for both calls
 * });
 */

'use strict';
const internalApi = require('./promisesRequires.js');

/**
 * @method
 * @static
 * @since 1.3.0
 * @param {Object} options - See [global method](global.html#getAddresses)
 * @param {Object} query - See [global method](global.html#getAddresses)
 * @returns {Promise} - When fullfiled, it returns a single object containing the objects result and rateLimit as the global method returns in the callback.
 */
 function getAddresses(options, query) {
  if (arguments.length === 1) {
    query = {};
  }

  return new Promise((resolve, reject) => {
    internalApi.getAddresses(options, query, (error, result, rateLimit) => {
      if(error instanceof Error) {
        // Reject when there was an error
        return reject(error);
      } else {
        // Preparing the value to return
        let resolved = {
          result
        };
        if (options.returnRateLimit) {
          resolved.rateLimit = rateLimit;
        }
        // Resolve the promise
        return resolve(resolved);
      }
    });
  });
}
module.exports.getAddresses = getAddresses;

/**
 * @method
 * @static
 * @since 1.3.0
 * @param {Object} options - See [global method](global.html#getAddressesByPostcodeAndNumber)
 * @param {Object} query - See [global method](global.html#getAddressesByPostcodeAndNumber)
 * @returns {Promise} - When fullfiled, it returns a single object containing the objects result and rateLimit as the global method returns in the callback.
 */
function getAddressesByPostcodeAndNumber(options, query) {
  return new Promise((resolve, reject) => {
    internalApi.getAddressesByPostcodeAndNumber(options, query, (error, result, rateLimit) => {
      if(error instanceof Error) {
        // Reject when there was an error
        return reject(error);
      } else {
        // Preparing the value to return
        let resolved = {
          result
        };
        if (options.returnRateLimit) {
          resolved.rateLimit = rateLimit;
        }
        // Resolve the promise
        return resolve(resolved);
      }
    });
  });
}
module.exports.getAddressesByPostcodeAndNumber = getAddressesByPostcodeAndNumber;

/**
 * @method
 * @static
 * @since 1.3.0
 * @param {Object} options - See [global method](global.html#getSingleAddress)
 * @param {Object} id - See [global method](global.html#getSingleAddress)
 * @returns {Promise} - When fullfiled, it returns a single object containing the objects result and rateLimit as the global method returns in the callback.
 */
function getSingleAddress(options, id) {
  return new Promise((resolve, reject) => {
    internalApi.getSingleAddress(options, id, (error, result, rateLimit) => {
      if(error instanceof Error) {
        // Reject when there was an error
        return reject(error);
      } else {
        // Preparing the value to return
        let resolved = {
          result
        };
        if (options.returnRateLimit) {
          resolved.rateLimit = rateLimit;
        }
        // Resolve the promise
        return resolve(resolved);
      }
    });
  });
}
module.exports.getSingleAddress = getSingleAddress;

/**
 * @method
 * @static
 * @since 1.3.0
 * @param {Object} options - See [global method](global.html#getPostcodes)
 * @param {Object} postcodeArea - See [global method](global.html#getPostcodes)
 * @returns {Promise} - When fullfiled, it returns a single object containing the objects result and rateLimit as the global method returns in the callback.
 */
function getPostcodes(options, postcodeArea) {
  if (arguments.length === 1) {
    postcodeArea = null;
  }

  return new Promise((resolve, reject) => {
    internalApi.getPostcodes(options, postcodeArea, (error, result, rateLimit) => {
      if(error instanceof Error) {
        // Reject when there was an error
        return reject(error);
      } else {
        // Preparing the value to return
        let resolved = {
          result
        };
        if (options.returnRateLimit) {
          resolved.rateLimit = rateLimit;
        }
        // Resolve the promise
        return resolve(resolved);
      }
    });
  });
}
module.exports.getPostcodes = getPostcodes;

/**
 * @method
 * @static
 * @since 1.3.0
 * @param {Object} options - See [global method](global.html#getSinglePostcode)
 * @param {Object} postcode - See [global method](global.html#getSinglePostcode)
 * @returns {Promise} - When fullfiled, it returns a single object containing the objects result and rateLimit as the global method returns in the callback.
 */
function getSinglePostcode(options, postcode) {
  return new Promise((resolve, reject) => {
    internalApi.getSinglePostcode(options, postcode, (error, result, rateLimit) => {
      if(error instanceof Error) {
        // Reject when there was an error
        return reject(error);
      } else {
        // Preparing the value to return
        let resolved = {
          result
        };
        if (options.returnRateLimit) {
          resolved.rateLimit = rateLimit;
        }
        // Resolve the promise
        return resolve(resolved);
      }
    });
  });
}
module.exports.getSinglePostcode = getSinglePostcode;
