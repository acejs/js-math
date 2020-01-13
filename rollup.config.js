import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'umd',
      file: 'dist/bundle.js',
      name: 'jsMath'
    },
    {
      format: 'es',
      file: 'dist/bundle.esm.js'
    }
  ],
  plugins: [typescript()]
}
