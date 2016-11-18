# preprocessor-loader [![Build Status](https://travis-ci.org/WatchBeam/split-html-loader.svg?branch=master)](https://travis-ci.org/WatchBeam/split-html-loader)

`split-html-loader` is a webpack loader that allows conditional compilation of HTML via comment 'directives'. It's essentially a very minimalistic templating language designed specifically to 'feel' like natural HTML and to interoperate fully with other templating engines and build tools. It goes along with our [split-css-loader](https://github.com/WatchBeam/split-css-loader).

For example, you can have split styling for a "desktop" and "xbox" build:

```html
<h1>Hello World</h1>

<!-- By default, comments adjust the visibility of the following tag -->
<!-- platform: desktop -->
<p>You're on our desktop build!</p>
<!-- platform: not-mobile -->
<p>You're not on our mobile build!</p>

<!-- We also support "block" tags -->
<!-- start platform: mobile -->
  <p>This is only on mobile</p>
  <p>This is <i>still</i>only on mobile</p>
<!-- end platform: mobile -->
```

The result of building the above targeting the `mobile` platform would be:

```html
<h1>Hello World</h1>

<!-- By default, comments adjust the visibility of the following tag -->
<!-- platform: desktop -->
<!-- 2 nodes snipped by split-html -->
<!-- platform: not-mobile -->
<!-- 2 nodes snipped by split-html -->

<!-- We also support "block" tags -->
<!-- start platform: mobile -->
  <p>This is only on mobile</p>
  <p>This is <i>still</i>only on mobile</p>
<!-- end platform: mobile -->
```

### Usage

Your `webpack.config.js` might look something like this:

```js
module.exports = {
  // ...
  module: {
    preLoaders: [
      {
        test: /\.html$/,
        loader: 'split-html',
        query: {
          targets: { platform: 'mobile' }
        }
      },
    ],
    loaders: [
      { test: /\.html$/, loader: 'html' },
    ]
  }
};
```

The loader can take any number of key/value pairs in `targets`, with each key representing what you want to compile against, and each value representing what you want that key to be. In this case, we specified that we only want to compile `<!-- platform: mobile -->` and want everything else to be stripped out.

### Programmatic API

You can also use this module natively, in Node. The options are the same, you simply pass in a HTML string you want to parse:

```js
const split = require('split-html-loader');

fs.writeFileSync('./index.html', split.string(myHTML, {
  targets: { platform: 'mobile' }
}));
```
