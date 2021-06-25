<template>
  <div class="scrollbar-indicator ">
    <div class="scrollbar-container">
      <div class="scrollbar-progress" id="indicator"></div>
    </div>
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
  </div>
</template>
<style scoped>
  .svg-filter{
    visibility:hidden;
    width: 0px;
    height: 0px;
  }
  .scrollbar-indicator {
    position: fixed;
    top: 50%;
    right: 95px;
    transform: translateY(-50%);
    z-index: 1009 !important;
    width: 5px;
    background-color: #000000;
    height: 100px;
  }
  .scrollbar-container {
    width: 5px;
    height: 100%;
    background: #000000;
  }
  .scrollbar-progress {
    height: 5px;
    background: #FFF;
    width: 5px;
  }
</style>
<script>
  export default {
    methods: {
      appear() {
        this.$gsap.fromTo(".scrollbar-indicator",
          { opacity: 0, x: 5, ease :'power2.inOut'},
          { delay: 4, opacity: 1, x: 0, ease :'power2.inOut'},
        );
      },
    },
    mounted() {
      window.onscroll = function() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        document.getElementById("indicator").style.height = scrolled + "%";
      };
      this.appear();
    }
  }
</script>
