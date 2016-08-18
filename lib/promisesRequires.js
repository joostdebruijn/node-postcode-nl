'use strict';

// This file is a bit of a hack to expose the internal api's seperately to make writing unit tests easier
module.exports = {
  getSingleAddress: require('./getSingleAddress.js'),
  getSinglePostcode: require('./getSinglePostcode.js'),
  getAddresses: require('./getAddresses.js'),
  getAddressesByPostcodeAndNumber: require('./getAddressesByPostcodeAndNumber.js'),
  getPostcodes: require('./getPostcodes.js')
};
