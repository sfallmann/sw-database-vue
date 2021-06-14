const path = require('path');

console.log(process.env.NODE_ENV);
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sw-database-vue/'
    : '/',
  outputDir: 'docs',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/variables.scss";',
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};
