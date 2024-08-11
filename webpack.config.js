const path = require('path');
const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index'),
  resolve: {
    extensions: ['.ts', '.js'],
  },
  mode: 'development',

  module: {
    rules: [
      // Настройка лоудера для работы с HTML страницей
      { test: /\.html$/i, use: 'html-loader' },

      // Настройка лоудеров для работы со стилями, и на scss
      {
        test: /\.(c|sa|sc)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      // Настройка лоудера что бы вебпак понимал ТС-файлы
      { test: /\.ts$/i, use: 'ts-loader' },

      // Внутренняя настрйока в самом вебпаке для работы и изображениями
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    clean: true,
    assetModuleFilename: 'assets/images/[name][ext]',
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new EslintPlugin({ extensions: 'ts' }),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};