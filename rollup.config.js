import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

import pkg from './package.json';
const external = Object.keys(pkg.dependencies || {});


export default {
  input: process.env.NODE_ENV === 'production' ? 'src/index.js' : 'examples/examples.js',
  output: {
    file: process.env.NODE_ENV === 'production' ? 'dist/index.js' : 'examples/index.js',
    format: process.env.NODE_ENV === 'production' ? 'cjs' : 'iife',
  },
  external: process.env.NODE_ENV === 'production' ? external : [],
  plugins: [
    postcss({
      plugins: [
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false }),
        cssnano(),
      ],
      extensions: ['.css', '.less', '.scss'],
      // modules: true,
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(
      process.env.NODE_ENV === 'production' ?
        {}
      :
        {
          include: [
            'node_modules/**',
          ],
          exclude: [
            'node_modules/process-es6/**',
          ],
          namedExports: {
            'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
            'node_modules/react-dom/index.js': ['render'],
          },
        }
    ),
    replace({
      exclude: process.env.NODE_ENV === 'production' ? 'node_modules/**' : '',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ],
};
