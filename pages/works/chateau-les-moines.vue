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
    </div>
</template>
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
  }
}
</script>
