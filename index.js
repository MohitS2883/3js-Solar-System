import * as THREE from 'three'
import { OrbitControls } from "jsm/controls/OrbitControls.js"
import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js"
import { getPlanetSpeeds } from './src/getPlanetSpeeds.js';


let w = window.innerWidth
let h = window.innerHeight
const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(w,h)
document.body.appendChild(renderer.domElement)
const fov = 75
const aspect = w/h
const near = 0.1
const far = 1000
const camera = new THREE.PerspectiveCamera(fov,aspect,near,far)
camera.position.z = 8
const detail = 12
const loader = new THREE.TextureLoader()
const scene = new THREE.Scene()
const earthRadius = 0.1

const sun = new THREE.Group()
scene.add(sun)
const sungeo = new THREE.IcosahedronGeometry(1,detail)
const sunmat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/8k_sun.jpg")
})
const sunMesh = new THREE.Mesh(sungeo,sunmat)
sun.add(sunMesh)
const sunfresnel = getFresnelMat({ rimHex: 0xff0000, facingHex: 0xffffff });
const sunglowMesh = new THREE.Mesh(sungeo,sunfresnel)
sunglowMesh.scale.setScalar(1.01)
sun.add(sunglowMesh)

const mergroup = new THREE.Group()
mergroup.rotation.z = 0.034 * (Math.PI /180)
scene.add(mergroup)
const mergeo = new THREE.IcosahedronGeometry(earthRadius * 0.38,detail)
const mermat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/8k_mercury.jpg")
})
const mermesh = new THREE.Mesh(mergeo,mermat)
mermesh.position.set(0, 0, 1.5); 
mergroup.add(mermesh)

const venusgroup = new THREE.Group()
venusgroup.rotation.z = -177.4 * (Math.PI /180)
scene.add(venusgroup)
const vengeo = new THREE.IcosahedronGeometry(earthRadius * 0.95,detail)
const venmat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/8k_venus_surface.jpg")
})
const venmesh = new THREE.Mesh(vengeo,venmat)
venmesh.position.set(0, 0, 2); 
venusgroup.add(venmesh)
const venusatMat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/4k_venus_atmosphere.jpg"),
    blending:THREE.AdditiveBlending,
    transparent:true,
    opacity:0.8,
})
const venusAt = new THREE.Mesh(vengeo,venusatMat)
venusAt.scale.setScalar(1.01)
venusAt.position.copy(venmesh.position)
venusgroup.add(venusAt)

const marsgroup = new THREE.Group()
marsgroup.rotation.z = 25.2 * (Math.PI /180)
scene.add(marsgroup)
const marsgeo = new THREE.IcosahedronGeometry(earthRadius * 0.95,detail)
const marsmat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/8k_mars.jpg")
})
const marsmesh = new THREE.Mesh(marsgeo,marsmat)
marsmesh.position.set(0, 0, 3); 
marsgroup.add(marsmesh)

const jupitergroup = new THREE.Group()
jupitergroup.rotation.z = 3.1 * (Math.PI /180)
scene.add(jupitergroup)
const jupitergeo = new THREE.IcosahedronGeometry(earthRadius * 0.95,detail)
const jupitermat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/8k_jupiter.jpg")
})
const jupitermesh = new THREE.Mesh(jupitergeo,jupitermat)
jupitermesh.position.set(0, 0, 3.5); 
jupitergroup.add(jupitermesh)

const saturngroup = new THREE.Group()
saturngroup.rotation.z = 26.7 * (Math.PI /180)
scene.add(saturngroup)
const satgeo = new THREE.IcosahedronGeometry(earthRadius * 0.95,detail)
const satmat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/8k_saturn.jpg") // change this
})
const satmesh = new THREE.Mesh(satgeo,satmat)
satmesh.position.set(0, 0, 4); 
saturngroup.add(satmesh)

const uranusgroup = new THREE.Group()
uranusgroup.rotation.z = 97.8 * (Math.PI /180)
scene.add(uranusgroup)
const uranusgeo = new THREE.IcosahedronGeometry(earthRadius * 0.95,detail)
const uranusmat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/2k_uranus.jpg")
})
const uranusmesh = new THREE.Mesh(uranusgeo,uranusmat)
uranusmesh.position.set(0, 0, 4.5); 
uranusgroup.add(uranusmesh)

const neptunegroup = new THREE.Group()
neptunegroup.rotation.z = 28.3 * (Math.PI /180)
scene.add(neptunegroup)
const neptgeo = new THREE.IcosahedronGeometry(earthRadius * 0.95,detail)
const neptmat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/2k_neptune.jpg")
})
const neptmesh = new THREE.Mesh(neptgeo,neptmat)
neptmesh.position.set(0, 0, 5); 
neptunegroup.add(neptmesh)



const earthGroup = new THREE.Group()
earthGroup.rotation.z = -23.4 * Math.PI / 180
scene.add(earthGroup)
const controls = new OrbitControls(camera,renderer.domElement)

const geo = new THREE.IcosahedronGeometry(earthRadius,detail)
const mat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/00_earthmap1k.jpg")
})
const earthMesh = new THREE.Mesh(geo,mat)
earthMesh.position.set(0, 0, 2.5); 
earthGroup.add(earthMesh)

const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/earthlights1k.jpg"),
    blending: THREE.AdditiveBlending,
})
const lightsMesh = new THREE.Mesh(geo,lightsMat)
lightsMesh.position.copy(earthMesh.position)
earthGroup.add(lightsMesh)

const cloudsMat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/05_earthcloudmaptrans.jpg"),
    blending:THREE.AdditiveBlending,
    transparent:true,
    opacity:0.8,
})
const cloudsMesh = new THREE.Mesh(geo,cloudsMat)
cloudsMesh.scale.setScalar(1.01)
cloudsMesh.position.copy(earthMesh.position)
earthGroup.add(cloudsMesh)

const frenselMat = getFresnelMat()
const glowMesh = new THREE.Mesh(geo,frenselMat)
glowMesh.scale.setScalar(1.01)
glowMesh.position.copy(earthMesh.position)
earthGroup.add(glowMesh)

const stars = getStarfield({numStars:20000})
scene.add(stars)


const sunLight = new THREE.DirectionalLight(0xffffff)
sunLight.position.set(-2,0.5,1.5)
scene.add(sunLight)

const sunLight2 = new THREE.DirectionalLight(0xffffff)
sunLight2.position.set(2,0.5,1.5)
scene.add(sunLight2)

const sunLight3 = new THREE.DirectionalLight(0xffffff);
sunLight3.position.set(0, -1, 2)
scene.add(sunLight3)

const sunLight4 = new THREE.DirectionalLight(0xffffff)
sunLight4.position.set(0, 1, -2)
scene.add(sunLight4)



const mercurySpeeds = getPlanetSpeeds(58.6, 88, 0.39);
const venusSpeeds = getPlanetSpeeds(243, 225, 0.72);
const earthSpeeds = getPlanetSpeeds(1, 365.25, 1.00);
const marsSpeeds = getPlanetSpeeds(1.03, 687, 1.52);
const jupiterSpeeds = getPlanetSpeeds(0.41, 4333, 5.20);
const saturnSpeeds = getPlanetSpeeds(0.45, 10759, 9.58);
const uranusSpeeds = getPlanetSpeeds(0.72, 30687, 19.22);
const neptuneSpeeds = getPlanetSpeeds(0.67, 60190, 30.05);


function animate(t = 0){
    requestAnimationFrame(animate)
    mergroup.rotation.y += mercurySpeeds.revolutionSpeed;
    mermesh.rotation.y += mercurySpeeds.rotationSpeed;

    venusgroup.rotation.y += venusSpeeds.revolutionSpeed;
    venmesh.rotation.y += venusSpeeds.rotationSpeed;
    venusAt.rotation.y += venusSpeeds.rotationSpeed;

    earthGroup.rotation.y += earthSpeeds.revolutionSpeed;
    earthMesh.rotation.y += earthSpeeds.rotationSpeed;
    lightsMesh.rotation.y += earthSpeeds.rotationSpeed;
    cloudsMesh.rotation.y += earthSpeeds.rotationSpeed;
    glowMesh.rotation.y += earthSpeeds.rotationSpeed;

    marsgroup.rotation.y += marsSpeeds.revolutionSpeed;
    marsmesh.rotation.y += marsSpeeds.rotationSpeed;

    jupitergroup.rotation.y += jupiterSpeeds.revolutionSpeed;
    jupitermesh.rotation.y += jupiterSpeeds.rotationSpeed;

    saturngroup.rotation.y += saturnSpeeds.revolutionSpeed;
    satmesh.rotation.y += saturnSpeeds.rotationSpeed;

    uranusgroup.rotation.y += uranusSpeeds.revolutionSpeed;
    uranusmesh.rotation.y += uranusSpeeds.rotationSpeed;

    neptunegroup.rotation.y += neptuneSpeeds.revolutionSpeed;
    neptmesh.rotation.y += neptuneSpeeds.rotationSpeed;
    controls.update()
    renderer.render(scene,camera)
}
animate()


window.addEventListener('resize', () => {
    w = window.innerWidth;
    h = window.innerHeight;

    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    renderer.setSize(w, h);
});