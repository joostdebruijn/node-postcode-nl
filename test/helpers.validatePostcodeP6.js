const assert = require('assert');
const postcodeApi = require('../index.js');

describe('helpers/validatePostcodeP6()', () => {
  it('should return true for a correctly formatted P6 postcode, like 1234AB', () => {
    assert.equal(true, postcodeApi.helpers.validatePostcodeP6('1234AB'));
  });
  it('should return false for a postcode with a space between the digits and letters', () => {
    assert.equal(false, postcodeApi.helpers.validatePostcodeP6('1234 AB'));
  });
  it('should return false for a P4 postcode', () => {
    assert.equal(false, postcodeApi.helpers.validatePostcodeP6('1234'));
  });
  it('should return false for a P6 postcode starting with a 0', () => {
    assert.equal(false, postcodeApi.helpers.validatePostcodeP6('0123AB'));
  });
  it('should return false for P6 formatted postcodes with SA, SD and SS', () => {
    assert.equal(false, postcodeApi.helpers.validatePostcodeP6('1234SA'));
    assert.equal(false, postcodeApi.helpers.validatePostcodeP6('1234SD'));
    assert.equal(false, postcodeApi.helpers.validatePostcodeP6('1234SS'));
  });
  it('should return false for no input', () => {
    assert.equal(false, postcodeApi.helpers.validatePostcodeP6(''));
  });
  it('should return false for non-postcodes', () => {
    assert.equal(false, postcodeApi.helpers.validatePostcodeP6('test'));
  });
});
