<template>
    <div id="lool" class="fixed mx-auto w-[300px] h-[300px] -translate-y-2/4 top-2/4 left-2/4 opacity-0 -translate-x-2/4 saturate-0  overflow-hidden">
      <div class='lol'>
        <div class='lool'></div>
      </div>
      <div class='canvas-container'></div>
    </div>
</template>
<style lang="postcss">
  .canvas-container {
      height: 100%;
      width: 100%;
  }
  .lol {
    width: 100%;
    height: 20px;
    background: #000;
  }
  .lool  {
    width: 100%;
    height: 20px;
    background: red;
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
        // Three.js basic
        let SCENE, CAMERA, RENDERER, CONTROLS, COMPOSER;
        // Three.js add
        let MANAGER = new THREE.LoadingManager();
        let TEXTURE = new THREE.Texture(MANAGER);
        let LISTENER = new THREE.AudioListener();
        let LOADER = new THREE.OBJLoader(MANAGER);
        let AUDIOLOADER = new THREE.AudioLoader(MANAGER);
        // Three.js grp
        let GROUPE1 = new THREE.Group(), GROUPE2 = new THREE.Group(), GROUPE3 = new THREE.Group();
        let BOX1 = new THREE.Group(), BOX2 = new THREE.Group(), BOX3 = new THREE.Group();

        // Three.js other
        let TIME = 0;

        main();

        function main() {
            var progress = document.querySelector('.lol');
            var progressBar = document.querySelector('.lool');
            
            init();
            
            MANAGER.onStart = function () {
              console.log('Loading started');
            };
            MANAGER.onProgress = function ( item, loaded, total ) {
              progressBar.style.width = (loaded / total * 100) + '%';
              console.log((loaded / total * 100) + '%');
            };
            MANAGER.onLoad = function () {
              console.log('Loading finish');
              animate();
              //tween animate
              function tweenPXLPos(){
                new TWEEN.Tween(GROUPE2.position).to({ y: "375", z:"0"}, 10000).delay(5000).start();
                new TWEEN.Tween(CAMERA.position).to({y: "375", z: "175" }, 10000).delay(5000).start();
                new TWEEN.Tween(BOX1.position).to({ x: "-50"}, 5000).delay(0).start();
                new TWEEN.Tween(BOX2.position).to({ y: "-50"}, 5000).delay(0).start();
                new TWEEN.Tween(BOX3.position).to({ x: "50"}, 5000).delay(0).start();
              }
              tweenPXLPos();
            };
            MANAGER.onError = function (e) {
                console.log('Error loading', e);
            };
        }
        function init() {
            initScene();
            initCamera();
            initRenderer();
            initComposer();
            initControls();
            initEventListeners();
            createObjects();
            document.querySelector('.canvas-container').appendChild(RENDERER.domElement);
        }
        function initScene() {
            SCENE = new THREE.Scene();
            initLights();
            FOGCOLOR = new THREE.Color(0x000000);
            //SCENE.fog = new THREE.Fog(FOGCOLOR, 0.0025, 250);
        }

        function initCamera() {
            CAMERA = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
                CAMERA.add( LISTENER );
        }

        function createObjects() {
            // geometry
            const BULLEGEOMETRY = new THREE.IcosahedronGeometry(4, 4);
            const MOONGEOMETRY = new THREE.CircleGeometry(200, 200);
            const MOON2GEOMETRY = new THREE.CircleGeometry(205, 205);
            const BALLGEOMETRY = new THREE.IcosahedronGeometry(10, 40);
            const PXLGEOMETRY = new THREE.BoxGeometry(2, 2, 2);
            const FIREGEOMETRY = new THREE.SphereGeometry(8, 10, 10);
            // shader
            const uniforms = {
              uTime: { value: 0.0 },
              uMouse: { value:{ x:0.0, y:0.0 }},
              uResolution: { value:{ x:0, y:0 }},
              uTex: { value: new THREE.TextureLoader().load("https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/img/text-map-1.jpg")}
            }
            const uniformse = {
              uTime: { value: 0.0 },
              uMouse: { value:{ x:0.0, y:0.0 }},
              uResolution: { value:{ x:0, y:0 }},
              uTex: { value: new THREE.TextureLoader().load("https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/img/text-map-1.jpg")}
            }
            // material
            const BALL2MATERIAL = new THREE.ShaderMaterial( {
              transparent: true, 
              opacity: 0,
              side: THREE.BackSide,
              uniforms: uniforms,
              vertexShader:   document.getElementById('bulle-vertex-shader').textContent,
              fragmentShader: document.getElementById('bulle-fragment-shader').textContent
            } );
            const BALLMATERIAL = new THREE.MeshLambertMaterial({
              color: 0xFFFFFF,
            });
            const PXLMATERIAL = new THREE.MeshLambertMaterial({
              color: 0xFFFFFF,
              side: THREE.BackSide
            });
            const BULLEMATERIAL = new THREE.MeshLambertMaterial({
              color: 0xFFFFFF,
              side: THREE.FrontSide
            });
            const FIREMATERIAL = new THREE.ShaderMaterial({
                uniforms: { uTime: { value: TIME } },
                transparent: true, 
                opacity: 0,
                side: THREE.BackSide,
                vertexShader:   document.getElementById('sphere-vertex-shader').textContent,
                fragmentShader: document.getElementById('sphere-fragment-shader').textContent
            });
            const HANDMATERIAL = new THREE.MeshToonMaterial({
              color: 0x050505,
            });
            const HAND2MATERIAL = new THREE.ShaderMaterial( {
              uniforms: uniformse,
              vertexShader:   document.getElementById('bulle-vertex-shader').textContent,
              fragmentShader: document.getElementById('bulle-fragment-shader').textContent
            } );
            const ZOMBIEMATERIAL = new THREE.MeshToonMaterial({
              color: 0x050505,
            });
            // audio
            const SOUNDFIRE = new THREE.PositionalAudio(LISTENER);
            const SOUNDPXL = new THREE.PositionalAudio(LISTENER);
            // mesh
            const MOON = new THREE.Mesh(MOONGEOMETRY, ZOMBIEMATERIAL);
            const MOON2 = new THREE.Mesh(MOON2GEOMETRY, BULLEMATERIAL);
            const BULLE = new THREE.Mesh(BULLEGEOMETRY, BULLEMATERIAL);
            const BULLE2 = new THREE.Mesh(BULLEGEOMETRY, BULLEMATERIAL);
            const BALL = new THREE.Mesh(BALLGEOMETRY, BALL2MATERIAL);
            const PXL = new THREE.Mesh(PXLGEOMETRY, PXLMATERIAL);
            const FIRE = new THREE.Mesh(FIREGEOMETRY, FIREMATERIAL);
            // position
            PXL.position.y = 0;
            MOON.position.z = -159;
            MOON.position.y = 800;
            MOONmoove = new TWEEN.Tween(MOON.position).to({ y: "400"}, 10000).delay(10000);
            MOONmoove.start();
            MOON2.position.z = -160;
            MOON2.position.y = 400;
            BULLE.position.x = -50;
            BULLE2.position.x = 50;
            // shadow
            MOON.receiveShadow = true;
            MOON2.receiveShadow = true;
            BALL.castShadow = false;
            BALL.receiveShadow = false;
            PXL.castShadow = false;
            PXL.receiveShadow = false;
            BALL.flatShading = true;
            // loader : audio
            AUDIOLOADER.load( 'https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/ui/1.ogg', function( buffer ) {
                SOUNDPXL.setBuffer( buffer );
                SOUNDPXL.setLoop( true );
                SOUNDPXL.setVolume( 0.5 );
                SOUNDPXL.setRefDistance( 10 );
                SOUNDPXL.play();
            });
            AUDIOLOADER.load( 'https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/ui/4.ogg', function( buffer ) {
                SOUNDFIRE.setBuffer( buffer );
                SOUNDFIRE.setLoop( true );
                SOUNDFIRE.setVolume( 0.5 );
                SOUNDFIRE.setRefDistance( 1 );
                SOUNDFIRE.play();
            });
            // loader : obj
            //g1
            LOADER.load("https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/obj/godhand.obj", function(godHand) {
              godHand.traverse(function(child) {
                  if (child instanceof THREE.Mesh) {
                    child.material = HANDMATERIAL;
                    HANDMATERIAL.side = THREE.FrontSide;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.flatShading = true;
                  }
                });
                // taille, position et placement
                godHand.position.set(0, 400, -80);
                godHand.rotation.x = - 0.90;
                godHand.rotation.y = 0;
                godHand.rotation.z = 0;
                godHand.scale.x = 8
                godHand.scale.y = 8
                godHand.scale.z = 8
                // mesh
                const OBJgodhand = godHand
                // scene
                GROUPE1.add(OBJgodhand);
            });
            GROUPE1.add( MOON );
            GROUPE1.add( MOON2 );
            GROUPE1.add(SOUNDPXL);
            //g2
            LOADER.load("https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/obj/behelit.obj", function(behelit) {
                behelit.traverse(function(child) {
                  if (child instanceof THREE.Mesh) {
                    child.material = ZOMBIEMATERIAL;
                    ZOMBIEMATERIAL.side = THREE.DoubleSide;
                    child.castShadow = true;
                    child.receiveShadow = true;
                  }
                });
                
                // taille, position et placement
                behelit.position.set(0, 0, 0);
                behelit.rotation.x = - Math.PI / 2;
                behelit.scale.x = 20
                behelit.scale.y = 20
                behelit.scale.z = 20
                // mesh
                const OBJbehelit = behelit
                const tweenBehelitRotate = new TWEEN.Tween(OBJbehelit.rotation).to({ z: "-" + Math.PI/2}, 5000).onComplete(function() {
                    if (Math.abs(behelit.rotation.z)>=2*Math.PI) {
                        behelit.rotation.y = behelit.rotation.z % (2*Math.PI);
                    }
                });
                tweenBehelitRotate.start();
                tweenBehelitRotate.repeat(Infinity)
                
                GROUPE2.add( OBJbehelit );

            });
            GROUPE2.add( FIRE );
            GROUPE2.add( BALL );
            new TWEEN.Tween(BALL.scale).to({ z: "2", y:"0", x:"0"}, 10).delay(15000).start();
            GROUPE2.add( PXL );
            //g3
            GROUPE3.add( BOX1 );
            GROUPE3.add( BOX2 );
            GROUPE3.add( BOX3 );
            GROUPE3.add(SOUNDFIRE)
            //b1
            LOADER.load("https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/obj/main-1.obj", function(hand) {
              hand.traverse(function(child) {
                  if (child instanceof THREE.Mesh) {
                    child.material = HANDMATERIAL;
                    HANDMATERIAL.side = THREE.DoubleSide;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.flatShading = true;
                  }
                });
                // taille, position et placement
                hand.position.set(-50, -75, 0);
                hand.rotation.x = - Math.PI / 2;
                hand.rotation.y = 0;
                hand.rotation.z = - Math.PI / 2;
                hand.scale.x = 6
                hand.scale.y = 6
                hand.scale.z = 6
                // mesh
                const OBJhand = hand
                // scene
                BOX1.add(OBJhand);
            }); 
            BOX1.add(BULLE);
            //b2
            LOADER.load("https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/obj/boite.obj", function(hobbieBox) {
                hobbieBox.traverse(function(child) {
                  if (child instanceof THREE.Mesh) {
                    child.material = HANDMATERIAL;
                    HANDMATERIAL.side = THREE.FrontSide;
                    child.castShadow = true;
                    child.receiveShadow = true;
                  }
                });
                // taille, position et placement
                hobbieBox.position.set(-1, -17, -11);
                hobbieBox.rotation.x = Math.PI / 2;
                hobbieBox.rotation.y = Math.PI / 1;
                hobbieBox.rotation.z = 0;
                hobbieBox.scale.x = 1.40;
                hobbieBox.scale.y = 1.40;
                hobbieBox.scale.z = 1.40;
                // mesh
                const OBJbox = hobbieBox
                BOX2.add(OBJbox);
            });
            LOADER.load("https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/obj/zombi-1.obj", function(handZombie) {
              handZombie.traverse(function(child) {
                  if (child instanceof THREE.Mesh) {
                    child.material = HANDMATERIAL;
                    HANDMATERIAL.side = THREE.FrontSide;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.flatShading = true;
                  }
                });
                // taille, position et placement
                handZombie.position.set(-3, -15, 0);
                handZombie.rotation.x = - Math.PI / 2;
                handZombie.rotation.y = 0;
                handZombie.rotation.z = - Math.PI / 2;
                handZombie.scale.x = 0.6
                handZombie.scale.y = 0.6
                handZombie.scale.z = 0.6
                // mesh
                const OBJzombie = handZombie
                // scene
                BOX2.add(OBJzombie);

            });
            LOADER.load("https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/obj/zombi-2.obj", function(handZombie2) {
              handZombie2.traverse(function(child) {
                  if (child instanceof THREE.Mesh) {
                    child.material = HANDMATERIAL;
                    HANDMATERIAL.side = THREE.FrontSide;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.flatShading = true;
                  }
                });
                // taille, position et placement
                handZombie2.position.set(-12, -15, 0);
                handZombie2.rotation.x = -Math.PI / 2;
                handZombie2.rotation.y = 0;
                handZombie2.rotation.z =  Math.PI / 2;
                handZombie2.scale.x = 0.6
                handZombie2.scale.y = 0.6
                handZombie2.scale.z = 0.6
                // mesh
                const OBJzombie2 = handZombie2
                // scene
                BOX2.add(OBJzombie2);
            });
            //b3
            LOADER.load("https://cdn.jsdelivr.net/gh/PuxianAlHazred/PIKSL@main/assets/obj/main-2.obj", function(hand2) {
              hand2.traverse(function(child) {
                  if (child instanceof THREE.Mesh) {
                    child.material = HANDMATERIAL;
                    HANDMATERIAL.side = THREE.DoubleSide;
                    child.castShadow = true;
                    child.receiveShadow = true;
                    child.material.flatShading = true;
                  }
                });
                // taille, position et placement
                hand2.position.set(50, -75, 0);
                hand2.rotation.x = - Math.PI / 2;
                hand2.rotation.y = 0;
                hand2.rotation.z = - Math.PI / 2;
                hand2.scale.x = 6
                hand2.scale.y = 6
                hand2.scale.z = 6
                // mesh
                const OBJhand2 = hand2
                // scene
                BOX3.add(OBJhand2);
            }); 
            BOX3.add(BULLE2);
            // scene
            SCENE.add(GROUPE1);
            SCENE.add(GROUPE2);
            SCENE.add(GROUPE3);

        }


        function initLights() {   
            LIGHT = new THREE.AmbientLight( 0xFFFFFF, 2 ); // soft white light
                SCENE.add( LIGHT );

            PNTLIGHT = new THREE.PointLight(0xFFFFFF, 10, 80);
                PNTLIGHT.position.set( 0, 5, 0 );
                PNTLIGHTmoove = new TWEEN.Tween(PNTLIGHT.position).to({ z: "-50"}, 5000).delay(15000);
                PNTLIGHTmoove.start();
                GROUPE2.add(PNTLIGHT);
            PNTLIGHTHLP = new THREE.PointLightHelper(PNTLIGHT);
                SCENE.add( PNTLIGHTHLP ); 

            SPTLIGHT1 = new THREE.SpotLight( 0xffffff, 10 );
                SPTLIGHT1.position.set( -50, 0, 0 );
                SPTLIGHT1.angle = Math.PI / 3;
                SPTLIGHT1.castShadow = true;
                SPTLIGHT1.distance = 30;
                SPTLIGHT1.shadow.mapSize.width = 1024;
                SPTLIGHT1.shadow.mapSize.height = 1024;
                SPTLIGHT1.shadow.camera.near = 500;
                SPTLIGHT1.shadow.camera.far = 4000;
                SPTLIGHT1.shadow.camera.fov = 30;
                BOX1.add( SPTLIGHT1 );
            
            SPTLIGHT2 = new THREE.SpotLight( 0xffffff, 10 );
                SPTLIGHT2.position.set( 50, 0, 0 );
                SPTLIGHT2.angle = Math.PI / 3;
                SPTLIGHT2.castShadow = true;
                SPTLIGHT2.distance = 30;
                SPTLIGHT2.shadow.mapSize.width = 1024;
                SPTLIGHT2.shadow.mapSize.height = 1024;
                SPTLIGHT2.shadow.camera.near = 500;
                SPTLIGHT2.shadow.camera.far = 4000;
                SPTLIGHT2.shadow.camera.fov = 30;
                BOX3.add( SPTLIGHT2 );

            SHDCAMHLP = new THREE.CameraHelper( PNTLIGHT.shadow.camera );
              //SCENE.add( SHDCAMHLP );
            SPTLIGHTHLP = new THREE.SpotLightHelper( SPTLIGHT2 );
                //SCENE.add( SPTLIGHTHLP );

            AXESHELPER = new THREE.AxesHelper( 200 );
                SCENE.add( AXESHELPER );
        }

        function initRenderer() {
            RENDERER = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                RENDERER.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
                RENDERER.setSize(window.innerWidth, window.innerHeight);
                RENDERER.shadowMap.enabled = true;
                RENDERER.shadowMapSort = true;
                RENDERER.shadowMap.type = THREE.PCFSoftShadowMap;
                RENDERER.setClearColor(0x000000, 1);
        }
        function initComposer() {
            COMPOSER = new THREE.EffectComposer(RENDERER);
                COMPOSER.setSize(window.innerWidth, window.innerHeight);

                const renderPass = new THREE.RenderPass(SCENE, CAMERA);
                    COMPOSER.addPass(renderPass);
            
                const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.8, 0.1);
                    bloomPass.renderToScreen = true;
                    //COMPOSER.addPass(bloomPass);
                  
                var effectFilm = new THREE.FilmPass( .35, 0.125, 1024, true );
                var effectFilm = new THREE.FilmPass( .35, 0.125, 2048, true );
                    effectFilm.renderToScreen = true;
                    //COMPOSER.addPass(effectFilm); 
                
                var rgbSplit = new THREE.ShaderPass(THREE.RGBShiftShader);
                    rgbSplit.uniforms["amount"].value = 0.0;
                    rgbSplit.renderToScreen = true;
                    COMPOSER.addPass(rgbSplit);
                    setInterval(animeIn,10000); 
                    function animeIn() { setTimeout(animeOne,700); }; 
                    function animeOne(){
                        rgbSplit.uniforms["amount"].value  = 0.01 ;
                        setTimeout(animeTwo,100); 
                    }
                    function animeTwo(){
                        rgbSplit.uniforms["amount"].value  = 0.003 ;
                        setTimeout(animeThree,100); 
                    }
                    function animeThree(){
                        rgbSplit.uniforms["amount"].value  = 0.05 ;
                        setTimeout(animeOut,100); 
                    }
                    function animeOut() {
                        rgbSplit.uniforms["amount"].value = 0.0;
                    };   
        }
        function initControls() {
            CONTROLS = new THREE.OrbitControls(CAMERA, RENDERER.domElement);
                CONTROLS.enableZoom = true;
                CONTROLS.update();
        }
        function initEventListeners() {
            window.addEventListener('resize', onWindowResize);
            onWindowResize();
        }
        function onWindowResize() {
            CAMERA.aspect = window.innerWidth / window.innerHeight;
            CAMERA.updateProjectionMatrix();
            RENDERER.setSize(window.innerWidth, window.innerHeight);
            COMPOSER.setSize(window.innerWidth, window.innerHeight);
        }

        function animate() {
            requestAnimationFrame(animate);
            CONTROLS.update();
            TWEEN.update();
            updateUniforms();
            render();
        }
        function updateUniforms() {
            TIME += 0.005;
            SCENE.traverse(function(child) {
                CAMERA.lookAt( GROUPE2.position );        
                if (child instanceof THREE.Mesh && child.material.type === 'ShaderMaterial') {
                    child.material.uniforms.uTime.value = TIME;
                    child.material.needsUpdate = true;
                }
            });
        }
        function render() {
            //CAMERA.lookAt( SCENE.position );
            COMPOSER.render(1);
        }
      }
    },
    mounted() {
      this.appear();
      this.back();
    }
  }
</script>
