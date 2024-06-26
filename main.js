import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-10, 70, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0x404040, 6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
scene.add(directionalLight);

// Instantiate a glTF loader
// Note that GLTF files are basically just JSON files which seems to house info to help the loader find the binaries, textures, etc
const loader = new GLTFLoader();

// Root path for the loader to start all of its resource searches from
loader.load(
    'models/sci-fi/scene.gltf',
    function (gltf) {
        console.log('GLTF file loaded!');
        console.log(gltf);
        scene.add(gltf.scene);
    },
    function (xhr) {
        console.log('xhr load progress callback: %d', (xhr.loaded / xhr.total) * 100);
    },
    function (error) {
        console.log('Error loading GLB file:', error);
    }
);

function animate() {
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
