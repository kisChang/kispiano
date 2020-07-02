module.exports = {
  pwa: {
    name: 'Kis Piano',
    manifestOptions: {
      display: 'standalone',
    },
  },
  devServer: {
    port: 10070,
    disableHostCheck: true,
  },
};