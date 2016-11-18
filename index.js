'use strict';

const qs = require('querystring');
const preprocessor = require('preprocess')

function loader (source) {
  let options;
  try {
    options = qs.parse(this.query.slice(1));

    if(!options._type){
      options._type = 'html';
    }

  } catch (err) {
    throw new Error(
      'Preprocessor-loader is unable to parse the provided query string. ' +
      'Please see usage instructions here: https://git.io/vXmzf'
    );
  }

  this.cacheable();
  return preprocessor.preprocess(source, options, { type: options._type });
}

module.exports = loader;
