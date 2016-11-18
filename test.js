'use strict';

const expect = require('chai').expect;
const path = require('path');
const preprocessor = require('./').preprocessor;
const fs = require('fs');

console.log(preprocessor);

describe('preprocessor-loader', () => {
  const assertOutputs = (name, params) => {
    const input = fs.readFileSync(`${__dirname}/fixtures/${name}.html`).toString();
    const output = fs.readFileSync(`${__dirname}/fixtures/${name}.expected.html`).toString();
    expect(preprocessor(input, params)).to.equal(output);
  };

  const assertThrows = (name, params, expectation) => {
    const input = fs.readFileSync(`${__dirname}/fixtures/${name}.html`).toString();
    expect(() => preprocessor(input, params)).to.throw(expectation);
  };

  it('runs simple conditionals', () => {
    assertOutputs('simple', { PLATFORM: 'xbox' } );
  });

  it('runs block conditionals', () => {
    assertOutputs('block', { PLATFORM: 'xbox' } );
  });

  it('runs multiple targets', () => {
    assertOutputs('multiple-targets', {
        PLATFORM: 'xbox',
        locale: 'en'
      });
  });
});
