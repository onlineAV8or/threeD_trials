import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const axisHelper = new THREE.AxesHelper()
//scene.add(axisHelper)
/**
 * Debug
 */
//const gui = new dat.GUI();


const textureLoader = new THREE.TextureLoader()
const matcapTextureMetallic = textureLoader.load('./textures/matcaps/3.png')
const matcapTextureReddish = textureLoader.load('./textures/matcaps/4.png')

const cubeTextureLoader = new THREE.CubeTextureLoader()

const fontLoader =  new FontLoader()
fontLoader.load(
    './fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Hello Viewer!',
            {
                font: font,
                size:0.5,
                height:0.2,
                curveSegments: 6,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 3  
            }
        )
        textGeometry.center()
        const textMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTextureReddish})
        const text= new THREE.Mesh(textGeometry,textMaterial)
        scene.add(text)

        const donutGeometry =  new THREE.TorusGeometry(0.3,0.2,20,45)
        const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTextureMetallic})
        //const donutMaterial = new THREE.MeshNormalMaterial()
        for(let i=0;i<100;i++)
        {
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)

            donut.position.x = (Math.random()-0.5) *10
            donut.position.y = (Math.random()-0.5) *10
            donut.position.z = (Math.random()-0.5) *10

            donut.rotation.x = Math.random()*Math.PI
            donut.rotation.y = Math.random()*Math.PI

            const scale = Math.random()
            donut.scale.set(scale,scale,scale)

            scene.add(donut)
        }
    }
)


// const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
// const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
// const doorAmbientTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
// const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
// const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
// const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
// const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
// //const matCapTexture = textureLoader.load('/textures/matcaps/3.png')
// const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')


// const environmentMapTexture = cubeTextureLoader.load(
//     [
//         '/textures/environmentMaps/0/px.jpg',
//         '/textures/environmentMaps/0/nx.jpg',
//         '/textures/environmentMaps/0/py.jpg',
//         '/textures/environmentMaps/0/ny.jpg',
//         '/textures/environmentMaps/0/pz.jpg',
//         '/textures/environmentMaps/0/nz.jpg',
//     ]
// )


/**
 * Object
 */
// const material = new THREE.MeshBasicMaterial(); 
// material.map = doorColorTexture
// material.alphaMap = doorAlphaTexture
// material.transparent = true
// material.side = THREE.DoubleSide

// const material= new THREE.MeshNormalMaterial()
// material.flatShading=true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matCapTexture
//const material = new THREE.MeshDepthMaterial()
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.7
// material.roughness = 0.2
// material.envMap = environmentMapTexture
// material.side = THREE.DoubleSide


// material.side = THREE.DoubleSide
// material.map = doorColorTexture
// material.aoMap = doorAmbientTexture
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.normalMap = doorNormalTexture
// material.alphaMap = doorAlphaTexture
// material.transparent = true
//mate
// gui.add(material, 'metalness').min(0).max(1).step(0.0001)
// gui.add(material,'roughness').min(0).max(1).step(0.0001)
// gui.add(material,'aoMapIntensity').min(0).max(10).step(0.0001)


// const sphere = new THREE.Mesh( 
//     new THREE.SphereGeometry( 0.5, 16, 16 ), 
//     material
// );
// sphere.position.x = -1.5

// const plane = new THREE.Mesh( 
//     new THREE.PlaneGeometry(1,1), 
//     material
// ); 
// plane.position.x = 1.5
// plane.geometry.setAttribute('uv2',new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2))


// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.3,0.2,16.32),
//     material
// )

//scene.add( sphere,plane,torus )

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
const pointLight = new THREE.PointLight(0xffffff,0.5)
pointLight.position.set(2,3,4)
scene.add(ambientLight, pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 500)
camera.position.set(0, 0, 5);

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // sphere.rotation.y = 0.3*elapsedTime
    // torus.rotation.y = 0.3*elapsedTime
    // plane.rotation.y = 0.3*elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()