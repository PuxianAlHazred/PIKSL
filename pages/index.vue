<template>
  <section>
    <div class="container">
      <div>
        <h2 class="title">PIKS-L est une agence digitale,</br> créatrice d'expériences sur-mesure.</h2>
      </div>
    </div>
        <Slider />
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
    transition: 'fade',
    data: () => ({
    }),
    computed: {
    },
    methods: {
      appear() {
        var t1 = this.$gsap.timeline(), mySplitText = new SplitType(".title", {type:"words,chars"}), chars = mySplitText.words;
          t1.from(chars, {delay: 0.6, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.1}, "+=0");
      },
    },
    mounted() {

      this.appear();
    }
  }
</script>
