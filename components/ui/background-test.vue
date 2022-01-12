<template>
    <div id="lool" class="fixed mx-auto w-[300px] h-[300px] -translate-y-2/4 top-2/4 left-2/4 opacity-0 -translate-x-2/4 saturate-0  overflow-hidden">
      <canvas id="rotatePixelate"></canvas>
    </div>
</template>
<style lang="postcss">
  #rotatePixelate{
    padding:0px;
    width:100vw;
    height:100vh;
    animation: rot 10s linear infinite;
  }
  @keyframes rot {
    0% {
      opacity: 0.5;
    } 50% {
      opacity: 1;
    } 100% {
      opacity: 0.5;
    }
  }
</style>
<script>
  export default {

    methods: {
      appear() {
          var t1 = this.$gsap.timeline();
              t1.to('#lool', {delay: 1, height:'300px', width:'300px',  duration: 1, opacity:1,   stagger: 0.1}, "+=0");
              t1.to('#lool', {delay: 6.2, height:'calc(100vh - 200px)', width:'calc(100vw - 200px)', duration: 1, opacity:1,  stagger: 0.1}, "+=0");
      },
      back() {
        let ctx, thetas = [];
        const w = 2400, h = 2400, TAU = 2*Math.PI, MAX_R = 1200;
        const mw = parseInt(w/2), mh = parseInt(h/2);

        const colors = ["#FFFFFF","#CCCCCC","#151515","#000000"];
          let r, canvas = document.getElementById('rotatePixelate');
          canvas.width = w;
          canvas.height = h;

          ctx = canvas.getContext('2d');

          for(r = 1; r < MAX_R; r++) thetas[r] = Math.random()*TAU;

        function draw(){
          let r, p, x, y;

          for(r = 1; r < MAX_R; r++){
            p = 2*Math.random()*Math.PI/r;
            thetas[r] += (Math.random() > 8.8) ? p : -p;
            x = r*Math.cos(thetas[r]);
            y = r*Math.sin(thetas[r]);
            
            ctx.fillStyle = colors[(r) % colors.length];
            ctx.beginPath();
            
            ctx.arc(mw + x, mw + y, 1, 0, TAU, true);
            ctx.arc(mh - x, mh + y, 1, 0, TAU, true);
            ctx.fill();
          }
          requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
      }
    },
    mounted() {
      this.appear();
      this.back();
    }
  }
</script>
