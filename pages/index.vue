<template>
  <section class="relative" id="contenteru">
    <div class="content-hero h-screen ">
    </div>
  </section>
</template>
<style lang="postcss">
  #container { 
  filter:url('#noise') blur(7px);
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  }

  #text {
  margin: 0;
  line-height: 2.5rem; 
  word-break: break-all;
  }

  .filtered {
  filter: url('#contrast');
  height: 100%;
  }
  .content {
    @apply w-full py-0 flex col-start-1 items-center justify-center;
  }
  .content-hero {
    @apply w-full flex items-center text-center h-screen ;
  }
  .main-title {
    @apply block font-semibold uppercase text-center font-title;
    font-size:20vw;
    line-height: 50vw;
  }
  .title {
    @apply block leading-8 font-semibold uppercase text-left font-title;
    font-size:25vw;
  }
  .sub-title {
    @apply font-semibold text-sm  uppercase ;
  }
</style>
<script>
  import { mapActions } from 'vuex'
  export default {
    methods: {
      ...mapActions({ 
        sound1: 'sound1' 
      }),
      appear() {

        const t1 = this.$gsap.timeline(), mySplitText = new SplitType(".sub-title", {type:"words,chars"}), chars = mySplitText.words;
              t1.from(chars, {delay: 0.6, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.1}, "+=0");
      },
    },
    mounted() {
 
      //this.sound1()
       
      this.appear();     
    }
  }
</script>
