import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

class BasicWorldDemo {
    constructor() {
        this._Initialize();
    }

    _Initialize() {
        this._threejs = new THREE.WebGLRenderer();
        this._threejs.shadowMap.enabled = true;
        this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
        this._threejs.setPixelRatio(window.devicePixelRatio);
        this._threejs.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this._threejs.domElement);

        window.addEventListener(
            'resize',
            () => {
                this._OnWindowResize();
            },
            false
        );

        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1.0;
        const far = 1000.0;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(75, 20, 0);

        this._scene = new THREE.Scene();

        let light = new THREE.DirectionalLight(0xffffff);
        light.position.set(100, 100, 100);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.01;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 1.0;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 200.0;
        light.shadow.camera.right = -200.0;
        light.shadow.camera.top = 200.0;
        light.shadow.camera.bottom = -200.0;
        this._scene.add(light);

        light = new THREE.AmbientLight(0x404040);
        this._scene.add(light);

        const controls = new OrbitControls(this._camera, this._threejs.domElement);
        controls.target.set(0, 0, 0);
        controls.update();

        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            'textures/skybox/front.png',
            'textures/skybox/back.png',
            'textures/skybox/top.png',
            'textures/skybox/bottom.png',
            'textures/skybox/right.png',
            'textures/skybox/left.png',
        ]);
        this._scene.background = texture;

        // Request Animation Frame - this is the game loop
        this._RAF();
    }

    _OnWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._threejs.setSize(window.innerWidth, window.innerHeight);
    }

    _RAF() {
        requestAnimationFrame(() => {
            this._threejs.render(this._scene, this._camera);
            this._RAF();
        });
    }
}

const init = new BasicWorldDemo();

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(-10, 70, 100);
// camera.lookAt(0, 0, 0);

// const scene = new THREE.Scene();

// const ambientLight = new THREE.AmbientLight(0x404040, 6);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// scene.add(directionalLight);

// // Instantiate a glTF loader
// // Note that GLTF files are basically just JSON files which seems to house info to help the loader find the binaries, textures, etc
// const loader = new GLTFLoader();

// // Root path for the loader to start all of its resource searches from
// loader.load(
//     'models/sci-fi/scene.gltf',
//     function (gltf) {
//         console.log('GLTF file loaded!');
//         console.log(gltf);
//         scene.add(gltf.scene);
//     },
//     function (xhr) {
//         console.log('xhr load progress callback: %d', (xhr.loaded / xhr.total) * 100);
//     },
//     function (error) {
//         console.log('Error loading GLB file:', error);
//     }
// );

// function animate() {
//     renderer.render(scene, camera);
// }

// renderer.setAnimationLoop(animate);
