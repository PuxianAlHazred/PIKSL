<template>
  <div class="portfolio-eyes home-eyes">
    <canvas id="para-2"></canvas>
  </div>
</template>
<style lang="postcss">
  	.portfolio-eyes.home-eyes {
      	opacity: 1!important;
  	}
  	.portfolio-eyes.home-eyes > canvas {
		filter:invert(0%)!important;
  	}
  	.portfolio-eyes {
	  	@apply mt-[20px] h-[50px] absolute w-[100px];
      	z-index:1010!important;
  	}
  	.portfolio-eyes > canvas {
		@apply left-1/2 absolute top-1/2 -translate-y-2/4 -translate-x-2/4;
  	   	filter:invert(100%);
  	}
</style>
<script>
export default {
  props: ['coloris'],

  computed: {
    // a computed getter
    color: function () {
      // `this` points to the vm instance
      return this.coloris
    }
  },
  methods: {
    appear(el) {

		var DISPLAY_WIDTH = window.innerWidth, DISPLAY_HEIGHT = window.innerHeight, DISPLAY_DURATION = 10;
		var	mouse = { x: 0, y: 0 }, container, canvas, context, startTime, eyes;
		let colori = this.color;

		

		function initialize() {
			container = document.querySelector( '.portfolio-eyes' );
			canvas = document.querySelector( '.portfolio-eyes > canvas' );

			if( canvas ) {
				canvas.width = 100;
				canvas.height = 100;
				context = canvas.getContext( '2d' );
				window.addEventListener( 'mousemove', function( event ) {
					mouse.x = event.clientX;
					mouse.y = event.clientY;
				}, false );
				eyes = [ new Eye( canvas,   0.5, 0.5,   0.5,    0.5 )	];
				startTime = Date.now();
				animate();
			}
		}

		function animate() {
			if(mouse.x <= 150 && mouse.x >= 50 && mouse.y <= 150 && mouse.y >= 50 ) {
				console.log('good')
			}
			var seconds = ( Date.now() - startTime ) / 300;
			context.clearRect( 0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT );
			for( var i = 0, len = eyes.length; i < len; i++ ) {
				var eye = eyes[i];
				if( seconds > eye.activationTime * DISPLAY_DURATION ) {
					eye.activate();
				};
				eye.update( mouse );

			
			}
			requestAnimFrame( animate );
		}
		setTimeout( initialize, 1 );

		function Eye( canvas, x, y, scale, time ) {

			this.colori = colori;
			this.canvas = canvas;
			this.context = this.canvas.getContext( '2d' )
			this.activationTime = time;
			this.irisSpeed = 0.01 + ( Math.random() * 0.2 ) / scale ;
			this.blinkSpeed = 0.2 + ( Math.random() * 0.2 );
			this.blinkInterval = 2000 + 6000 * ( Math.random() );
			this.blinkTime = Date.now();
			this.scale = scale;
			this.size = 75 * scale;
			this.x = x * canvas.width;
			this.y = y * canvas.height + ( this.size * 0.15 );
			this.iris = { x: this.x, y: this.y - ( this.size * 0.1 ), size: this.size * 0.2	};
			this.pupil = {width: 4 * scale,	height: this.iris.size * 0.75};
			this.exposure = {top: 0.1 + ( Math.random() * 0.3 ), bottom: 0.5 + ( Math.random() * 0.3 ),	current: 0,	target: 1};
			this.tiredness = ( 0.5 - this.exposure.top ) + 0.1;
			this.isActive = false;
			this.activate = function() { 
				this.isActive = true; 
			
			};
			this.update = function( mouse) {
				
				if( this.isActive === true ) {
					
					this.render( mouse);
				}
			}
			this.render = function( mouse) {
				
				var time = Date.now();
				if( this.exposure.current < 0.012 ) {
					this.exposure.target = 1;
				}
				else if( time - this.blinkTime > this.blinkInterval ) {
					this.exposure.target = 0;
					this.blinkTime = time;
				}
				this.exposure.current += ( this.exposure.target - this.exposure.current ) * this.blinkSpeed;
				var el = { x: this.x - ( this.size * 0.8 ), y: this.y - ( this.size * 0.1 ) };
				var er = { x: this.x + ( this.size * 0.8 ), y: this.y - ( this.size * 0.1 ) };
				var et = { x: this.x, y: this.y - ( this.size * ( 0.5 + ( this.exposure.top * this.exposure.current ) ) ) };
				var eb = { x: this.x, y: this.y - ( this.size * ( 0.5 - ( this.exposure.bottom * this.exposure.current ) ) ) };
				var eit = { x: this.x, y: this.y - ( this.size * ( 0.5 + ( ( 0.5 - this.tiredness ) * this.exposure.current ) ) ) };
				var ei = { x: this.x, y: this.y - ( this.iris.size ) };
				var eio = {
					x: ( mouse.x - ei.x ) / ( window.innerWidth - ei.x ),
					y: ( mouse.y ) / ( window.innerHeight )
				};
				ei.x += eio.x * 16 * Math.max( 1, this.scale * 0.4 );
				ei.y += eio.y * 10 * Math.max( 1, this.scale * 0.4 );
				this.iris.x += ( ei.x - this.iris.x ) * this.irisSpeed;
				this.iris.y += ( ei.y - this.iris.y ) * this.irisSpeed;

				this.context.fillStyle = 'rgba(255,255,255,1)';

			this.context.beginPath();
				this.context.lineWidth = 1.5;
				this.context.lineJoin = 'round';
				this.context.moveTo( el.x, el.y );
				this.context.quadraticCurveTo( et.x, et.y, er.x, er.y );
				this.context.quadraticCurveTo( eb.x, eb.y, el.x, el.y );
				this.context.closePath();

			this.context.stroke();
				this.context.fill();
				this.context.save();
				this.context.globalCompositeOperation = 'source-atop';
				this.context.translate(this.iris.x*0.1,0);
				this.context.scale(0.9,1);
				this.context.strokeStyle = this.color;
				this.context.fillStyle = 'rgba(255,255,255,1)';
				this.context.lineWidth = 1;

			this.context.beginPath();
				this.context.arc(this.iris.x, this.iris.y, this.iris.size, 0, Math.PI*2, true);
				this.context.fill();
				this.context.stroke();
				this.context.restore();
				this.context.save();
				this.context.shadowColor = 'rgba(255,255,255,1)';
				this.context.shadowOffsetX = 0;
				this.context.shadowOffsetY = 0;
				this.context.shadowBlur = 2 * this.scale;
				this.context.globalCompositeOperation = 'source-atop';
				this.context.translate(this.iris.x*0.1,0);
				this.context.scale(0.9,1);
				this.context.fillStyle = 'rgba(255,255,255,1)';

			this.context.beginPath();
				this.context.arc(this.iris.x, this.iris.y, this.iris.size * 0.7, 0, Math.PI*2, true);
				this.context.fill();
				this.context.restore();
				this.context.save();
				this.context.globalCompositeOperation = 'source-atop';
				

				this.context.fillStyle = this.colori;

			this.context.beginPath();
				this.context.moveTo( this.iris.x, this.iris.y - ( this.pupil.height * 1 ) );
				this.context.quadraticCurveTo( this.iris.x + ( this.pupil.width * 1 ), this.iris.y, this.iris.x, this.iris.y + ( this.pupil.height * 1 ) );
				this.context.quadraticCurveTo( this.iris.x - ( this.pupil.width * 1 ), this.iris.y, this.iris.x, this.iris.y - ( this.pupil.height * 1 ) );
				this.context.fill();

			this.context.restore();
			}
		}

		window.requestAnimFrame = (function(){
			return  window.requestAnimationFrame       ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					function(callback, element){
					window.setTimeout(callback, 1000 / 60);
					};
		})();
    }
  },
  mounted() {

    this.appear();
  },
}
</script>
