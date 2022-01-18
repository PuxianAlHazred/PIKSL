export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    title: 'PIXEL',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;600&family=Yeseva+One&display=swap' },
    ],
    script: [
      //{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'},
      // Tween
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js'}, 
      // Gsap
      { src: 'https://unpkg.com/split-type'}, 
      { src: 'https://www.piks-l.fr/js/bliss.min.js'},
      { src: 'https://www.piks-l.fr/js/rebound.min.js'},
      // Three
      { src: 'https://unpkg.com/three@0.136.0/build/three.min.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/controls/OrbitControls.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/loaders/OBJLoader.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/utils/SceneUtils.js'}, 
      // PostProcessing
      { src: 'https://unpkg.com/three@0.136.0/examples/js/postprocessing/EffectComposer.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/postprocessing/RenderPass.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/postprocessing/ShaderPass.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/postprocessing/RGBShiftShader.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/postprocessing/FilmPass.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/postprocessing/UnrealBloomPass.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/postprocessing/MaskPass.js'}, 
      // Shaders
      { src: 'https://unpkg.com/three@0.136.0/examples/js/shaders/CopyShader.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/shaders/LuminosityHighPassShader.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/shaders/RGBShiftShader.js'}, 
      { src: 'https://unpkg.com/three@0.136.0/examples/js/shaders/FilmShader.js'}, 

      { src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/MyShaderChunks.js'}, 

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/style.css','~/assets/css/transition.css','~/assets/css/keyframes.css',],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false,
  },
  // Loading
  loading: '~/components/ui/loading.vue',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['nuxt-gsap-module', '@nuxtjs/tailwindcss'],
  // GSAP config: https://www.npmjs.com/package/nuxt-gsap-module
  gsap: {
    extraPlugins: {
      cssRule: false,
      draggable: false,
      easel: false,
      motionPath: false,
      pixi: false,
      text: true,
      scrollTo: true,
      scrollTrigger: true
    },
    extraEases: {
      expoScaleEase: false,
      roughEase: false,
      slowMo: false,
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    },
  }
}
