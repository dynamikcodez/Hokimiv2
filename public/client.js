import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {

    console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};

manager.onLoad = function () {

    console.log('Loading complete!');

};


manager.onProgress = function (url, itemsLoaded, itemsTotal) {

    console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');

};

manager.onError = function (url) {

    console.log('There was an error loading ' + url);

};

const loader = new GLTFLoader(manager);

let object; //reference to loaded object
//show input 
document.getElementById("button").onclick = function () { changeFilter() };
function changeFilter() {
    document.getElementById("imageFile").style.display = 'block';
}
//remove previous object
document.getElementById("check").onclick = function () { checkFile() };
function removeEntity(object) {
    if (scene.remove(object))
        alert("Just removed" + object)
    else
        alert("error")
    animate();
}

function checkFile(result) {
    //Get the file input element by its id 
    var fileInput = document.getElementById('imageFile');
    //Get the file name
    var fileName = fileInput.files[0].name;
    // Regular expression for file extension.
    var patternFileExtension = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    //Get the file Extension 
    var fileExtension = (fileName).match(patternFileExtension);
    // alert(fileExtension);
    if (fileExtension == '.gltf,gtf' || fileExtension == '.glb,glb') {
        //remove old object
        removeEntity(object)
        loader.load(result,
            function (gltf) {
                object = gltf.scene;
                scene.add(gltf.scene);
                alert("Uploaded " + fileName + " succesfully.")
            }, undefined, function (error) {

                console.error(error);
            });
    }


    else
        alert("Sorry, " + fileName + " is invalid");

}
//uploading user file using URL
document.getElementById("imageFile").onchange = function () { previewFile() };
function previewFile() {
    // const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        checkFile(reader.result);
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}



// this method is what loads the 3d chair or whatever object put into the qoutes,
loader.load('threed_objects/SheenChair.glb',
function(gltf){
    // scene.remove(gltf.scene);
    object = gltf.scene;
    scene.add(gltf.scene);
}, undefined, function ( error ) {

        console.error(error);
    });



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
scene.add(ambientLight)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const my_canvas = document.getElementById("canvas")

const renderer = new THREE.WebGLRenderer({ alpha: true, canvas: my_canvas });

const controls = new OrbitControls(camera, renderer.domElement);


// const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);


camera.position.z = 5;

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(1, 1);

document.addEventListener('dblclick', onMouseMove);
function onMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    object.position.set(mouse.x, mouse.y, 0);
}

function animate() {

    requestAnimationFrame(animate);

    slider.step = 0.25
    var x = slider.value
    slider.oninput = function () {
        output.innerHTML = this.value;
        object.scale.set(x, x, x);
    }

    var xSpeed = 0.00001;
    var ySpeed = 0.00001;

    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 38) {
            object.position.y += ySpeed; //up
        } else if (keyCode == 40) {
            object.position.y -= ySpeed; //down
        } else if (keyCode == 37) {
            object.position.x -= xSpeed; //left
        } else if (keyCode == 39) {
            object.position.x += xSpeed; //right
        } else if (keyCode == 32) {
            object.position.set(0, 0, 0);
        }
        //i may need help changing this to finger movements

        controls.update();
        raycaster.setFromCamera(mouse, camera);
        const intersection = raycaster.intersectObject(object);

        if (intersection.length > 0) {

            // const instanceId = intersection[ 0 ].instanceId;
            console.log("Intersect at ...")
        }

    }

    renderer.render(scene, camera);
}

animate();

// var video = document.querySelector("#video_element");
//code for index.html
var video = document.querySelector("#video_element");
navigator.getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (error) {
            alert("Something went wrong \nReload page");
        })
    }
