import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser";

export default [{
  input: 'src/immanuel.js',
  output: {
    file: 'dist/immanuel.js',
    format: 'umd',
    name: 'Immanuel'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    terser()
  ]
}
];