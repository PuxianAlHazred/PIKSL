<template>
  <div class="logo">
    <audio id="mySoundClip">
    	<source src="/sounds/Fake-Vinyl-1.mp3"></source>
    </audio>
    <img class="img-logo" src="/images/monoeil-noir.gif" />
    <NuxtLink to="/">
      <svg class="svg-logo" view-box="0 0 100 100" width="100" height="100">
      </svg>
      <svg class="svg-filter">
        <defs>
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
            <feTurbulence  baseFrequency="0.050" type="fractalNoise"/>
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
              scale="50" >
              <animate

                attributeName="scale"
                values="50"
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
            <feGaussianBlur stdDeviation="2" in="SourceGraphic" result="smoothed" />
            <feImage width="5" height="5" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWSURBVAgdY1ywgOEDAwKxgJhIgFQ+AP/vCNK2s+8LAAAAAElFTkSuQmCC" result="displacement-map" />
            <feTile in="displacement-map" result="pixelate-map" />
            <feDisplacementMap in="smoothed" in2="pixelate-map" xChannelSelector="R" yChannelSelector="G" scale="50" result="pre-final"/>
            <feComposite operator="in" in2="SourceGraphic"/>
          </filter>
        </defs>
      </svg>
      <h1 class="title-logo">PIKSL</h1>
    </NuxtLink>
  </div>
</template>
<style scoped>
  .svg-filter{
    visibility:hidden;
    width: 0px;
    height: 0px;
  }
  .logo {
    width: 100px;
    top: 50px;
    left: 50px;
    position: fixed;
    height: 100px;
    z-index:1008!important;
  }
    .svg-logo {
      top: 0%;
      filter: url("#distord") saturate(0);
      position: relative;
      mix-blend-mode: difference;
    }
    .svg-logo path {
      filter: drop-shadow( 5px 5px 5px rgba(0, 0, 0, 1));
    }
  .logo h1{
    margin: 0;
    color: #FFFFFF;
    font-size: 32px;
    mix-blend-mode: difference;
    text-align: center;
    line-height: 100px;
    top: 30px;
    transition: 1s ease all;
    position: absolute;
    width: 100px;
    font-family: 'Yeseva One', cursive;
  }
  .logo img {
    position: absolute;
    top: 0;
    margin: 25px;
    text-align: center;
    filter: url("#distord") saturate(0);
    opacity:0;
    border-radius: 50%;
  }
  .logo a {
    text-decoration:none;
  }
</style>
<script>
export default {
  methods: {
    appear() {
      this.$gsap.from("#anime1",{ attr:{ values: '666' }, duration: 5, ease:'Power4.easeInOut'});
      var t1 = this.$gsap.timeline(), mySplitText = new SplitType(".title-logo", {type:"words,chars"}), chars = mySplitText.chars;
        t1.from(chars, {delay: 6.4, duration: 1, opacity:0, y:50, transformOrigin:"0% 50% 100",  ease:"back", stagger: 0.1}, "+=0");
        t1.to(".img-logo", {delay: 0.2, duration: 1, opacity:1});
    },
    hover(){
      var audio = document.querySelector("#mySoundClip");
      var t2 = this.$gsap.timeline({ paused:true });
        t2.to("#anime1",{ attr:{ values: '666' }, duration: 0.5, ease:'Power4.easeInOut'});
      let logo = document.querySelector(".logo");
      logo.addEventListener("mouseenter", () => {
        t2.play();
        audio.play();
      });
      logo.addEventListener("mouseleave", () => {
        t2.reverse();
        audio.pause();
      });
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
  created() {
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
