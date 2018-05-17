import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

export default {
  input: 'examples/examples.js',
  output: {
    file: 'examples/build/index.js',
    format: 'iife',
  },
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
      ENV: 'development',
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
