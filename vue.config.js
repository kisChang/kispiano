module.exports = {
  transpileDependencies: [
    "vuetify"
  ],

  pwa: {
    name: 'Kis Piano',
    manifestOptions: {
      display: 'fullscreen'
    },
    workboxPluginMode: 'InjectManifest'
  }
};