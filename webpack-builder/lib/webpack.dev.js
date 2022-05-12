
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  mode: 'production',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // 开启热更新
  devServer: {
    contentBase: './dist', // 基本目录
    hot: true,
    stats: 'errors-only',
  },
  // source-map
  devtool: 'cheap-source-map',
};
// 合并baseConfig和devConfig
module.exports = merge(baseConfig, devConfig);
