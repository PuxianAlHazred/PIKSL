<template >
  <div >
    <ui-background />

    <ui-logo />
    <ui-menu />
    <widget-scrollindicator />
    <ui-contact />
    

    <Nuxt v-if="!this.$store.state.preloading" />
  </div>
</template>

<style lang="postcss">

  /* Loading : SPLIT*/
  .loading_transition-leave-active,
  .loading_transition-enter-active {
    @apply duration-[800ms] bg-transparent z-50;
  }
  .loading_transition-leave-active::before,
  .loading_transition-leave-active::after,
  .loading_transition-enter-active::before,
  .loading_transition-enter-active::after {
    @apply content-[""] fixed top-0 left-0 z-10 block w-full h-1/2;
    transition-property: opacity, transform;
    transition-timing-function: ease-in-out;
  }
  .loading_transition-leave-active::before,
  .loading_transition-enter-active::before {
    @apply bg-white;
  }
  .loading_transition-leave-active::after,
  .loading_transition-enter-active::after {
    @apply bg-white top-1/2;
  }
  .loading_transition-enter::before,
  .loading_transition-enter::after {
    @apply scale-x-0;
  }
  .loading_transition-enter-active::before {
    @apply duration-[800ms];
  }
  .loading_transition-enter-active::after {
    @apply duration-[500ms] delay-300;
  }
  .loading_transition-enter-to::before,
  .loading_transition-enter-to::after {
    @apply scale-100 origin-left;
  }
  .loading_transition-leave::before,
  .loading_transition-leave::after {
    @apply scale-100;
  }
  .loading_transition-leave-active::before {
    @apply duration-[800ms];
  }
  .loading_transition-leave-active::after {
    @apply duration-[500ms] delay-300;
  }
  .loading_transition-leave-to::before,
  .loading_transition-leave-to::after {
    @apply scale-x-0 origin-right;
  }
</style>
<script>
  export default {
    mounted() {

      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 6400)
      })
    }, 

  }
</script>
