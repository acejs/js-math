const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    // 默认/dist
    filename: 'index.js',
    library: 'jsMath',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  // 处理那些非 JavaScript 文件
  module: {
    rules: [
      {
        test: /\.ts?$/i,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new ForkTsCheckerWebpackPlugin()] // transpileOnly: true 时获取类型检查
}
