'use strict';

const expect = require('chai').expect;
const path = require('path');
const string = require('./').string;
const fs = require('fs');

describe('split-html-loader', () => {
  const assertOutputs = (name, params) => {
    const input = fs.readFileSync(`${__dirname}/fixtures/${name}.html`).toString();
    const output = fs.readFileSync(`${__dirname}/fixtures/${name}.expected.html`).toString();
    expect(string(input, params)).to.equal(output);
  };

  const assertThrows = (name, params, expectation) => {
    const input = fs.readFileSync(`${__dirname}/fixtures/${name}.html`).toString();
    expect(() => string(input, params)).to.throw(expectation);
  };

  it('runs simple conditionals', () => {
    assertOutputs('simple', {
      targets: { platform: 'xbox' }
    });
  });

  it('runs block conditionals', () => {
    assertOutputs('block', {
      targets: { platform: 'xbox' }
    });
  });

  it('runs multiple targets', () => {
    assertOutputs('multiple-targets', {
      targets: {
        platform: 'xbox',
        locale: 'en'
      }
    });
  });

  it('errors if a block doesn\'t end', () => {
    assertThrows(
      'block-unended', {
        targets: { platform: 'xbox' }
      },
      'INPUT:1  Cannot find END of directive block (split-html-loader)'
    );
  });

  it('errors if a block has an unmatched start', () => {
    assertThrows(
      'block-unstarted', {
        targets: { platform: 'xbox' }
      },
      'INPUT:1  Found an END directive block without a start (split-html-loader)'
    );
  });

  it('errors if a conditional is missing a subsequent block', () => {
    assertThrows(
      'if-dangling', {
        targets: { platform: 'xbox' }
      },
      'INPUT:1  Dangling split block, expected another node after this line! (split-html-loader)'
    );
  });

  it('attaches filenames to errors', () => {
    try {
      string('<!-- a: b -->', {
        targets: { a: 'b' }
      });
    } catch (e) {
      e.setFilename(path.join(__dirname, 'foo/bar.html'));
      expect(e.message).to.equal('./foo/bar.html:1: Dangling split block, expected '
          + 'another node after this line! (split-html-loader)\n');
      return;
    }
    throw new Error('Expected to have thrown');
  });
});
