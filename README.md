# node-postcode-nl
Node module to obtain Dutch postcodes via [postcodeapi.nu](https://www.postcodeapi.nu). The module is able to perform requests to the v2 API, does some basic validation before the call is performed, handles errors from the API and returns the results as a json for further processing within your own application. To use this module, requesting an API-key at postcodeapi.nu is required.

## Using the module
Simply grap the module from npm by doing `npm install --save postcode-nl`. After that you can include it in your application with `require('postcode-nl')`.

## Methods
This module exposes various methods globally:

- [getSingleAddress](https://joostdebruijn.github.io/node-postcode-nl/docs/global.html#getSingleAddress) - To receive information about a postcode/number combination
- [getSinglePostcode](https://joostdebruijn.github.io/node-postcode-nl/docs/global.html#getSinglePostcode) - To receive information about a postcode
- [getAddressById](https://joostdebruijn.github.io/node-postcode-nl/docs/global.html#getAddressById) - To receive the details of an object based on it's BAG identifier
- [getPostcodeArea](https://joostdebruijn.github.io/node-postcode-nl/docs/global.html#getPostcodeArea) - Receive all information about a particular postcode area.
- [helpers](https://joostdebruijn.github.io/node-postcode-nl/docs/module-helpers.html) - Some additional helper functions to validate postcodes

The [documentation](https://joostdebruijn.github.io/node-postcode-nl) contains a full explaination of all the parameters and provide some examples. The documentation could be accessed by web or could be build from source by using jsdoc.

## Issues or feature requests
If you encounter any issue with this module, please fill in a bug report at this repository. Over there you can also report feature requests. If you encounter issues with the web-API itself, please head over to the [repository of Apiwise](https://github.com/apiwise/postcodeapi).

## Contributing
You are always welcome to contribute to this project by purposing a PR. Please document your code thoroughly: document new methods using the jsdoc notation and use inline comments to clarify what you are doing. Please check your code with eslinter and the ruleset defined in this repository before you submit it, to ensure you are using a consistent coding style.
