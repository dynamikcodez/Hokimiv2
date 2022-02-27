import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
// commented out because we are just dealing with gltf 3d objects
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onLoad = function ( ) {

	console.log( 'Loading complete!');

};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onError = function ( url ) {

	console.log( 'There was an error loading ' + url );

};

const loader = new GLTFLoader(manager);

let object;
// this method is what loads the 3d chair or whatever object put into the qoutes,
loader.load('threed_objects/SheenChair.glb',
function(gltf){
    object = gltf.scene;
    scene.add(gltf.scene);
}, undefined, function ( error ) {

	console.error( error );

} );


window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        animate();
    },
    false
)

const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
scene.add( ambientLight)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const my_canvas = document.getElementById("canvas")

const renderer = new THREE.WebGLRenderer({alpha:true, canvas:my_canvas});

const controls = new OrbitControls( camera, renderer.domElement );


// const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);


camera.position.z = 5;

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2( 1, 1 );

document.addEventListener( 'dblclick', onMouseMove );
function onMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    object.position.set(mouse.x, mouse.y, 0);
}

function animate() {
    
    requestAnimationFrame( animate);

    slider.step = 0.25
    var x = slider.value
slider.oninput = function() {
//   output.innerHTML = this.value;
object.scale.set(x,x,x); // sets the size/depth of the object to slider value
}

var xSpeed = 0.00001;
var ySpeed = 0.00001;



    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
// 	    keyboard controls to move object around(W(up)A(left)S(down)D(right))
        var keyCode = event.which;
        if (keyCode == 87) {
            object.position.y += ySpeed;
        } else if (keyCode == 83) {
            object.position.y -= ySpeed;
        } else if (keyCode == 65) {
            object.position.x -= xSpeed;
        } else if (keyCode == 68) {
            object.position.x += xSpeed;
        } else if (keyCode == 32) {
            object.position.set(0, 0, 0);
        }
        //i may need help changing this to finger movements

   controls.update();
raycaster.setFromCamera( mouse, camera );
const intersection = raycaster.intersectObject( object );

				if ( intersection.length > 0 ) {

					// const instanceId = intersection[ 0 ].instanceId;
                    console.log("Intersect at ...")
                }
    
}

renderer.render(scene, camera);
}

animate();
