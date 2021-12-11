<template>
    <div class="container noise">
      <div class="slider">
        <div class="slide first" >
          <div class="container"  style="background-image:url(/images/works25.jpg);">
            <NuxtLink to="/works/chateau-les-moines/">
              <h3 class="title">TITRE DU PROJET 1</h3>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="image-container">
          <div class="image slidein">
            <img src="https://florianschmid.design/img/Licht-Mensch.fb5eb581.jpg">
          </div>
          <div class="image slidein">
            <img src="https://florianschmid.design/img/Licht-Mensch.fb5eb581.jpg">
          </div>
          <div class="image slidein">
            <img src="https://florianschmid.design/img/Licht-Mensch.fb5eb581.jpg">
          </div>
        </div>
       <widget-eyes class="eyes-loading"/>
    </div>
</template>
<style>

.image-container {
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.image {
  margin-top: 4rem;
  width: 80%;
}
.image img {
  max-width: 100%;
  max-height: 100%;
}
</style>
<script>
export default {
  methods: {
    appear() {
      var t1 = this.$gsap.timeline(), mySplitText = new SplitType(".title", {type:"words,chars"}), chars = mySplitText.words;
        t1.from(chars, {delay: 1, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.1}, "+=0");
        this.$gsap.to(".slider",{ y: -200, duration: 1, ease:'Power4.easeInOut'});
    },
  },
  mounted() {
      this.appear();
      this.$gsap.utils.toArray(".slidein").forEach(anim => {
          this.$gsap.from(anim, {
              scrollTrigger: {
                  start: "top bottom",
                  end: "top center",
                  markers: true,
                  scrub: 1,
                  trigger: anim
              },
          y: 120,
          opacity: 0.3
          })
      })
  }
}
</script>
