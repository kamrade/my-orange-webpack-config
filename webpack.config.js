'use strict';

const path = require('path');
const webpack  = require('webpack');

module.exports = function(env) {
  if(env){}else{env = 'dev'}
  let outDir;
  if(env === 'dev') {outDir = 'dev/js'}
  else if(env === 'prod') {outDir = 'dist/js'}

  console.log('---', env, '---');

  let config = {
    entry: path.resolve(__dirname, 'home.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, outDir),
      library: 'home' // home will be available from the root
    },
    watch: env === 'dev',
    watchOptions: {
      aggregateTimeout: 100
    },
    devtool: env === 'dev' ? 'source-map' : undefined,
    plugins: [
      new webpack.DefinePlugin({
        env: JSON.stringify(env) // env will be available in JS code
      })
    ],
    module: {
      rules: [{
        test: /\.js$/, exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader', options: { presets: ['env'] }}}]
    }
  }

  if(env === 'dev') {
    config.devServer = {
      contentBase: './dev',
      hot: true,
      inline: true
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }


  if(env === 'prod') {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          warnings: false,
          drop_console: true,
          unsafe: true
        }
      })
    )
  }

  return config;
}
