<template>
  <transition name="loading_transition"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-on:before-leave="beforeLeave"
    v-on:leave="leave"
    v-on:after-leave="afterLeave"
  >
    <div v-if="preloading" class="preloader">
      <div v-if="content">
          <widget-logoTypoBig class="titleload z-50"/>

          <div class="preloader__progress">
            <div class="preloader__progress__bar z-50"></div>
          </div>
          <div class="box-blanc"></div>
          <div class="preloader__items z-50 ">
            <ul>
              <li>[ -00%- premeditating protocols -\- ]</li>
              <li>[ -05%- hello world ! -\- ]</li>
              <li>[ -10%- npm run build ]</li>
              <li>[ -15%- nuxt build]</li>
              <li>[ -20%- builder initialized]</li>
              <li>[ -25%- --nuxt files generated - 0.004832s--]</li>
              <li>[ -30%- babel loader]</li>
              <li>[ -35%- node modules]</li>
              <li>[ -40%- --node modules - core.js--]</li>
              <li>[ -45%- css loader]</li>
              <li>[ -50%- post css]</li>
              <li>[ -55%- axios]</li>
              <li>[ -60%- responsive loader]</li>
              <li>[ -70%- --initializing server protocols--]</li>
              <li>[ -75%- client.manifest.json]</li>
              <li>[ -80%- manifest.json]</li>
              <li>[ -85%- entry point = server.js]</li>
              <li>[ -90%- compiling assets]</li>
              <li>[ -95%-  hash 6b7g898c689d9422c --]</li>
              <li>[ -100%-  Loading finish -\- ]</li>
            </ul>
          </div>
      </div>

    </div>
  </transition>
</template>
<style lang="postcss">
  .preloader {
    @apply items-center bg-white text-black my-0 mx-auto min-h-screen flex justify-center text-center z-40 left-0 top-0 w-full;
  }
  .preloader__progress {
    @apply fixed h-[25px] w-[300px] text-center left-2/4 -translate-x-2/4  top-2/4 -translate-y-2/4 z-50;
  }
  .preloader__progress__bar {
    @apply border-b-[25px] text-black h-[25px] mx-auto my-0 w-full;
    animation: ani__06 5s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    transform-origin: 50% 0%;
  }
  .preloader__items{
    @apply block h-[20px] overflow-hidden relative top-[125px] text-center;
    width: calc(100vw - 300px);
  }
  .preloader__items ul{
    @apply m-0 p-0 w-full list-none;
    animation: ani__05 5s;
    animation-delay: 0.75s;
    animation-fill-mode: forwards;
    animation-iteration-count: step-start;
    animation-iteration-count: 1;
  }
  .preloader__items li{
    @apply text-black block font-text h-5 overflow-hidden text-center w-full;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }
  .box-blanc{
    @apply w-full h-[300px] bg-black mx-auto my-0 fixed left-0;
    //left:calc(50% - 150px);
    top:calc(50% - 150px);

  }
</style>
<script>
export default {
  data: () => ({
    content: false, // Boolean du contenu
  }),
  methods: {
    start() {
      console.log("start")
        this.toggle();
        this.content = true; // Boolean du contenu = true
        // Début du chargement du component loading.vue

    },
    beforeEnter() {
      console.log("beforeEnter")
      // Avant de lancer la function Enter()
    },
    enter() {
        this.$gsap.fromTo(".preloader__items",
          {opacity: 0, y: 15, ease: 'power2.inOut'},
          {opacity: 1, y: 0, delay: 1, ease: 'power2.inOut', duration: 0.5},
        );
        this.$gsap.fromTo(".preloader__progress__bar",
          {opacity: 0, y: 0, ease: 'power2.inOut'},
          {opacity: 1, y: 0, delay: 1, ease: 'power2.inOut', duration: 0.5},
        );

        this.$gsap.fromTo(".box-blanc",
          {opacity: 0, height: 300, width: 0, ease: 'power2.inOut'},
          {opacity: 1, delay: 0.8, width: '100%', ease: 'power2.inOut', duration: 0.5},
        );

    },
    afterEnter() {
      // Aprés avoir lancer la function Enter()
      console.log("afterEnter")
        this.$gsap.to(".box-blanc", {delay: 5, opacity: 1, ease: 'power2.inOut', width: 310, height: 310, right:0, y: -5, duration: 0.5});
        this.$gsap.to(".preloader__items", { opacity: 0, y: 5, ease: 'power2.inOut', duration: 0.5, delay: 5 });
        this.$gsap.to(".preloader__progress__bar", { opacity: 0, y: 0, width: '0px', ease: 'power2.inOut', duration: 0.5, delay: 4.5});
        this.$gsap.to(".preloader__progress", { opacity: 1, y: 0, width: 300, height: 300, background: '#FFFFFF',ease: 'power2.inOut', duration: 0.5, delay: 4.5});
        this.$gsap.to(".preloader__progress", { opacity: 0, x: -150, width: 0, height: 300, background: '#FFFFFF',ease: 'power2.inOut', duration: 0.5, delay: 6.0});


    },
    finish() {
      console.log("finish")
        this.content = false; // Boolean du contenu = false
        this.toggle();
      // Fin du chargement du component loading.vue
    },
    beforeLeave() {
      console.log("beforeLeave")
    },
    leave() {
      console.log("leave")
    },
    afterLeave() {
      console.log("afterLeave")
    },
    toggle() {
        this.$store.dispatch('preloading')
    }
  },
  computed: {
    preloading () {
      return this.$store.getters['preloading']
    },
  },
}
</script>
