<template>
  <nav class="menu ">
    <audio id="sound4" volume="0" :src="require(`~/assets/ui/4.ogg`).default" />
    <h3 v-on:click="toggleMenu()" class="menu-span" :class="{'open': this.$store.state.menu, 'close': !this.$store.state.menu}">MENU</h3>
    <transition name="page_transition" mode="in-out" v-on:before-enter="beforeEnter()" v-on:after-enter="afterEnter()" v-on:before-leave="beforeLeave()" v-on:after-leave="afterLeave()">
      <div v-show="this.$store.state.menu">
        <ul v-show="content" class="list">
            <li class="list-item" v-on:click="toggleMenu()">
              <NuxtLink to="/">HOME</NuxtLink>
            </li>
            <li class="list-item" v-on:click="toggleMenu()">
              <NuxtLink to="/works">WORKS</NuxtLink>
            </li>
            <li class="list-item" v-on:click="toggleMenu()">
              <NuxtLink to="/contact">CONTACT</NuxtLink>
            </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>
<style lang="postcss">
  .menu {
      @apply fixed h-[100px] w-[100px] bottom-[50px] left-[50px] ;
      z-index: 1007 !important;
  }
  .menu-span {
      @apply font-title text-white text-center absolute w-[100px] cursor-pointer;
      z-index: 1009 !important;
      font-size: 25px;
      line-height: 100px;
  }
  .menu-span.close { 
    @apply text-white mix-blend-difference;
  }
  .menu-span.open { 
    @apply text-black ;
  }
  .list {
      @apply fixed top-0 left-0 w-screen min-h-screen px-[200px] text-center inline-flex justify-center flex-col bg-white;

      z-index: 1006 !important;
  }
  .list-item {
      @apply block h-1/4 min-h-[50px] relative font-text;
  }
  .list-item a {
      @apply relative block text-black overflow-hidden no-underline ;
  }
</style>
<script>
import { mapActions } from 'vuex'
export default {
  data: () => ({
    content: false,
    sound: false,
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
    async sound4() {
      console.groupCollapsed('Son menu')
        const snd = document.querySelector("#sound4");
        snd.volume = 0.5;
        snd.loop = true;
        if( this.sound === true ) { 
          snd.play()
          this.$gsap.to(snd, 1, {volume:0.5} );
          console.log('Sound 4', this.sound)
        } else {

          this.$gsap.to(snd, 1, {volume:0 , onComplete:pauseSound});

          console.log('Sound 4', this.sound)
        }
          function pauseSound(){
            audio.pause();
          }
      console.groupEnd()
    },
    afterEnter(el) {
      this.content = true
      if( this.$store.state.audio ) {
        this.sound = true
        this.sound4()
      } else {
        this.sound = false
      }
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
      if( this.$store.state.audio ) {
        this.sound = false
        this.sound4()
      } else {
        this.sound = false
      }

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
      this.$store.dispatch('menu')
      if(this.$store.state.menu === true) {
        console.log("true")
        this.$gsap.to(".menu-span", {delay: 0.7, duration: 0.5, opacity:1, text: "CLOSE", ease: "back", stagger: 0.1});
        this.$gsap.to("#anime1",{ attr:{ values: '666' }, duration: 0.5, ease:'Power4.easeInOut'});
      } else {
        console.log("false")
        this.$gsap.to("#anime1",{ attr:{ values: '0' }, duration: 0.5, ease:'Power4.easeInOut'});
        this.$gsap.to(".menu-span", {delay: 0.7, duration: 0.5, opacity:1, text: "MENU", ease: "back", stagger: 0.1});
      }
    },

  },
  mounted() {
    this.appear();
  },
}
</script>
