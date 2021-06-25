<template>
  <transition name="loading_transition" appear v-on:before-appear="beforeEnter" v-on:appear="enter" v-on:after-appear="afterEnter">
    <div v-if="preloading" class="preloader" >
      <div v-if="content">

          <h1 class="titleload">PIKSL</h1>
          <div class="preloader__progress">
            <div class="preloader__progress__bar"></div>
          </div>
          <div class="preloader__items ">
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
          <div class="box-blanc"></div>
      </div>
    </div>
  </transition>
</template>
<style>
  .box-blanc{
    width:300px;
    height:300px;
    background:white;
    margin:0 auto;
    position:fixed;
    left:calc(50% - 150px);
    top:calc(50% - 150px);
    mix-blend-mode: difference;
  }
  .preloader {
    align-items: center;
    background:#262626;
    color: #FFFFFF;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 1007!important;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  }
  .titleload{
    font-size:100px;
    font-family: 'Yeseva One', cursive;
  }
  .preloader__items{
    display: block;
    height: 20px;
    overflow: hidden;
    position: relative;
    top:20px;
    width: calc(100vw - 400px);text-align: center;
  }
  .preloader__items ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
    width: 100%;
    animation: ani__05 5s;
    animation-fill-mode: forwards;
    animation-iteration-count: step-start;
    animation-iteration-count: 1;
  }
  .preloader__items li{
    color: #FFFFFF;
    display: block;
    font-family: Consolas, monaco, monospace;
    height: 20px;
    overflow: hidden;
    text-align:center;
    width: 100%;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }
  .preloader__progress {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5px;
    overflow: hidden;
    text-align: center;
    width: 100%;

  }
  .preloader__progress__bar {
    border-bottom: 5px solid black;
    color: #FFFFFF;
    height: 5px;
    margin:0 auto;
    width: 100%;
        background:red;
    animation: ani__06 5s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    transform-origin: 50% 0%;
  }
</style>
<script>
export default {
  data: () => ({
    content: false, // Boolean du contenu
  }),
  methods: {
    start() {
      this.toggle();
      // Début du chargement du component loading.vue
      this.content = true; // Boolean du contenu = true
    },
    beforeEnter() {

      // Avant de lancer la function Enter()
    },
    enter() {
      var t1 = this.$gsap.timeline(), mySplitText = new SplitText(".titleload", {type:"words,chars"}), chars = mySplitText.chars;
        t1.from(chars, {delay: 1, duration: 0.5, opacity:0, y:-50, transformOrigin:"0% 50% 100",  ease:"power2.inOut", stagger: 0.2}, "+=0");
        t1.to(chars, {delay: 3, duration: 0.5, opacity:0, y:-50, transformOrigin:"0% 50% 100",  ease:"power2.inOut", stagger: 0.2}, "+=0");
      // Animation de la liste
      this.$gsap.fromTo(".preloader__items",
        {opacity: 0, y: 15, ease: 'power2.inOut'},
        {opacity: 1, y: 0, delay: 1, ease: 'power2.inOut', duration: 0.5},
      );
      this.$gsap.fromTo(".box-blanc",
        {opacity: 0, height: 0, ease: 'power2.inOut'},
        {opacity: 1, height: 300, ease: 'power2.inOut', duration: 0.5},
      );
      // Animation de la progress bar
      this.$gsap.fromTo(".preloader__progress__bar",
        {opacity: 0, y: -15, ease: 'power2.inOut'},
        {opacity: 1, y: 0, delay: 1, ease: 'power2.inOut', duration: 0.5},
      );

    },
    afterEnter() {
      // Aprés avoir lancer la function Enter()
      this.$gsap.to(".box-blanc",
        {delay: 5.6, opacity: 0, ease: 'power2.inOut', width: 0, x: 10, duration: 0.5},
      );
      this.$gsap.to(".preloader__items", { opacity: 0, y: 5, ease: 'power2.inOut', duration: 0.5, delay: 5 });
      this.$gsap.to(".preloader__progress__bar", { opacity: 0, y: -5, ease: 'power2.inOut', duration: 0.5, delay: 5});


    },
    finish() {
        this.content = false; // Boolean du contenu = false
        this.toggle();
      // Fin du chargement du component loading.vue
    },
    toggle() {
        this.$store.dispatch('toggled')
    }
  },
  computed: {
    preloading () {
      return this.$store.getters['toggled']
    },
  },
}
</script>
