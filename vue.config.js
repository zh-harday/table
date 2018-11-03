'use strict'
// const utils = require('./utils')
const webpack = require('webpack')
// const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  //生产 env 和 开发 env 静态资源路径配置
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',
  //项目文件别名配置
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      // .set('static', resolve('src/static'))
  },
  //代理服务器配置
  devServer: {
    open: true,
    hot: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  //webpack 插件配置
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        // 'process.env': require('../config/dev.env')
      }),
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      new webpack.NoEmitOnErrorsPlugin(),
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       warnings: false
      //     }
      //   },
      //   // sourceMap: config.build.productionSourceMap,
      //   parallel: true
      // }),
    ]
  },

}