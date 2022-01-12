<template>
  <div class="scrollbar-indicator ">

    <div class="scrollbar-container">
      <div class="scrollbar-progress" id="indicator"></div>
    </div>
  </div>
</template>
<style lang="postcss">
  .scrollbar-indicator {
    @apply fixed top-1/2 left-[97.5px] -translate-y-2/4 w-[5px] h-[150px] bg-white;
    z-index: 1009 !important;
  }
  .scrollbar-container {
    @apply w-[5px] h-full bg-black;
  }
  .scrollbar-progress {
    @apply h-[5px] bg-white w-[5px];
  }
</style>
<script>
  export default {
    methods: {
      appear() {
        this.$gsap.fromTo(".scrollbar-indicator",
          { opacity: 0, x: 5, ease :'power2.inOut'},
          { delay: 4, opacity: 1, x: 0, ease :'power2.inOut'},
        );
      },
    },
    mounted() {
      window.onscroll = function() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("indicator").style.height = scrolled + "%";
      };
      this.appear();
    }
  }
</script>
