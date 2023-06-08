const path = require('path');
const WebpackBar = require('webpackbar'); // 打包时实时显示打包进度
const TerserPlugin = require('terser-webpack-plugin'); // 打包时自动去除console.log
const ESLintPlugin = require('eslint-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TsCheckerWebpackPlugin = require('ts-checker-webpack-plugin');
const { generateExternals, getPackageFolder, getPackageName } = require('../util');

module.exports = function createBaseProdConfig(buildPath = './dist') {
  const packageName = getPackageName();
  const rootPath = getPackageFolder();
  const tsconfig = path.resolve(rootPath, 'tsconfig.es.json');
  const externals = generateExternals();

  /** @type { import("webpack").Configuration } */
  const config = {
    target: ['web', 'es5'],
    mode: 'production',
    context: rootPath,
    devtool: 'hidden-source-map',
    entry: {
      [`${packageName}.min`]: ['./src']
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: { comments: false }
          }
        }),
        new CssMinimizerPlugin()
      ]
    },
    output: {
      path: path.resolve(rootPath, buildPath),
      publicPath: '/',
      filename: '[name].js',
      chunkFilename: '[name].chunk.js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                configFile: tsconfig
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ESLintPlugin(),
      new TsCheckerWebpackPlugin({ typescript: { configFile: tsconfig } }),
      new WebpackBar()
    ],
    externals,
    stats: {
      children: false,
      modules: false
    }
  };

  return config;
};
