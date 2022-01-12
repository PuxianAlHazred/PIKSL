<template>
  <div class="">
    <div id="lool" class="fixed mx-auto w-[300px] h-[300px] -translate-y-2/4 top-2/4 left-2/4 opacity-0 -translate-x-2/4 saturate-0  overflow-hidden">
    </div>
    <div class="fixed bottom-0 left-0 w-full z-50">
      <div class="flex justify-around px-5 pt-5 text-white bg-black text-center">
          <p>NB : <b>{{NB_ITE}}</b></p>
          <p>X0 : <b>{{X0}}</b></p>
          <p>X1 : <b>{{X1}}</b></p>
          <p>Y0 : <b>{{Y0}}</b></p>
          <p>Y1 : <b>{{Y1}}</b></p>
          <p>T0 : <b>{{T0}}</b></p>
          <p>T1 : <b>{{T1}}</b></p>
        </div>         
        <div class="flex justify-around px-5 pb-5 text-white space-x-2 bg-black text-center">
          <input type='range' min=0 max=50 step="1" id='brightness' v-model="NB_ITE" >
          <input type='range' min=0 max=20 step="0.1" id='brightnessX0' v-model="X0" >
          <input type='range' min=0 max=20 step="0.1" id='brightnessX1' v-model="X1" >
          <input type='range' min=0 max=20 step="0.1" id='brightnessY0' v-model="Y0" >
          <input type='range' min=0 max=20 step="0.1" id='brightnessY1' v-model="Y1" >
          <input type='range' min=0 max=60000 step="500" id='brightnessT0' v-model="T0" >
          <input type='range' min=0 max=60000 step="500" id='brightnessT1' v-model="T1" >
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        NB_ITE:3,
        X0:3,
        X1:1.60,
        Y0:15.90,
        Y1:1.78,
        T0:6000,
        T1:9000,
      }
    }, 
    methods: {
        appear() {
            var t1 = this.$gsap.timeline();
                t1.to('#lool', {delay: 1, height:'300px', width:'300px',  duration: 1, opacity:1,   stagger: 0.1}, "+=0");
                t1.to('#lool', {delay: 6.2, height:'calc(100vh - 200px)', width:'calc(100vw - 200px)', duration: 1, opacity:1,  stagger: 0.1}, "+=0");
        },
        background() {
            "use strict";
            
            let canv, gl;
            let animState;

            let widthHandle, heightHandle;
            let x0Handle, y0Handle, x1Handle, y1Handle;
            let timeHandle;

            const mrandom =  Math.random;
            const mfloor = Math.floor;
            const mround = Math.round;
            const mceil = Math.ceil;
            const mabs = Math.abs;
            const mmin = Math.min;
            const mmax = Math.max;

            const mPI = Math.PI;
            const mPIS2 = Math.PI / 2;
            const m2PI = Math.PI * 2;
            const msin = Math.sin;
            const mcos = Math.cos;
            const matan2 = Math.atan2;

            const mhypot = Math.hypot;
            const msqrt = Math.sqrt;

            function iorecpatouf () {
            console.groupCollapsed("DATA")
                console.log('NB_ITER', document.getElementById('brightness').value)
                console.log('X0', document.getElementById('brightnessX0').value)
                console.log('X1', document.getElementById('brightnessX1').value)
                console.log('Y0', document.getElementById('brightnessY0').value)
                console.log('Y1', document.getElementById('brightnessY1').value)
            console.groupEnd()
            //-----------------------------------------------------------------------------
            // miscellaneous functions
            //-----------------------------------------------------------------------------

            function alea (min, max) {
            // random number [min..max[ . If no max is provided, [0..min[

                if (typeof max == 'undefined') return min * mrandom();
                return min + (max - min) * mrandom();
            }

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            function intAlea (min, max) {
            // random integer number [min..max[ . If no max is provided, [0..min[

                if (typeof max == 'undefined') {
                max = min; min = 0;
                }
                return mfloor(min + (max - min) * mrandom());
            } // intAlea

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            function distance (p0, p1) {

            /* distance between points */

                return mhypot (p0[0] - p1[0], p0[0] - p1[0]);

            } // function distance

            //-----------------------------------------------------------------------------
            //-----------------------------------------------------------------------------

            //************** Shader sources **************
            let vertexSource = `
            attribute vec2 position;

            void main() {
            gl_Position = vec4(position, 0.0, 1.0);
            }
            `;
            let ttt = document.getElementById('brightnessT0').value
            let fragmentSource = `
            #define PI 3.14159265358979323846
            precision mediump float;

            uniform float width;
            uniform float height;
            uniform float x0;
            uniform float x1;
            uniform float y0;
            uniform float y1;
            uniform float time;
            
            vec2 resolution;

            vec3 fn(float x, float y) {

                float x1;
                float y1;
                float x2;
                float y2;
                float z1;
                
                x1 = x;
                y1 = y;
                
                for (int k = 0; k < ${document.getElementById('brightness').value}; ++k) {
                    x2 = x1 * x - y1 * y;
                    y2 = x1 * y + y1 * x;
                    
                    x1 = sin(x2 + time / ${document.getElementById('brightnessT0').value}.0);
                    y1 = cos(y2 + time / ${document.getElementById('brightnessT1').value}.0);
                }
                return vec3((vec2(x1, y1) + 0.5) / 2.0, (abs(x1) * abs(y1)));  
            }

            void main(){
            resolution = vec2(width, height);
            //set up position
                
            vec2 uv = gl_FragCoord.xy;

            vec3 machin = fn(x0 + uv.x * (x1 - x0) / width,
                            y0 + uv.y * (y1 - y0) / height);     

            gl_FragColor = vec4(machin, 8.0 );
            }
            `;

            //************** Utility functions **************

            //Compile shader and combine with source
            function compileShader(shaderSource, shaderType){
            let shader = gl.createShader(shaderType);
            gl.shaderSource(shader, shaderSource);
            gl.compileShader(shader);
            if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
                throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
            }
            return shader;
            }

            //From https://codepen.io/jlfwong/pen/GqmroZ
            //Utility to complain loudly if we fail to find the attribute/uniform
            function getAttribLocation(program, name) {
            let attributeLocation = gl.getAttribLocation(program, name);
            if (attributeLocation === -1) {
                throw 'Cannot find attribute ' + name + '.';
            }
            return attributeLocation;
            }

            function getUniformLocation(program, name) {
            let attributeLocation = gl.getUniformLocation(program, name);
            if (attributeLocation === null) {
                throw 'Cannot find uniform ' + name + '.';
            }
            return attributeLocation;
            }

            //---------------------------------------------------------

            //---------------------------------------------------------

            let animate;

            { // scope for animate

                animate = function(tStamp){
                    
                if (animState == 0 && startOver()) ++animState;
                
                switch (animState) {
                
                    case 1 :
                        gl.uniform1f(timeHandle, tStamp);
                        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                } // switch
                
                requestAnimationFrame(animate);
                
            } // animate

            } // scope for animate

            //- - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            function resize () {
            animState = 0;     // restart animation
            } // resize

            //---------------------------------------------------------
            function startOver() {

                canv.width = window.innerWidth;
                canv.height = window.innerHeight;
                
                gl.viewport(0, 0, innerWidth, innerHeight);
                
                gl.uniform1f(heightHandle, window.innerHeight);
                gl.uniform1f(widthHandle, window.innerWidth);
                gl.uniform1f(x0Handle, document.getElementById('brightnessX0').value);
                gl.uniform1f(x1Handle, document.getElementById('brightnessX1').value);
                gl.uniform1f(y0Handle, document.getElementById('brightnessY0').value);
                gl.uniform1f(y1Handle, document.getElementById('brightnessY1').value);
                
                gl.drawArrays(gl.TRIANGLE_STRIP, 0, 2);
                console.log('startOver')

                return true;
            } // startOver

            //---------------------------------------------------------
            function initShadersStuff() {
            try {
                let vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
                let fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);
                let program = gl.createProgram();
                gl.attachShader(program, vertexShader);
                gl.attachShader(program, fragmentShader);
                gl.linkProgram(program);

                gl.useProgram(program);

                let vertexData = new Float32Array([
                -1.0,  1.0, 	// top left
                -1.0, -1.0, 	// bottom left
                1.0,  1.0, 	// top right
                1.0, -1.0, 	// bottom right
                ]);

                let vertexDataBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

                let positionHandle = getAttribLocation(program, 'position');
                gl.enableVertexAttribArray(positionHandle);
                gl.vertexAttribPointer(positionHandle,
                2, 				// position is a vec2 (2 values per component)
                gl.FLOAT, // each component is a float
                false, 		// don't normalize values
                2 * 4, 		// two 4 byte float components per vertex (32 bit float is 4 bytes)
                0 				// how many bytes inside the buffer to start from
                );

                widthHandle = getUniformLocation(program, 'width');
                heightHandle = getUniformLocation(program, 'height');
                x0Handle = getUniformLocation(program, 'x0');
                x1Handle = getUniformLocation(program, 'x1');
                y0Handle = getUniformLocation(program, 'y0');
                y1Handle = getUniformLocation(program, 'y1');
                timeHandle = getUniformLocation(program, 'time');
                console.log('initShadersStuff')
            
            } catch(e) {
                console.log(e)
            }
            }
            //---------------------------------------------------------
            // beginning of execution

            {

                document.getElementById('lool').innerHTML = "";
                canv = document.createElement('canvas')

                document.getElementById('lool').appendChild(canv).setAttribute('id','para-1');;

                gl = canv.getContext('webgl');

            } // canvas creation

            window.addEventListener('resize',resize);

            initShadersStuff();
            animState = 0; // to startOver
            requestAnimationFrame(animate);
            
            }
            iorecpatouf()
            document.getElementById('brightness').addEventListener('change', iorecpatouf);
            document.getElementById('brightnessX0').addEventListener('change', iorecpatouf);
            document.getElementById('brightnessX1').addEventListener('change', iorecpatouf);
            document.getElementById('brightnessY0').addEventListener('change', iorecpatouf);
            document.getElementById('brightnessY1').addEventListener('change', iorecpatouf);
            document.getElementById('brightnessT0').addEventListener('change', iorecpatouf);
            document.getElementById('brightnessT1').addEventListener('change', iorecpatouf);
        }
    },
    mounted() {
        this.appear();
        this.background();
    }
  }
</script>
