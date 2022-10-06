import * as THREE from "three";
import images from "./images";

const container = document.querySelector(".three_bg");
const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.ascpect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const geometry = new THREE.PlaneGeometry(18, 10, 15, 9);
const material = new THREE.MeshBasicMaterial({
  // map: loader.load(images.bg1),
  map: loader.load(
    // "https://images.pexels.com/photos/3109671/pexels-photo-3109671.jpeg?cs=srgb&dl=pexels-furknsaglam-3109671.jpg&fm=jpg"
    "https://mobimg.b-cdn.net/v3/fetch/ff/ff6242ef8b1168f65a279b18fbfe7047.jpeg"
  ),
  // map: loader.load(
  //   "https://media.istockphoto.com/photos/abstract-background-wallpaper-picture-id952039286?b=1&k=20&m=952039286&s=612x612&w=0&h=ABfZG_2qbK3D5MaUa6QuBCTm1zrhceEkDrZrY1bvrlI="
  // ),
  // wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
camera.position.z = 5;

const count = geometry.attributes.position.count;
const clock = new THREE.Clock();

function animate() {
  const time = clock.getElapsedTime();
  for (let i = 0; i < count; i++) {
    const x = geometry.attributes.position.getX(i);
    const y = geometry.attributes.position.getY(i);

    const anim1 = 0.75 * Math.sin(x * 2 + time * 0.7);
    const anim2 = 0.25 * Math.cos(x + time);
    const anim3 = 0.3 * Math.tanh(y * 20 + time * 0.7);

    geometry.attributes.position.setZ(i, anim2);
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
  }
  requestAnimationFrame(animate);
  // mesh.rotation.x += 0.015;
  // mesh.rotation.y += 0.015;
  renderer.render(scene, camera);
}

animate();
