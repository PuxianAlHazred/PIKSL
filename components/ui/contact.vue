<template>
  <div class="contact">
    <span v-show="this.$store.state.audio === false" class="cursor-pointer tglaudiooff transform hover:scale-150" @click="audio()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
      </svg>
    </span>
    <span v-show="this.$store.state.audio === true" class="cursor-pointer tglaudioon transform hover:scale-150" @click="audio()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    </span>



  </div>
</template>
<style lang="postcss">
  .contact {
      @apply fixed h-[100px] w-[100px] bottom-[50px] right-[50px] z-50 text-center mx-auto flex items-center justify-center hover:scale-150 transition-all text-white font-title font-normal no-underline;
  }
</style>
<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions({ 
      audio: 'audio',
    }),
    appear() {
      if(!this.$store.state.audio) {
          this.$gsap.from(".tglaudiooff", {delay: 5, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.05}, "+=0");
      } else {
          this.$gsap.from(".tglaudioon", {delay: 5, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.05}, "+=0");
      }
    }
  },
  mounted() {
    this.appear();
  }
}
</script>
