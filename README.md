## 构建 Webpack + TypeScript JS 库开发框架

### Webpack 相关

- webpack
- webpack-cli
- webpack-merge
- webpack-dev-server: 启动开发环境，在 webpack.dev.config.js 中配置
- html-webpack-plugin: 输入到页面，在 webpack.base.config.js 中配置
- clean-webpack-plugin: 用于在下一次打包时清除之前打包的文件，3.0.0 注意导入方式和传参

### TypeScript 相关

- typescript
- ts-loader: 用于加载 ts 文件
  - transpileOnly `true`失去类型检查 `false` 降低编译速度
- fork-ts-checker-webpack-plugin: 在 `transpileOnly: true` 时配置，开启一个独立的进程进行类型检查 [Webpack 文档](https://webpack.docschina.org/guides/build-performance/)

### Babel

### 测试

`npx ts-jest config:init`: 生成 jest 配置文件

- `jest`
- `@types/jest`
- `ts-jest`: 测试用例中可以进行类型检查

`jest.config.js`中新增`preset: 'ts-jest', testEnvironment: 'node'`

### eslint

- eslint
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser

`"lint": "eslint src --ext .js,.ts"`
