const postcodeApi = require('../index.js');
const checkP4 = postcodeApi.helpers.validatePostcodeP4;
const chai = require('chai');
const expect = chai.expect;

describe('helpers/validatePostcodeP4()', () => {
  it('should return true for a correctly formatted P4 postcode, like 1234', () => {
    expect(checkP4('1234')).to.eql(true);
  });
  it('should return false for a P6 postcode', () => {
    expect(checkP4('1234AB')).to.eql(false);
  });
  it('should return false for a P4 postcode starting with a 0', () => {
    expect(checkP4('0123')).to.eql(false);
  });
  it('should return false for no input', () => {
    expect(checkP4('')).to.eql(false);
  });
  it('should return false for non-postcodes',() => {
    expect(checkP4('test')).to.eql(false);
  });
});
