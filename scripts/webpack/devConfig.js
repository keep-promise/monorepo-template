const WebpackBar = require('webpackbar');
const ESLintPlugin = require('eslint-webpack-plugin');
const TsCheckerWebpackPlugin = require('ts-checker-webpack-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/** @type { import("webpack").Configuration } */
const config = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    test1: ['./examples/src/test1'],
    test2: ['./examples/src/test2'],
    test3: ['./examples/src/test3'],
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TSConfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        include: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: `[name]-[local]-[sha1:hash:hex:5]`
              }
            }
          },
          'less-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use:
          [
            {
              loader: 'file-loader',
              options: {
                limit: 8192,
                name: 'fonts/[name].[ext]'
              }
            }
          ]
      }
    ]
  },
  plugins: [
    new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new WebpackBar()
  ],
  stats: {
    children: false,
    modules: false
  }
};

module.exports = config;
