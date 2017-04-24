const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');

const webpackCommonConfig = {
  devtool: 'eval',
  resolve: {
    alias: {
      elRedux: path.resolve(__dirname, 'src/redux/modules'),
      elComponents: path.resolve(__dirname, 'src/components'),
      elContainers: path.resolve(__dirname, 'src/containers')
    }
  },
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: "eltrue.js",
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, 'src')
      ]
    },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'autoprefixer-loader',
            options: {
              browsers: 'last 2 version'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    host: 'localhost',
    contentBase: './public',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    proxy: {
      "/api": "http://localhost:9000"
    }
  }
};

const webpackEnvConfig = {
  production: {
    devtool: 'source-map',
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true,
          warnings: false
        },
        comments: false,
      })
    ]
  }
};

function buildWebpackConfig(env) {
  if (webpackEnvConfig[env]) {
    return webpackMerge(webpackCommonConfig, webpackEnvConfig[env]);
  } else {
    return webpackCommonConfig;
  }

}

module.exports = buildWebpackConfig;