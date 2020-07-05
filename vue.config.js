module.exports = {
  pwa: {
    name: 'Kis Piano',
    themeColor: '#fafafa',
    msTileColor: '#fafafa',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      display: 'standalone',
    },
    workboxOptions: {
      skipWaiting: true,
    },
  },
  devServer: {
    port: 10070,
    disableHostCheck: true,
  },
};