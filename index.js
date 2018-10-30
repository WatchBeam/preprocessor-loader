'use strict';

const qs = require('querystring');
const preprocessor = require('preprocess');

function parseQuery(query) {
  try {
    const options = typeof query === 'string' ? qs.parse(query.slice(1)) : query;

    if(!options._type){
      options._type = 'html';
    }

    return options;
  } catch (err) {
    throw new Error(
      'Preprocessor-loader is unable to parse the provided query string. ' +
      'Please see usage instructions here: https://git.io/vXmzf'
    );
  }
}

function loader (source) {
  const options = parseQuery(this.query);
  this.cacheable();
  return preprocessor.preprocess(source, options, { type: options._type });
}

module.exports = loader;
module.exports.preprocessor = preprocessor.preprocess;
