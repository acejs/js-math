const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const devWebpackConfig = require('./webpack.dev.config')
const proWebpackConfig = require('./webpack.pro.config')

module.exports = (env, argv) => {
  const config =
    argv.mode === 'development' ? devWebpackConfig : proWebpackConfig
  return merge(baseWebpackConfig, config)
}
