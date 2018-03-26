module.exports = {
  build: {},
  head: {},
  loading: { color: '#3B8070' },
  manifest: {
    theme_color: '#3B8070'
  },
  modules: [
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/vuetify'
  ],

  auth: {
    endpoints: {
      logout: false,
      login: { url: '/api/token' },
      user: { url: '/api/authenticated' }
    }
  },

  router: {
    middleware: ['auth']
  }
}
