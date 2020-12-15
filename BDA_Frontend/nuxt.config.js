module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + ' Busacdor De Auto',
    title: '',
    htmlAttrs: {
      lang: 'es_US'
    },
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1 max-width=device-width'
      },
      // { "http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests" },
      {
        hid: 'description',
        name: 'description',
        content:'Buscador de Auto Clasificados'
      }
    ],
    link: [
      { rel: 'stylesheet',
      type: 'text/css',
      href: 'https://cdn.jsdelivr.net/npm/v-stripe-elements@v1.2.0/dist/v-stripe-elements.min.css'
    },
    {
      rel: 'stylesheet',
      type:'text/css',
      href:"//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
    },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://use.typekit.net/wfi0xnb.css?swap=true'
      }
    ],
    script: [
      // {
      //   src:"//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"
      // },
      // {
      //   src:"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"
      // }
    ],
},
    router: {
    middleware: ['meta']
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
    plugins: [
    '~/plugins/vuex-router-sync.js',
    '~/plugins/vue-instantsearch.js',
    '~plugins/vue-js-modal.js',
    // { src: '~/plugins/stripeCheckOut.js', ssr: false },
    {
      src: '~/plugins/vee-validate',
      ssr: false
    },
    {
      src: '~/plugins/v-mask',
      ssr: false
    },
    {
      src: '~/plugins/vuex-persist',
      ssr: false
    },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
    'nuxt-stripe-module',
    '@nuxtjs/toast',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-US'
          },
          {
            code: 'es',
            iso: 'es-ES'
          }
        ],
        defaultLocale: 'es',
        vueI18n: {
          fallbackLocale: 'es',
          messages: {
            en: require('./static/lang/es-US.json'),
            es: require('./static/lang/es-US.json')
          }
        }
      }
    ],
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap'
  ],
  toast: {
    position: 'bottom-center',
    register: [
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error',
          theme:'bubble',
          duration: 1000,
        }
      }
    ]
},
  stripe: {
    /* module options */
    publishableKey: "pk_test_51GHGgRKwZCJ9Iq9U80Po43t5uUg0hwi9aC9KSohCWZpenZow5584vj0AOsP3eg21lqUe1veeImrF3xwrAAVDYZ7n00zUUlZue2",  
  },
  generate: {
    subFolders: true,
    // fallback: true

  },
  pwa: {
    meta: {
      theme_color: '#027BE3'
      /* meta options */
    }
  },
  sitemap: {
    hostname: 'https://beta.buscadordeauto.com',
    gzip: true,
    exclude: []
  },
  robots: {
    UserAgent: '*',
    Disallow: '/'
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    progress: true,
    //  baseURL:  'https://classifieds-inv-processor-dot-bda-classifieds-v2.appspot.com'
    baseURL: 'http://localhost:5500'
  },
  // auth: {
  //   redirect: {
  //     login: '/', // redirect user when not connected
  //     callback: '/auth/signed-in'
  //   },
  //   strategies: {
  //     local: false,
  //     auth0: {
  //       domain: 'bda-auth.auth0.com',
  //       client_id: 'byq8QVchgXlWYYM7IzJr6HOkS3DhWn4E'
  //     }
  //   }
  // },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      light: true, //you don't actually need this line as it's for default
      themes: {
        light: {
          bdablue: '#027BE3',
          bdared: '#ec0505',
          primary: '#027BE3',
          secondary: '#ec0505'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    // analyze: true,
    filenames: {
      //  app: '[name].[chunkhash].js'
      app: '[name].[hash].js'
    },
    transpile: [
      'vue-instantsearch',
      'instantsearch.js/es',
      'vee-validate/dist/rules'
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    BACKEND_API: process.env.BACKEND_API || 'http://localhost:5500',
    // BACKEND_API: process.env.BACKEND_API || 'https://staging.buscadordeauto.com:5500',
    INVENTORY_API_URL:
    process.env.INVENTORY_API_URL || 'http://localhost:5500',
    // INVENTORY_API_URL:
    // process.env.INVENTORY_API_URL || 'https://api.beta.buscadordeauto.com',
    // AUTH0_CLIENT_ID: 'byq8QVchgXlWYYM7IzJr6HOkS3DhWn4E',
    // AUTH0_DOMAIN: 'bda-auth.auth0.com'
  }
}
