<template>
  <div id="logo" class="logo group">
    <audio id="sound3" volume="0" :src="require(`~/assets/ui/2.ogg`).default" />
    <!--
    <img class="img-logo" src="/images/monoeil-noir.gif" />
    -->
    
    <NuxtLink to="/">
      <widget-logoTypoSmall class="title-logo"/>


      <svg class="svg-logo group-hover:animate-pulse" view-box="0 0 100 100" width="100" height="100">
      </svg>
      <svg class="svg-filter">
        <defs>
          <filter id="teal-white" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feColorMatrix type="matrix" values=".33 .33 .33 0 0
                      .33 .33 .33 0 0
                      .33 .33 .33 0 0
                      0 0 0 1 0" in="SourceGraphic" result="colormatrix"/>
            <feComponentTransfer in="colormatrix" result="componentTransfer">
                  <feFuncR type="table" tableValues="1 0.98"/>
              <feFuncG type="table" tableValues="1 0.96"/>
              <feFuncB type="table" tableValues="1 0.6"/>
              <feFuncA type="table" tableValues="0 1"/>
              </feComponentTransfer>
            <feBlend mode="color" in="componentTransfer" in2="SourceGraphic" result="blend"/>
          </filter>
          <filter id="broken">
            <feTurbulence id="anime3" type="turbulence" baseFrequency="2 8" numOctaves="2" seed="2" stitchTiles="stitch" result="turbulence"/>
            <feColorMatrix type="saturate" values="30" in="turbulence" result="colormatrix"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 150 -15" in="colormatrix" result="colormatrix1"/>
            <feComposite in="SourceGraphic" in2="colormatrix1" operator="in" result="composite"/>
            <feDisplacementMap in="SourceGraphic" in2="colormatrix1" scale="15" xChannelSelector="R" yChannelSelector="A" result="displacementMap"/>
          </filter>
          <filter id="distord">
            <feTurbulence id="anime2" baseFrequency="0.050" type="fractalNoise"/>
            <feColorMatrix type="hueRotate" values="0">
              <animate
                attributeName="values"
                from="0" to="360"
                dur="6s"
                repeatCount="indefinite"/>
            </feColorMatrix>
            <feDisplacementMap
              in="SourceGraphic"
              xChannelSelector="R"
              yChannelSelector="B"
              scale="10">
              <animate
                id="anime1"
                attributeName="scale"
                values="0"
                dur="6s"
                repeatCount="indefinite"/>
              </feDisplacementMap>
            <feGaussianBlur stdDeviation="0.1"/>
            <feComponentTransfer result="main">
              <feFuncA type="gamma" amplitude="150" exponent="5"/>
            </feComponentTransfer>
            <feColorMatrix type="matrix"
                           values="0 0 0 0 0
                                   0 0 0 0 0
                                   0 0 1 0 1
                                   0 0 0 0 0"/>
            <feGaussianBlur stdDeviation="50"/>
            <feComposite operator="over" in="main"/>
          </filter>
          <filter id="distorded">
            <feTurbulence  baseFrequency="0.0400" type="fractalNoise"/>
            <feColorMatrix type="hueRotate" values="0">
              <animate
                attributeName="values"
                from="0" to="360"
                dur="10s"
                repeatCount="indefinite"/>
            </feColorMatrix>
            <feDisplacementMap
              in="SourceGraphic"
              xChannelSelector="R"
              yChannelSelector="B"
              scale="10" >
              <animate

                attributeName="scale"
                values="6"
                dur="10s"

                repeatCount="indefinite"/>
              </feDisplacementMap>
            <feGaussianBlur stdDeviation="0"/>
            <feComponentTransfer result="main">
              <feFuncA type="gamma" amplitude="150" exponent="5"/>
            </feComponentTransfer>
            <feColorMatrix type="matrix"
                           values="0 0 0 0 0
                                   0 0 0 0 0
                                   0 0 1 0 1
                                   0 0 0 0 0"/>
            <feGaussianBlur stdDeviation="0"/>
            <feComposite operator="over" in="main"/>
          </filter>
          <filter id="pixelate">
            <feGaussianBlur stdDeviation="10" in="SourceGraphic" result="smoothed" />
            <feImage width="5" height="5" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVAgdY1ywgOEDAwKxgJhIgFQ+AP/vCNK2s+8LAAAAAElFTkSuQmCC" result="displacement-map" />
            <feTile in="displacement-map" result="pixelate-map" />
            <feDisplacementMap in="smoothed" in2="pixelate-map" xChannelSelector="R" yChannelSelector="G" scale="1" result="pre-final"/>
            <feComposite operator="in" in2="SourceGraphic"/>
          </filter>
        </defs>
      </svg>
    </NuxtLink>

  </div>
</template>
<style lang="postcss">
  /* FILTER */
    .svg-filter{@apply invisible w-0 h-0}
    .filter-broken{filter: url("#broken") saturate(0);}
    .filter-distord{filter: url("#distord") saturate(0);}
    .filter-pixelate{filter: url("#pixelate") saturate(0);}
  /* LOGO */
    .logo {
      @apply w-[100px] top-[50px] left-[50px] fixed h-[100px] z-50;
    }
    .svg-logo {
      @apply top-0 relative mix-blend-difference;
      filter: url("#distord") saturate(0);
    }
    .svg-logo path {
      @apply drop-shadow-sm
    }
    .logo h1{
      @apply m-0 text-white text-3xl mix-blend-difference text-center leading-[100px] top-8 transition-all duration-1000 w-[100px];
      font-family: 'Yeseva One', cursive;
    }
    .logo img {
      @apply absolute top-0 m-[25px] text-center opacity-0 rounded-full;
      filter: url("#distord") saturate(0);
    }
    .logo a {
      text-decoration:none;
    }
</style>
<script>
export default {
  data: () => ({
    coloris: 'rgba(0,0,0,1)',
  }),
  methods: {

    appear() {
      this.$gsap.from("#anime1",{ attr:{ values: '666' }, duration: 5, ease:'Power4.easeInOut'});
      this.$gsap.from(".title-logo", {delay: 6.4, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.1}, "+=0");
      this.$gsap.to(".img-logo", {delay: 0.2, duration: 1, opacity:1});
    },
    hover(){
      const audio = document.querySelector("#sound3");
      audio.volume = 0;
      audio.loop = true;
      const t2 = this.$gsap.timeline({ paused:true });
          t2.to("#anime1",{ attr:{ values: '666' }, duration: 0.5, ease:'Power4.easeInOut'});
      const logo = document.querySelector(".logo");

          logo.addEventListener("mouseenter", () => {
            t2.play();
            audio.play();
            this.$gsap.to(audio, 1, {volume:0.5} );
            this.coloris = 'rgba(255,0,0,1)'
          });
          logo.addEventListener("mouseleave", () => {
            t2.reverse();
            this.$gsap.to(audio, 1, {volume:0 , onComplete:pauseSound});
            this.coloris = 'rgba(0,0,0,1)'
          });
          function pauseSound(){
            audio.pause();
          }
    },
    logo() {
      "use strict";
      class Point2 {
        constructor(x, y) {
          this.x = typeof x === "number" ? x : 0;
          this.y = typeof y === "number" ? y : 0;
        }}
      class Point3 extends Point2 {
        constructor(x, y, z) {
          super(x, y);
          this.z = typeof z === "number" ? z : 0;
        }}
      class Cube {
        constructor(center, size) {
          const d = size /2;

          this.vertices = [
          new Point3(center.x - d, center.y - d, center.z + d),
          new Point3(center.x - d, center.y - d, center.z - d),
          new Point3(center.x + d, center.y - d, center.z - d),
          new Point3(center.x + d, center.y - d, center.z + d),
          new Point3(center.x + d, center.y + d, center.z + d),
          new Point3(center.x + d, center.y + d, center.z - d),
          new Point3(center.x - d, center.y + d, center.z - d),
          new Point3(center.x - d, center.y + d, center.z + d)];


          this.faces = [
          [this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
          [this.vertices[3], this.vertices[2], this.vertices[5], this.vertices[4]],
          [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[7]],
          [this.vertices[7], this.vertices[6], this.vertices[1], this.vertices[0]],
          [this.vertices[7], this.vertices[0], this.vertices[3], this.vertices[4]],
          [this.vertices[1], this.vertices[6], this.vertices[5], this.vertices[2]]];

        }

        render(container, dx, dy) {
          container.innerHTML = "";
          for (let i = 0, ii = this.faces.length; i < ii; i++) {
            let face = this.faces[i];
            let point = Project(face[0]);
            var str = `<path d="M${point.x + dx} ${-point.y + dy}`;
            for (let o = 1, oo = face.length; o < oo; o++) {
              point = Project(face[o]);
              str += ` L ${point.x + dx} ${-point.y + dy}`;
            }
            str += ` Z" fill="rgba(255, 255, 255, 1)"  stroke="rgba(0, 0, 0, 1)">`;
            container.innerHTML += str;
          }
        }}
      const Project = vertice => new Point2(vertice.x, vertice.z);
      const Rotate = (vertice, center, theta, phi) => {
        var ct = Math.cos(theta),
        st = Math.sin(theta),
        cp = Math.cos(phi),
        sp = Math.sin(phi),
        x = vertice.x - center.x,
        y = vertice.y - center.y,
        z = vertice.z - center.z;

        vertice.x = ct * x - st * cp * y + st * sp * z + center.x;
        vertice.y = st * x + ct * cp * y - ct * sp * z + center.y;
        vertice.z = sp * y + cp * z + center.z;
      };
      const container = document.querySelector(".svg-logo");
      const width = container.attributes.width.value;
      const height = container.attributes.height.value;
      const dx = width / 2;
      const dy = height / 2;
      const center = new Point3(0, dy, 0);
      const cube = new Cube(center, dy);
      const mouse = {
        down: false,
        x: 0,
        y: 0
      };
      const Tick = () => {
        for (var i = 0, ii = 8; i < ii; i++) {
          Rotate(cube.vertices[i], center, Math.PI / 270, Math.PI / 450);
        }
        cube.render(container, dx, dy);
        !mouse.down ? requestAnimationFrame(Tick) : null;
      };
      cube.render(container, dx, dy);
      container.addEventListener("mousedown", e => {
        mouse.down = true;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });
      container.addEventListener("mousemove", e => {
        if (mouse.down) {
          var theta = (e.clientX - mouse.x) * Math.PI / 360;
          var phi = (e.clientY - mouse.y) * Math.PI / 180;
          for (var i = 0, ii = 8; i < ii; i++) {
            Rotate(cube.vertices[i], center, theta, phi);
          }
          mouse.x = e.clientX;
          mouse.y = e.clientY;
          cube.render(container, dx, dy);
        }
      });
      container.addEventListener("mouseup", e => {
        setTimeout(() => {
          mouse.down = false;
          requestAnimationFrame(Tick);
        }, 500);
      });
      requestAnimationFrame(Tick);
    }
  },
  mounted() {
    if(this.$store.state.preloading === false) {
      console.log("IORE 1")
    } else {
      console.log("IORE 2")
    }
    this.appear();
    this.hover();
    this.logo();
  }
}
</script>
