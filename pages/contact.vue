<template>
  <section>
    <div class="container">
      <div>
        <h3 class="title">AVAILABLE 2021</h3>
        <span class="sub-title">CONTACT@PIKS-L.FR</span>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    data: () => ({
    }),
    computed: {
    },
    methods: {
      appear() {
        var t1 = this.$gsap.timeline(), mySplitText = new SplitType(".title", {type:"words,chars"}), chars = mySplitText.words;
          t1.from(chars, {delay: 6.8, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.1}, "+=0");
      },
    },
    mounted() {
      this.appear();
    }
  }
</script>
