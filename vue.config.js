const path = require('path');

module.exports = {
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
