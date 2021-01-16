
/** @type {import('webpack').Configuration} */
module.exports = {
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vue: {
  //         name: 'vue',
  //         test: /[\\/]vue[\\/]/, // /vue/ vuex vue-router
  //         chunks: 'initial'
  //       },
  //       vuex: {
  //         name: 'vuex',
  //         test: /[\\/]vuex[\\/]/, // /vue/ vuex vue-router
  //         chunks: 'initial'
  //       }
  //     }
  //   }
  // }
  mode: 'none',
  externals: {
    vue: 'Vue',
    vuex: 'Vuex'
  }
}