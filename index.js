// Exporting the different modules from the library
module.exports = {
  getSingleAddress: require('./lib/getSingleAddress.js'),
  getSinglePostcode: require('./lib/getSinglePostcode.js'),
  getAddressById: require('./lib/getAddressById.js'),
  getPostcodeArea: require('./lib/getPostcodeArea.js'),
  helpers: require('./lib/helpers.js')
};
