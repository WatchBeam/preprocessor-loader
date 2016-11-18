# preprocessor-loader demo

To run this demo, install dependencies:

```
npm i webpack webpack-dev-server style-loader
```

Link the local loader:

```
  *'NIX: ln -s `pwd` node_modules/preprocessor-loader
WINDOWS: mklink /D "node_modules\preprocessor-loader" ..\
```

Run the dev server

```
webpack-dev-server --config demo/webpack.config.js
```