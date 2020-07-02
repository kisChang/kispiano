module.exports = {
  pwa: {
    name: 'Kis Piano',
    manifestOptions: {
      display: 'standalone',
      themeColor: '#fafafa',
    },
  },
  devServer: {
    port: 10070,
    disableHostCheck: true,
  },
};