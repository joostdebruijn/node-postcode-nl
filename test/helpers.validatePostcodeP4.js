const assert = require('assert');
const postcodeApi = require('../index.js');

describe('helpers/validatePostcodeP4()', () => {
  it('should return true for a correctly formatted P4 postcode, like 1234', () => {
    assert.equal(true, postcodeApi.helpers.validatePostcodeP4('1234'));
  });
  it('should return false for a P6 postcode', () => {
    assert.equal(false, postcodeApi.helpers.validatePostcodeP4('1234AB'));
  });
  it('should return false for a P4 postcode starting with a 0', () => {
    assert.equal(false, postcodeApi.helpers.validatePostcodeP4('0123'));
  });
  it('should return false for no input', () => {
    assert.equal(false, postcodeApi.helpers.validatePostcodeP4(''));
  });
  it('should return false for non-postcodes',() => {
    assert.equal(false, postcodeApi.helpers.validatePostcodeP4('test'));
  });
});
