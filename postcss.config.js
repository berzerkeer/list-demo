/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

module.exports = {
  plugins: [
    require('stylelint')({
      configFile: 'stylelint.config.js',
    }),
    require('postcss-syntax'),
    require('postcss-flexbugs-fixes'),
    require('postcss-import'),
    require('postcss-extend'),
    require('postcss-mixins'),
    require('postcss-reporter'),
    require('postcss-nested'),
    require('postcss-preset-env', {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
        'nesting-rules': false,
      },
    }),
    require('autoprefixer')(),
  ],
};
