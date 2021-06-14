/* eslint-disable import/no-extraneous-dependencies */
const glob = require('glob');

// const components = glob.sync('./src/**/*.vue');
const store = glob.sync('./src/store/*.js');
// const router = glob.sync('./src/router/*.js');

module.exports = {
  output: 'docs/store',
  filenames: store,
};
