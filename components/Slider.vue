<template>
    <div class="container noise">
      <div class="slider-controls">
        <div data-slide="0" class="active">T1</div>
        <div data-slide="1">T2</div>
        <div data-slide="2">T3</div>
      </div>
      <div class="slider">
        <div class="mask-slide"></div>

        <div class="slide first" style="background-image:url(/images/works25.jpg);">
          <div class="container">
            <NuxtLink to="/works/chateau-les-moines/">
              <h3 class="title">TITRE DU PROJET 1</h3>
            </NuxtLink>
          </div>
        </div>
        <div class="slide" style="background-image:url(/images/works24.jpg);">
          <div class="container">
            <NuxtLink to="/works/chateau-les-moines/">
              <h3 class="title">TITRE DU PROJET 2</h3>
            </NuxtLink>
          </div>
         </div>
        <div class="slide" style="background-image:url(/images/works25.jpg);">
          <div class="container">
            <NuxtLink to="/works/chateau-les-moines/">
              <h3 class="title">TITRE DU PROJET 3</h3>
            </NuxtLink>
          </div>
         </div>
      </div>
    </div>
</template>
<style scooped>
  .noise {
    justify-content: left;
    text-align: left;
    padding: 0px;
    overflow-x:hidden;
    display:block;
  }

    .slider-controls {
        display: flex;
        position: relative;top: calc(100vh - 85px);
        left: 50px;
        z-index: 99999;
        width: 100px;
        position: relative;top: calc(100vh - 85px);
    }
    .slider-controls > div {
      font-size: 24px;
      cursor: pointer;
    }
    .slider-controls div.active {
      color:white;
    }
    .slider {
      position: relative;
      width: 100vw;
      height: 100vh;
    }
    .slide {
      position: absolute;
      left: 0;
      top: 0;
      width: 0%;
      height: 100%;
      overflow:hidden;
      background-position:center center;
      background-size:cover;
    }
    .slide.first {
      width: 100%;
    }
    .slide img {
      width: 100vw;

    }
    .mask-slide {
      position: absolute;
      background: #262626;
      width: 100%;
      height: 100%;
      top: 0%;
      left: 0;
      transform: translateX(-100%);
      z-index: 2;
    }
</style>

<script>
  export default {
    methods: {
      slider() {
        class Slider {
          constructor() {
            this.controls = document.querySelectorAll('.slider-controls div');
            this.slides = document.querySelectorAll('.slider .slide');
            this.mask = document.querySelectorAll('.mask-slide');
            this.index = 0;
            this.isPlaying = false;
            this.timer = false;
            this.interval;
            this.init();
            this.initEvents();
          }
          init() {
            this.interval = setInterval(() => {
              this.play();
            }, 4000);
            this.timer = true;
          }
          initEvents() {
            this.controls.forEach(control => control.addEventListener('click', e => this.switchSlide(e)));
          }
          switchSlide(e) {
            if (this.isPlaying) {
              return;
            }
            const current = document.querySelector('.slider-controls .active');
            const slideCurrent = current.getAttribute('data-slide');
            const target = e.target;
            const slideTarget = target.getAttribute('data-slide');
            const slideTargetElement = this.slides[slideTarget - 1];
            if (slideCurrent === slideTarget) {
              return;
            }
            clearInterval(this.interval);
            this.timer = false;
            this.play(target, slideTarget);
          }
          play(target, slideTarget) {
            const currentIndex = this.index;
            let nextIndex = Number(slideTarget) || this.index + 1;
            if (nextIndex > this.slides.length - 1) {
              nextIndex = 0;
            }
            const activeNav = target || this.controls[nextIndex];
            this.isPlaying = true;
            this.controls.forEach(control => control.classList.remove('active'));
            activeNav.classList.add('active');
            const tl = new TimelineMax({ onComplete: () => {
                TweenMax.set(this.slides[currentIndex], { left: 0, right: 'initial' });
                TweenMax.set(this.mask, { x: '-100%' });
                this.isPlaying = false;
                this.index = nextIndex;
                if (!this.timer) {
                  this.interval = setInterval(() => {
                    this.play();
                  }, 10000);
                  this.timer = true;
                }
              } });
            tl.to(this.mask, 1, {
              x: '0%',
              ease: Power4.easeInOut });
            tl.set(this.slides[currentIndex], {
              width: '0%' });
            tl.to(this.mask, 1, {
              x: '100%',
              ease: Power4.easeInOut });
            tl.to(this.slides[nextIndex], 1, {
              width: '100%',
              ease: Power4.easeInOut },
            '-=1');
          }}
        const horizonSlider = new Slider();
      },
      appear() {
        var t1 = this.$gsap.timeline(), mySplitText = new SplitText(".title", {type:"words,chars"}), chars = mySplitText.words;
          t1.from(chars, {delay: 6.8, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.1}, "+=0");
      },
    },
    mounted() {
      this.appear();
      this.slider();
    }
  }
</script>
