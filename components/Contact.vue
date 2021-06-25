<template>
  <a class="contact" target="_blank" href="mailto:contact@piks-l.com">
    <h5 class="link-mail">FREELANCE DEVELOPER</h5>
  </a>
</template>
<style scoped>
  .contact {
      position: fixed;
      height: 100px;
      bottom: 50px;
      right: 50px;
      z-index: 1007 !important;
      color:#CCCCCC;
      font-weight:400;
      text-align: right;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration:none;
      font-family: 'Yeseva One', cursive;

  }
  .link-mail{
    color:white;
    font-size: 14px;
    opacity:1;
  }
</style>
<script>
export default {
  methods: {
    appear() {
      var t1 = this.$gsap.timeline(), mySplitText = new SplitType(".link-mail", {type:"words,chars"}), chars = mySplitText.chars;
        t1.from(chars, {delay: 5, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.05}, "+=0");
        let contact = document.querySelector(".contact");
        contact.addEventListener("mouseenter", () => {
          this.$gsap.to(".link-mail", { duration: 0.5, opacity:0.5, text: "CONTACT[AT]PIKS-L.FR", ease: "back", stagger: 0.1});
        });
        contact.addEventListener("mouseleave", () => {
          this.$gsap.to(".link-mail", { duration: 0.2, opacity:1, text: "FREELANCE DEVELOPER", ease: "back", stagger: 0.1});
        });
    }
  },
  mounted() {
    this.appear();
  }
}
</script>
