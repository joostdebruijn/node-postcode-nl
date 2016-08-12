const postcodeApi = require('../index.js');
const chai = require('chai');
const expect = chai.expect;

// Simulating responses
const response = {
  statusCode : 403
};
const body = {
  error : 'Access denied to API'
};

describe('helpers/handleOtherResponses()', () => {
  it('should throw an instance of error with the message from the body (if provided) and a null response', () => {
    postcodeApi.helpers.handleOtherResponses(response, body, (error, response) => {
      expect(error).to.be.instanceof(Error);
      expect(error.toString()).to.eql('Error: Access denied to API');
      expect(response).to.eql(null);
    });
  });
  it('should throw an unknown error if there is no message in the body and a null response', () => {
    postcodeApi.helpers.handleOtherResponses(response, {}, (error, response) => {
      expect(error).to.be.instanceof(Error);
      expect(error.toString()).to.eql('Error: An unknown error has occuring while calling the external API. ' +
      'HTTP status code: 403');
      expect(response).to.eql(null);
    });
  });
});
