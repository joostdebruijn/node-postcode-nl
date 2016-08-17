'use strict';

// Exporting the different modules from the library
module.exports = {
  getSingleAddress: require('./lib/getSingleAddress.js'),
  getSinglePostcode: require('./lib/getSinglePostcode.js'),
  getAddresses: require('./lib/getAddresses.js'),
  getAddressesByPostcodeAndNumber: require('./lib/getAddressesByPostcodeAndNumber.js'),
  getPostcodes: require('./lib/getPostcodes.js'),
  helpers: require('./lib/helpers.js'),
  promises: require('./lib/promises.js')
};
