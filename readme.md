# preprocessor-loader

[![npm version](https://badge.fury.io/js/@mcph/preprocessor-loader.svg)](https://badge.fury.io/js/@mcph/webpackpreprocessor-loader)
[![Build Status](https://travis-ci.org/WatchBeam/@mcph/preprocessor-loader.svg?branch=master)](https://travis-ci.org/WatchBeam/preprocessor-loader)

[Link](https://github.com/jsoverson/preprocess/blob/master/README.md) to `preprocess` documentation

`preprocessor-loader` is a webpack loader that allows conditional compilation of HTML/TS/CSS via comment 'directives'. It's essentially a very minimalistic C/C++ preprocessor language and to interoperate fully with other templating engines and build tools.

For example, you can have split styling for a "desktop" and "xbox" build:

```html
<h1>Hello World</h1>

<!-- @if PLATFORM == 'desktop' -->
<p>You're on our desktop build!</p>
<!-- @endif -->
<!-- @if PLATFORM == 'mobile' -->
<p>You're on our mobile build!</p>
<!-- @endif -->
```

The result of building the above targeting the `mobile` platform would be:

```html
<h1>Hello World</h1>

<p>This is only on mobile</p>
```

### Usage

Your `webpack.config.js` might look something like this:

```js
module.exports = {
  // ...
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: ['raw-loader', '@mcph/preprocessor-loader?_type=html&PLATFORM=' + platform]
      },
      {
        test: /\.ts$/,
        loaders: ['raw-loader', '@mcph/preprocessor-loader?_type=ts&PLATFORM=' + platform]
      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', '@mcph/preprocessor-loader?_type=scss&PLATFORM=' + platform]
      }
    ]
  }
};
```

The loader can take any number of key/value pairs, with each key representing what you want to compile against, and each value representing what you want that key to be. In this case, we specified that we only want to compile `<!-- @if PLATFORM == 'mobile' -->` and want everything else to be stripped out.
