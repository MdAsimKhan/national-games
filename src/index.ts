import * as THREE from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
import "./style.css";

// const faceMeshTexturePath = new URL("./faceMeshTemplate.png", import.meta.url).href;

// ZapparThree provides a LoadingManager that shows a progress bar while
// the assets are downloaded
const manager = new ZapparThree.LoadingManager();

// Setup ThreeJS in the usual way
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(render);

// Setup a Zappar camera instead of one of ThreeJS's cameras
const camera = new ZapparThree.Camera();

// The Zappar library needs your WebGL context, so pass it
ZapparThree.glContextSet(renderer.getContext());

// Create a ThreeJS Scene and set its background to be the camera background texture
const scene = new THREE.Scene();
scene.background = camera.backgroundTexture;
console.log(scene);
// Request the necessary permission from the user
ZapparThree.permissionRequestUI().then((granted) => {
    if (granted) camera.start(true); // For face tracking let's use the user-facing camera
    else ZapparThree.permissionDeniedUI();
});

// Set up our image tracker group
// Pass our loading manager in to ensure the progress bar works correctly
// const tracker = new ZapparThree.FaceTrackerLoader(manager).load();
// const trackerGroup = new ZapparThree.FaceAnchorGroup(camera, tracker);
// scene.add(trackerGroup);

// Add some content
const topimgpath = new URL("./fire1.png", import.meta.url).href;
const bottomimgpath = new URL("./logo.png", import.meta.url).href;

const loader = new THREE.TextureLoader(manager);

const texture = loader.load(topimgpath); // Replace with the path to your image
const fire = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true })
);
fire.scale.set(.5, .5, .4);
fire.position.set(0, 0.3, -1);
scene.add(fire);
console.log(fire);

const bottom = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(),
    new THREE.MeshBasicMaterial({ map: loader.load(bottomimgpath), transparent: true })
);
bottom.scale.set(.5, .35, .2);
bottom.position.set(0, -0.36, -1);
console.log(bottom);
scene.add(bottom);

// Face mesh
// Pass our loading manager in to ensure the progress bar works correctly
// const faceMesh = new ZapparThree.FaceMeshLoader(manager).load();
// const faceBufferGeometry = new ZapparThree.FaceBufferGeometry(faceMesh);
// const faceMeshObject = new THREE.Mesh(
//     faceBufferGeometry,
//     new THREE.MeshStandardMaterial({
//         map: new THREE.TextureLoader(manager).load(faceMeshTexturePath),
//         transparent: true
//     })
// );
// trackerGroup.add(faceMeshObject);


// Set up our render loop
function render() {
    camera.updateFrame(renderer);
    // faceBufferGeometry.updateFromFaceAnchorGroup(trackerGroup);
    renderer.render(scene, camera);
}
