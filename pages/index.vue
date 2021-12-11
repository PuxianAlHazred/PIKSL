<template>
  <section class="relative" id="contenteru">

    
    <div class="content">
        <h1 class="title text-4xl mr-5 ">PIKS-L</h1>
        <h2 class="sub-title ">Studio web multisupport <br> spécialisé dans la création d'expérience sur-mesure.</h2>
    </div>
    
    <div class="content bg-black">
        <span class="sub-title text-right">2021 <br>Site Internet, WPA</span>
        <nuxt-link to="/contact"><h3 class="title text-5xl ml-5 ">GREENFUZ</h3></nuxt-link>
    </div>
    <div class="content">
        <span class="sub-title text-right">Contact par mail<br>CONTACT@PIKS-L.FR</span>
        <nuxt-link to="/contact"><h3 class="title text-4xl ml-5 ">DISPONIBLE DÉS MAINTENANT !</h3></nuxt-link>
    </div>
  </section>
</template>
<style lang="postcss">
  .content {
    @apply w-full py-0 min-h-screen h-screen flex col-start-1 items-center justify-center;
  }
  .title {
    @apply block leading-8 font-semibold text-white uppercase text-center font-title;
  }
  .sub-title {
    @apply font-semibold text-sm text-white uppercase ;
  }
</style>
<script>
  export default {
    methods: {
      appear() {

        const t1 = this.$gsap.timeline(), mySplitText = new SplitType(".sub-title", {type:"words,chars"}), chars = mySplitText.words;
              t1.from(chars, {delay: 0.6, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.1}, "+=0");
      },
    },
    mounted() {
      this.appear();     
    }
  }
</script>
