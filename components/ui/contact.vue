<template>
  <a class="contact" target="_blank" href="mailto:contact@piks-l.com">
    <h5 class="link-mail">CONTACT</h5>
  </a>
</template>
<style lang="postcss">
  .contact {
      @apply fixed h-[100px] bottom-[50px] right-[50px] z-50 text-right mx-auto flex items-center justify-center text-white font-title font-normal no-underline;
  }
  .link-mail{
     @apply text-white text-sm opacity-100;
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
          this.$gsap.to(".link-mail", { duration: 0.2, opacity:1, text: "CONTACT", ease: "back", stagger: 0.1});
        });
    }
  },
  mounted() {
    this.appear();
  }
}
</script>
