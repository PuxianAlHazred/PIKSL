<template >
  <div >
    <ui-backgroundTest />
    <ui-logo />
    <h2 class="sub-title text-white">Studio web multisupport spécialisé dans la création d'expérience sur-mesure.</h2>
    <widget-eyes :coloris="coloris" class="eyes-loading z-50"/>
    <ui-menu />
    <widget-scrollindicator />
    <ui-contact />
    <Nuxt v-if="!this.$store.state.preloading" />
    <script id='sphere-vertex-shader' type='x-shader/x-vertex'>
        uniform float uTime;

        varying vec2 vUv;

        void main() {
            vUv = uv;

            vec3 delta = normal * sin(position.x * position.y * uTime / 5.0);
            vec3 newPosition = position + delta;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    </script>
    <script id='sphere-fragment-shader' type='x-shader/x-fragment'>
        uniform float uTime;

        varying vec2 vUv;

        float rand(vec2 seed);
        float noise(vec2 position);

        void main() {
            vec2 position1 = vec2(vUv.x * 4.0, vUv.y - uTime);
            vec2 position2 = vec2(vUv.x * 4.0, vUv.y - uTime * 2.0);
            vec2 position3 = vec2(vUv.x * 4.0, vUv.y - uTime * 3.0);

            float color = (
                noise(position1 * 5.0)
                + noise(position2 * 10.0)
                + noise(position3 * 15.0)) / 3.0;

            gl_FragColor = vec4(0.0, 0.0, 0.0, color - smoothstep(0.1, 1.0, vUv.y));
        }

        float rand(vec2 seed) {
            return fract(sin(dot(seed, vec2(12.9898,78.233))) * 43758.5453123);
        }

        float noise(vec2 position) {
            vec2 blockPosition = floor(position);

            float topLeftValue     = rand(blockPosition);
            float topRightValue    = rand(blockPosition + vec2(1.0, 0.0));
            float bottomLeftValue  = rand(blockPosition + vec2(0.0, 1.0));
            float bottomRightValue = rand(blockPosition + vec2(1.0, 1.0));

            vec2 computedValue = smoothstep(0.0, 1.0, fract(position));

            return mix(topLeftValue, topRightValue, computedValue.x)
                + (bottomLeftValue  - topLeftValue)  * computedValue.y * (1.0 - computedValue.x)
                + (bottomRightValue - topRightValue) * computedValue.x * computedValue.y;
        }
    </script>


    <script id='bulle-vertex-shader' type='x-shader/x-vertex'>
      #include <noise>

      uniform float uTime;

      varying vec2 vUv;
      varying float vNoise;

      void main() {	
        float time = uTime / 4.0;
        float displacement;
        float b;

        vUv = uv;

        // add time to the noise parameters so it's animated
        vNoise = 5.0 *  -.10 * turbulence( 50.5 * normal + time );
        b = 1.0 * pnoise( 0.05 * position + vec3( 1.0 * time ), vec3( 1.0 ) );
        displacement = - 5. * vNoise + b;

        // move the position along the normal and transform it
        vec3 newPosition = position + normal * displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
      }
    </script>
    <script id='bulle-fragment-shader' type='x-shader/x-fragment'>
      #define PI 3.141592653589
      #define PI2 6.28318530718

      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform sampler2D uTex;

      varying vec2 vUv;
      varying float vNoise;

      //	<https://www.shadertoy.com/view/4dS3Wd>
      //	By Morgan McGuire @morgan3d, http://graphicscodex.com

      //https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/

      float random( vec3 pt, float seed ){
        vec3 scale = vec3( 12.9898, 78.233, 151.7182 );
        return fract( sin( dot( pt + seed, scale ) ) * 43758.5453 + seed ) ;
      }

      void main() {

        // get a random offset
        float r = .01 * random( gl_FragCoord.xyz, 0.0 );
        // lookup vertically in the texture, using noise and offset
        // to get the right RGB colour
        vec2 uv = vec2( 0, 1.3 * vNoise + r );
        vec3 color = texture2D( uTex, uv ).rgb;

        gl_FragColor = vec4( color, 1.0 );
      }
    </script>
  </div>
</template>

<style lang="postcss">

  /* Loading : SPLIT*/
  .loading_transition-leave-active,
  .loading_transition-enter-active {
    @apply duration-[800ms] bg-transparent z-50;
  }
  .loading_transition-leave-active::before,
  .loading_transition-leave-active::after,
  .loading_transition-enter-active::before,
  .loading_transition-enter-active::after {
    @apply content-[""] fixed top-0 left-0 z-10 block w-full h-1/2;
    transition-property: opacity, transform;
    transition-timing-function: ease-in-out;
  }
  .loading_transition-leave-active::before,
  .loading_transition-enter-active::before {
    @apply bg-white;
  }
  .loading_transition-leave-active::after,
  .loading_transition-enter-active::after {
    @apply bg-white top-1/2;
  }
  .loading_transition-enter::before,
  .loading_transition-enter::after {
    @apply scale-x-0;
  }
  .loading_transition-enter-active::before {
    @apply duration-[800ms];
  }
  .loading_transition-enter-active::after {
    @apply duration-[500ms] delay-300;
  }
  .loading_transition-enter-to::before,
  .loading_transition-enter-to::after {
    @apply scale-100 origin-left;
  }
  .loading_transition-leave::before,
  .loading_transition-leave::after {
    @apply scale-100;
  }
  .loading_transition-leave-active::before {
    @apply duration-[800ms];
  }
  .loading_transition-leave-active::after {
    @apply duration-[500ms] delay-300;
  }
  .loading_transition-leave-to::before,
  .loading_transition-leave-to::after {
    @apply scale-x-0 origin-right;
  }
</style>
<script>
  export default {
      data: () => ({
    coloris: 'rgba(0,0,0,1)',
  }),
    mounted() {

      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 6400)
      })
    }, 

  }
</script>
