'use strict';
const postcodeApi = require('../index.js');
const checkP6 = postcodeApi.helpers.validatePostcodeP6;
const chai = require('chai');
const expect = chai.expect;

describe('helpers/validatePostcodeP6()', () => {
  it('should return true for a correctly formatted P6 postcode, like 1234AB', () => {
    expect(checkP6('1234AB')).to.eql(true);
  });
  it('should return false for a postcode with a space between the digits and letters', () => {
    expect(checkP6('1234 AB')).to.eql(false);
  });
  it('should return false for a P4 postcode', () => {
    expect(checkP6('1234')).to.eql(false);
  });
  it('should return false for a P6 postcode starting with a 0', () => {
    expect(checkP6('0123AB')).to.eql(false);
  });
  it('should return false for P6 formatted postcodes with SA, SD and SS', () => {
    expect(checkP6('1234SA')).to.eql(false);
    expect(checkP6('1234SD')).to.eql(false);
    expect(checkP6('1234SS')).to.eql(false);
  });
  it('should return false for no input', () => {
    expect(checkP6('')).to.eql(false);
  });
  it('should return false for non-postcodes', () => {
    expect(checkP6('test')).to.eql(false);
  });
});
