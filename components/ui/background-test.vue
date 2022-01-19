<template>
    <div id="loool" class="fixed mx-auto w-screen h-screen opacity-1 saturate-1  overflow-hidden">
      <div class='canvas-container'>
      </div>

    </div>
</template>
<style lang="postcss">
  .canvas-container {
      height: 100vh;
      width: 100vw;
  }
  #para-1 {
    padding: 100px;
  }

</style>
<script>
import Vue from "vue"
  export default {

    methods: {
      back() {
        let GSAP = Vue.prototype.$gsap;
        // Three.js basic
        let SCENE, CAMERA, RENDERER, CONTROLS, COMPOSER, FOGCOLOR;
        // Three.js add
        let MANAGER = new THREE.LoadingManager();
        let TEXTURE = new THREE.Texture(MANAGER);
        let LISTENER = new THREE.AudioListener();
        let LOADER = new THREE.OBJLoader(MANAGER);
        let AUDIOLOADER = new THREE.AudioLoader(MANAGER);
        // Three.js grp
        let GROUPE1 = new THREE.Group(), GROUPE2 = new THREE.Group(), GROUPE3 = new THREE.Group();
        let BOX1 = new THREE.Group(), BOX2 = new THREE.Group(), BOX3 = new THREE.Group();
        // Three.js light
        // Three.js other
        let TIME = 0;
        main();


        function init() {
            initScene();
            initCamera();
            initRenderer();
            initComposer();
            initControls();
            initEventListeners();
            createObjects();
            document.querySelector('.canvas-container').appendChild(RENDERER.domElement).setAttribute('id','para-1');
        }
        function initScene() {
            SCENE = new THREE.Scene();
            initLights();
            FOGCOLOR = new THREE.Color(0x000000);
            SCENE.fog = new THREE.Fog(FOGCOLOR, 0.0025, 250);
        }

        function initCamera() {
            CAMERA = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
                CAMERA.position.z = 175;
                CAMERA.position.y = 50;
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
              uTex: { value: new THREE.TextureLoader().load(require('~/assets/img/text-map-1.jpg'))}
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
            LOADER.load("obj/godhand.obj", function(godHand) {
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
            LOADER.load('obj/behelit.obj', function(behelit) {
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
                behelit.scale.x = 1
                behelit.scale.y = 1
                behelit.scale.z = 1
                // mesh
                const OBJbehelit = behelit                
                GROUPE2.add( OBJbehelit );

            });
            GROUPE2.add( FIRE );
            GROUPE2.add( BALL );
            GROUPE2.add( PXL );
            //g3
            GROUPE3.add( BOX1 );
            GROUPE3.add( BOX2 );
            GROUPE3.add( BOX3 );
            GROUPE3.add(SOUNDFIRE)
            //b1
            LOADER.load("obj/main-1.obj", function(hand) {
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
            LOADER.load("obj/boite.obj", function(hobbieBox) {
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
            LOADER.load("obj/zombi-1.obj", function(handZombie) {
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
            LOADER.load("obj/zombi-2.obj", function(handZombie2) {
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
            LOADER.load("obj/main-2.obj", function(hand2) {
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
            const LIGHT = new THREE.AmbientLight( 0xFFFFFF, 2 ); // soft white light
                SCENE.add( LIGHT );

            const PNTLIGHT = new THREE.PointLight(0xFFFFFF, 10, 80);
                PNTLIGHT.position.set( 0, 10, 0 );
                GROUPE2.add(PNTLIGHT);

            const SPTLIGHT1 = new THREE.SpotLight( 0xffffff, 10 );
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
            
            const SPTLIGHT2 = new THREE.SpotLight( 0xffffff, 10 );
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

            const SHDCAMHLP = new THREE.CameraHelper( PNTLIGHT.shadow.camera );
              //SCENE.add( SHDCAMHLP );
            const SPTLIGHTHLP = new THREE.SpotLightHelper( SPTLIGHT2 );
                //SCENE.add( SPTLIGHTHLP );

            const PNTLIGHTHLP = new THREE.PointLightHelper(PNTLIGHT);
                //SCENE.add( PNTLIGHTHLP ); 

            const AXESHELPER = new THREE.AxesHelper( 200 );
                //SCENE.add( AXESHELPER );

        }

        function initRenderer() {
            RENDERER = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                //RENDERER.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
                //RENDERER.setSize(window.innerWidth - 200, window.innerHeight - 200);
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
              GSAP.to(GROUPE2.position, {y:'375', z:'0', delay: 10, duration: 10});
              GSAP.to(CAMERA.position, {y:'375', z:'50', delay: 10, duration: 10});
              GSAP.to(BOX1.position, {x:'-50', delay: 10, duration: 5});
              GSAP.to(BOX2.position, {y:'-350', delay: 10, duration: 5});
              GSAP.to(BOX3.position, {x:'50', delay: 10, duration: 5});
              GSAP.to(MOON.position, {y:'400', delay: 10, duration: 10});
              GSAP.to(PNTLIGHT.position, {z:'-50', delay: 15, duration: 5});
            };
            MANAGER.onError = function (e) {
                console.log('Error loading', e);
            };
        }
      }
    },
    mounted() {
      this.back();
    }
  }
</script>
