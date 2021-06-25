<template>
  <div class="scrollbar-indicator ">
    <div class="scrollbar-container">
      <div class="scrollbar-progress" id="indicator"></div>
    </div>
  </div>
</template>
<style scoped>

  .scrollbar-indicator {
    position: fixed;
    top: 50%;
    right: 95px;
    transform: translateY(-50%);
    z-index: 1009 !important;
    width: 5px;
    background-color: #000000;
    height: 100px;
  }
  .scrollbar-container {
    width: 5px;
    height: 100%;
    background: #000000;
  }
  .scrollbar-progress {
    height: 5px;
    background: #FFF;
    width: 5px;
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
