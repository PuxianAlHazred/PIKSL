<template>
    <div id="animation">
        <div id="word">
            <div class="letters cf text-black">
            </div>
        </div>
    </div>
</template>
<style lang="postcss">
  .cf:before,
  .cf:after {
    content: " ";
    @apply table;
  }
  .cf:after {
    clear: both;
  }
  .cf {
    *zoom: 1;
  }
  #animation {
    @apply h-auto left-1/2 relative text-center w-[640px] -translate-x-2/4 top-[-200px];
  }	
  #word {
    @apply inline-block opacity-0 translate-y-[30px];
    cursor: crosshair;
    -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  }
  #word.visible {
    @apply opacity-100 translate-y-[0];
    -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    -webkit-transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);      
  }
  #word.active letter {

  }
  .letters {
    @apply h-full;
  }
  .letter {
    @apply h-[120px] transition-all duration-300 ease-linear;
  }
  .symbol {
    @apply float-left h-full text-center;
    line-height: 120px;
  }
</style>
<script>
  export default {
    methods: {
      async rotateLetters() {

        try{
        var t1 = this.$gsap.timeline();
            t1.from("#animation", {delay: 0.4, duration: 0.5, opacity:0, y:-50, transformOrigin:"0% 50% 100",  ease:"power2.inOut", stagger: 0.2}, "+=0");
            t1.to("#animation", {delay: 4, duration: 0.5, opacity:0, y:-50, transformOrigin:"0% 50% 100",  ease:"power2.inOut", stagger: 0.2}, "+=0");
          var title = document.title;
          var blurMessage = new Array("PにkS⠇", "PIKS-L", "霊⠊とL", "ل王⠅s£", "せiس⠎l", "pIノsب", "⠏エKك|");
          document.onfocus = function () { 
            console.log('onFocus')
            setInterval(function() {
              var rand = Math.floor((Math.random() * blurMessage.length));
              document.title = blurMessage[rand];
            },1000);
          }
          document.onOpen  = function () { 
            console.log('onOpen')
            document.title = title;
          }
          var wordStructure = [{
            symbols: 			['P', 'せ', 'ل', 'p', '霊', '⠏'],
            symbolWidths: 	[73, 90, 65, 55, 99, 60],
            symbolSizes: 		[100, 95, 95, 100, 80, 95],
            symbolWeights: 	[400, 400, 400, 400, 700, 400],
            symbolClasses: 	['font-title', '', '', '', '', '']
          }, {
            symbols: 			['i', 'に', 'I', '王', 'エ', '⠊'],
            symbolWidths: 	[45, 90, 75, 110, 110, 60],
            symbolSizes: 		[80, 100, 100, 100, 100, 95],
            symbolWeights: 	[400, 400, 400, 700, 700, 400],
            symbolClasses: 	['font-fat', '', '', '', '', '']
          }, {
            symbols: 			['K', 'س', 'k', 'ノ', '⠅'],
            symbolWidths: 	[80, 110, 60, 100, 100],
            symbolSizes: 		[100, 90, 100, 100, 100],
            symbolWeights: 	[400, 400, 400, 400, 400],
            symbolClasses: 	['font-text', '', '', '', '']
          }, {
            symbols: 			['s', 'と', 'ك', 'S', '⠎'],
            symbolWidths: 	[60, 80, 110,80, 100],
            symbolSizes: 		[100, 100, 100,100, 100],
            symbolWeights: 	[400, 400, 400, 400, 400],
            symbolClasses: 	['font-title', '', 'font-fat', '', '']
          }, {
            symbols: 			['L', 'l', 'ب', '£', '⠇'],
            symbolWidths:		[80, 41, 70, 90, 90],
            symbolSizes: 		[100, 100, 90, 100, 90],
            symbolWeights: 	[700, 400, 700, 400, 400],
            symbolClasses: 	['font-title', '', '', 'font-text', '']
          }];
          var isPaused = false;
          var animateInDelay = 1000;
          function getSymbolsTranslation(widths, symbolIndex) {
            if (symbolIndex === 0) return 0;
            return widths.reduce(function(p, c, currentIndex) {
              return currentIndex < symbolIndex ? p + c : p;
            });
          }
          function generateRandomInt(max) { 
            return Math.round(Math.random() * max); 
          }
          document.onload = (event) => {
            console.log('page is fully loaded');
          };
  
          var springSystem = new rebound.SpringSystem();
          var letterSprings = [];
          var letters = [];
          wordStructure.forEach(function(letter, letterIndex) {
            var containerWidth = letter.symbolWidths.reduce(function(p, c) {
              return p + c;
            });
            var currentTimeout = null;
            var currentSymbolsTranslation = 0;
            var currentSymbolsIndex = 0;
            var currentSpringBit = 0;
            var letterContent = [];
            letter.symbols.forEach(function(symbol, symbolIndex) {
              letterContent.push({
                tag: 'div',
                className: 'symbol ' + (letter.symbolClasses[symbolIndex] ? letter.symbolClasses[symbolIndex] : ''),
                style: {
                  width: letter.symbolWidths[symbolIndex] + 'px',
                  fontSize: letter.symbolSizes[symbolIndex] + 'px',
                  fontWeight: letter.symbolWeights[symbolIndex]
                },
                contents: [symbol]
              });
            });
            const letterNode = $.create('div', {
              className: 'letter',
              style: {
                float: isPaused ? 'none' : 'left',
                overflow: isPaused ? 'visible' : 'hidden'
              },
              contents: [{
                className: 'symbols cf',
                contents: letterContent,
                style: {
                  width: containerWidth + 'px'
                }
              }]
            });
            $.inside(letterNode, $('.letters'));

            letterSprings.push(springSystem.createSpring(100, 6));
            letterSprings[letterIndex].addListener({
              onSpringUpdate: function(spring) {
                var springValue = spring.getCurrentValue();
                var oldTranslation = currentSymbolsTranslation;
                var newTranslation = getSymbolsTranslation(letter.symbolWidths, currentSymbolsIndex);
                var containerTranslation = rebound.MathUtil.mapValueInRange(
                                            springValue,
                                            1 - currentSpringBit,
                                            currentSpringBit,
                                            oldTranslation,
                                            newTranslation
                                          );
                letterNode.children[0].style.transform = 'translateX(' + -containerTranslation + 'px)';
                if (spring.isAtRest()) {
                  currentSymbolsTranslation = newTranslation;
                }
              }
            });

            $.style(letterNode, {
              width: letter.symbolWidths[currentSymbolsIndex] + 'px'
            });

            function nextTransition(forcedIndex) {
              if (isPaused) return false;
              var randomSymbolIndex;
              if (forcedIndex === undefined) {
                while (randomSymbolIndex === undefined || randomSymbolIndex === currentSymbolsIndex) {
                  randomSymbolIndex = generateRandomInt(letter.symbols.length - 1);
                }
                currentSymbolsIndex = randomSymbolIndex;
              } else {
                currentSymbolsIndex = forcedIndex;
              }
              currentSpringBit = (currentSpringBit + 1) % 2;
              letterSprings[letterIndex].setEndValue(currentSpringBit);
              $.style(letterNode, {
                width: letter.symbolWidths[currentSymbolsIndex] + 'px'
              });
              currentTimeout = setTimeout(nextTransition, 1000 + Math.random() * 1500);
            }
            $.events(letterNode, {
              lock: function() {
                clearTimeout(currentTimeout);
                nextTransition(0);
              },
              release: function() {
                clearTimeout(currentTimeout);
                nextTransition();
              }
            });
            setTimeout(function() {
              nextTransition();
            }, 2000);
          });

          $.events($('#word'), {
            mouseenter: function() {
              $$('.letter').forEach(function(thisLetter) {
                $.fire(thisLetter, 'lock');
              });
              isPaused = true;
            },
            click: function() {
              if (isPaused) {
                $.fire($('#word'), 'mouseleave');
              }
            },
            mouseleave: function() {
              $$('.letter').forEach(function(thisLetter) {
                isPaused = false;
                $.fire(thisLetter, 'release');
              });
            }
          });
          isPaused = true;
          setTimeout(function() {
            isPaused = false;
            $('#word').className += 'visible';
          }, 500 );
        
        } catch(e) {
          console.log(e)
        } finally {

        }
      }
    },
    mounted() {
      this.rotateLetters()
    }
  }
</script>
