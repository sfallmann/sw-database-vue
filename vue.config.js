const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sw-database-vue/'
    : '/',
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
