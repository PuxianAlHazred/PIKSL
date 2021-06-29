<template>
  <nav class="menu ">
    <h3 v-on:click="toggleMenu" class="menu-span" :class="{'open': menu, 'close': !menu}">MENU</h3>
    <transition name="page_transition" mode="in-out" v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter" v-on:before-leave="beforeLeave" v-on:after-leave="afterLeave">
      <div v-show="menu">
        <ul v-show="content" class="list">
            <li class="list-item" v-on:click="toggleMenu">
              <NuxtLink to="/">HOME</NuxtLink>
            </li>
            <li class="list-item" v-on:click="toggleMenu">
              <NuxtLink to="/works">WORKS</NuxtLink>
            </li>
            <li class="list-item" v-on:click="toggleMenu">
              <NuxtLink to="/contact">CONTACT</NuxtLink>
            </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>
<style scoped>
  .menu {
      position: fixed;
      height: 100px;
      width: 100px;
      top: 50px;
      right: 50px;
      z-index: 1007 !important;
  }
  .menu-span {
    font-family: 'Yeseva One', cursive;
    z-index: 1009 !important;
    color:white;
    font-size: 25px;

    text-align: center;
    line-height: 100px;
    position: absolute;
    width: 100px;
    cursor:pointer;
  }
    .menu-span.close { mix-blend-mode: difference;}
  .list {
    background: #262626;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 1006 !important;
    padding: 0 200px;
    min-height: 100vh;
    display: inline-flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }
  .list-item {
      display: block;
      height: 25%;
      height: calc(100% / 4);
      min-height: 50px;
      position: relative;
      font-family: 'Lexend', sans-serif;
  }
  .list-item a {
      display: block;
      position: relative;
      color: #FFF;
      text-decoration: none;
      overflow: hidden;
  }
</style>
<script>
export default {
  data: () => ({
    menu: false,
    content: false,
  }),
  methods: {
    appear() {
      var t1 = this.$gsap.timeline(), mySplitText = new SplitType(".menu-span", {type:"words,chars"}), chars = mySplitText.chars;
        t1.from(chars, {delay: 3, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.1}, "+=0");
      let menu = document.querySelector(".menu-span");
      menu.addEventListener("mouseenter", () => {
        this.$gsap.to(".menu-span", { duration: 0.5, opacity:0.5, text: "OPEN", ease: "back", stagger: 0.1});
      });
      menu.addEventListener("mouseleave", () => {
        this.$gsap.to(".menu-span", { duration: 0.2, opacity:1, text: "MENU", ease: "back", stagger: 0.1});
      });
    },
    beforeEnter(el) {
    },
    afterEnter(el) {
      this.toggle();
      this.content = true
      let menu = document.querySelector(".menu-span");
      menu.addEventListener("mouseenter", () => {
        this.$gsap.to(".menu-span", { duration: 0.5, opacity:0.5, text: "MENU", ease: "back", stagger: 0.1});
      });
      menu.addEventListener("mouseleave", () => {
        this.$gsap.to(".menu-span", { duration: 0.2, opacity:1, text: "CLOSE", ease: "back", stagger: 0.1});
      });
    },
    beforeLeave(el) {
      this.content = false
      this.toggle();
      let menu = document.querySelector(".menu-span");
      menu.addEventListener("mouseenter", () => {
        this.$gsap.to(".menu-span", { duration: 0.5, opacity:0.5, text: "OPEN", ease: "back", stagger: 0.1});
      });
      menu.addEventListener("mouseleave", () => {
        this.$gsap.to(".menu-span", { duration: 0.2, opacity:1, text: "MENU", ease: "back", stagger: 0.1});
      });
    },
    afterLeave(el) {
    },
    toggleMenu() {
      this.menu = !this.menu
      if(this.menu === true) {
        console.log("true")
        this.$gsap.to(".menu-span", {delay: 0.7, duration: 0.5, opacity:1, text: "CLOSE", ease: "back", stagger: 0.1});
        this.$gsap.to("#anime1",{ attr:{ values: '666' }, duration: 0.5, ease:'Power4.easeInOut'});
      } else {
        console.log("false")
        this.$gsap.to("#anime1",{ attr:{ values: '0' }, duration: 0.5, ease:'Power4.easeInOut'});
        this.$gsap.to(".menu-span", {delay: 0.7, duration: 0.5, opacity:1, text: "MENU", ease: "back", stagger: 0.1});
      }
    },
    toggle() {
        this.$store.dispatch('toggled')
    }
  },
  mounted() {
    this.appear();
  },
  computed: {
    preloading () {
      return this.$store.getters['toggled']
    },
  },
}
</script>
