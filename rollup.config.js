import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

export default [{
  input: 'src/immanuel.js',
  output: [
    {
      file: 'dist/immanuel.js',
      format: 'cjs'
    },
    {
      file: 'dist/immanuel.min.js',
      format: 'es'
    }
  ],
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ]
},
{
  input: 'src/demo.js',
  output: {
    file: 'dist/demo.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ]
}];