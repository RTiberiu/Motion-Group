import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import gsap from 'gsap';
import settings from '../settings.json';

gsap.registerPlugin();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x323230);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);


const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

const renderer = new THREE.WebGL1Renderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.setSize( window.innerWidth, window.innerHeight);
$('body').append(renderer.domElement);

// Adding light into the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
scene.add(directionalLight); 

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Adds a damping effect to smooth camera movements
controls.dampingFactor = 0.05; // Adjust the damping factor as needed
controls.rotateSpeed = 0.5; // Adjust the rotation speed as needed


camera.position.z = 5;

let sizeMode = false;

// Loading elements that trigger the size show when hoevered
let hoverElements = settings.hoverElements;


// Create a raycaster and an array to store the intersected objects
const raycaster = new THREE.Raycaster();
const intersects = [];
let uniqueElements = new Set();


let mouseX = 0;
let mouseY = 0;

// Add an event listener to capture mouse coordinates
window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('keydown', onMouseClick);

const redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
function onMouseClick(event) {
    console.log(event.key)
    console.log(event.key.toLowerCase())
    console.log(event.key.toLowerCase() == 'a')
    if(event.key.toLowerCase() == 'a') {
        // Calculate mouse position
        const mouse = new THREE.Vector2();
        mouse.x = mouseX;
        mouse.y = mouseY;
        console.log(mouse.x, mouse.y)
        // Update the raycaster with the mouse position
        raycaster.setFromCamera(mouse, camera);
    
        // Perform the intersection check
        intersects.length = 0;
        raycaster.intersectObjects(scene.children, true, intersects);
        
        if (intersects.length > 0) {
            intersects[0].object.material = redMaterial; // Apply the red material

            uniqueElements.add(intersects[0].object.name);
            console.log("Clicked Object: " + intersects[0].object.name);
        }
    }
}


// Adding the font loader
const fontLoader = new FontLoader();

// Adding the text mesh
const textMaterial = new THREE.MeshBasicMaterial({color: 'red'});


// Importing a 3D model
const loader = new GLTFLoader();
let cabin;
loader.load('../3d_models/beohus.gltf', function(gltf) {
    cabin = gltf.scene;

    // cabin.scale.set(1, 1, 1);

    console.log(cabin);
    
    scene.add(cabin);

    // Add shadow for all the cabin's meshes
    cabin.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    // Set the camera position
    camera.position.set(10.51637277396685, 6.694731096055621, -13.827832078903775);

    // Set the camera rotation
    camera.rotation.set(-2.5584984615871456, 0.5050634351181527, 2.8326555783283576);
}, undefined, function (error) {
    console.error(error);
});


// Function that runs every second to animate
function animate() {
    requestAnimationFrame(animate);
    
    // Add animations here
    controls.update(); // Update camera controls
    
    // console.log(camera);

    renderer.render(scene, camera);
}
animate();


let cameraTimeline = gsap.timeline({paused: true});
let animationTimelines = [];
function animateElements(arrayOffElementNames, secondsToAnimate) {
    let localArrayOfElementNames = JSON.parse(JSON.stringify(arrayOffElementNames));
    function _animateObjectToTimeline(timeline, object, objectY, animationTime, delay) {
        timeline.to(object.position, {
            y: objectY + 10,
            duration: animationTime,
            ease: "power1.inOut",
            yoyo: true,
        }, delay);
        
        // Clone the material and apply it to mesh to avoid animating on shared material
        let clonedMaterial = object.material.clone()
        clonedMaterial.transparent = true;
        object.material = clonedMaterial;
        
        timeline.to(clonedMaterial, {
            opacity: 0,
            duration: animationTime,
            ease: "power1.inOut",
        }, '-=' + (animationTime));
    }
    
    let elementObject;
    let elementObjectY;
    let currentTimeline;
    let animationStyle;
    let animationDelay = 0;
    // Calculate how long each item should be animating for
    let totalItemsToAnimate = countTotalElementsOfArray(localArrayOfElementNames);
    let itemAnimationTime = secondsToAnimate / totalItemsToAnimate;
    console.log('Animating ', totalItemsToAnimate, ' each for ', itemAnimationTime);
    
    localArrayOfElementNames.forEach((elementName, index) => {
        if (Array.isArray(elementName)) {
            // Add timeline for current array to the entire animation timelines
            currentTimeline = gsap.timeline({paused: true});
            animationTimelines.push(currentTimeline);
            animationStyle = elementName.shift();
            
            console.log('animationStyle ', animationStyle, ' animationDelay ', animationDelay)
            elementName.forEach((elementName, index) => {
                elementObject = cabin.getObjectByName(elementName);
                elementObjectY = elementObject.position.y;

                if (index == 0) {
                    animationDelay = '';
                } else if (animationStyle == 'seperate') {
                    animationDelay = '+=' + (itemAnimationTime * 0.1);
                } else if (animationStyle == 'together') {
                    animationDelay = 0
                }

                _animateObjectToTimeline(currentTimeline, elementObject, elementObjectY, itemAnimationTime, animationDelay);
            })
        }
    });

    console.log('Timelines : ', animationTimelines.length);
    // Play all animations
    animationTimelines.forEach(timeline => {
        console.log('Started an animation timeline.')
        timeline.play();
    })
}

function countTotalElementsOfArray(array) {
    let count = 0;
    array.forEach(item => {
        if (Array.isArray(item)) {
            if (item[0] == 'seperate') {
                count += countTotalElementsOfArray(item);
            } else if (item[0] == 'together') {
                count++;
            }
        } else {
            count++;
        }
    });
    return count;
}

function animateCameraToPosition(position, meshNameToLookAt, duration) {
    let objectToLookAt = cabin.getObjectByName(meshNameToLookAt);
    let desirePosition = objectToLookAt.position
    cameraTimeline.to(controls.target, {
        x: desirePosition.x,
        y: desirePosition.y,
        z: desirePosition.z,
        duration: duration,
        onComplete: () => {
            controls.update();
            console.log('now looking at object.')
        },
        ease: "power1.inOut", 
    })

    cameraTimeline.to(camera.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: duration,
        ease: "power1.inOut", 
    }, '-=' + duration)
    cameraTimeline.play();
}

function isNamePresentInObjecct(name) {
    for (const key in hoverElements) {
      if (hoverElements[key].includes(name)) {
        return key; 
      }
    }
    return null;
}
  

let textIsDisplayed = false;
function showSizeOnElementHover() {
    const mouse = new THREE.Vector2();
    mouse.x = mouseX;
    mouse.y = mouseY;

    // Update the raycaster with the mouse position
    raycaster.setFromCamera(mouse, camera);

    intersects.length = 0;
    raycaster.intersectObjects(scene.children, true, intersects);

    if (intersects.length > 0) {
        let interestedObject = intersects[0].object;
        let nameOfObject = intersects[0].object.name;
        let hoveringOver = isNamePresentInObjecct(nameOfObject);
        if (hoveringOver != null) {
            console.log('Hovering over ' + hoveringOver);

            // TODO Show dimensions on mesh;
            let height = '3.60 m'; // Pull this info from a JSON database
            let width = '1.2 m'; // Pull this info from a JSON database

            // Creating the text

            if (!textIsDisplayed) { 
                textIsDisplayed = true;
                fontLoader.load('../fonts/Montserrat Thin_Regular.json', function(font) {
                    const textGeometry = new TextGeometry("HELLO WORLD!", {
                        font: font,
                        size: 30,
                        height: 5
                    });
                    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

                    // Text mesh settings
                    let scale = .005;
                    textMesh.scale.set(scale, scale, scale);
                    console.log("Text mesh position: X " + textMesh.position.x, " Y " + textMesh.position.y + " Z " + textMesh.position.z);
                    console.log("Intersected position: X " + interestedObject.position.x, " Y " + interestedObject.position.y + " Z " + interestedObject.position.z);
                    
                    // TODO Improve how the text mesh is getting created.
                    // TODO Properly remove the text when switching to another mesh.
                    // TODO Get the correct position for the text.
                    textMesh.position.set(interestedObject.position.x, interestedObject.position.y, interestedObject.position.z);
                    // Add mesh to scene
                    scene.add(textMesh);
                    console.log("Text mesh position: X " + textMesh.position.x, " Y " + textMesh.position.y + " Z " + textMesh.position.z);

                    console.log(textGeometry)
                })
            }
            


            

        }
        
    }
}
    
$('#Scene1').click(function() {
    console.log('Animating Scene1 ', cabin);

    animateElements(settings.wallElementsNames1, 8);
    animateCameraToPosition(settings.doubleBedroomPosition, 'G-__560793', 8)
});
$('#Scene2').click(function() {
    console.log('Animating Scene2 ', cabin);
    animateElements(settings.wallElementsNames2, 10);
});
$('#Scene3').click(function() {
    console.log('Anim length: ', animationTimelines.length)
    console.log('Animating Scene3 ', cabin);
    console.log(settings.roofElementsNames)
    animateElements(settings.roofElementsNames, 5);
    animateCameraToPosition(settings.topDownPosition, 'G-__559866', 5);
});

$('#sizeMode').click(function() {
    if (sizeMode) sizeMode = false;
    else sizeMode = true;

    console.log('Size mode! ', sizeMode);

    if (sizeMode) {
        window.addEventListener('mousemove', showSizeOnElementHover);
    } else {
        window.removeEventListener('mousemove', showSizeOnElementHover);
    }  
});


$('#Scene4').click(function() {
    console.log('Animating Scene4 ', cabin);
    animateCameraToPosition(settings.insideLivingRoomPosition, 'G-__560676', 5);
});

$('#Scene5').click(function() {
    console.log('Animating Scene5 ', cabin);
    animateCameraToPosition(settings.bathRoomPosition, 'G-__562296', 5);
});

$('#Scene6').click(function() {
    console.log('Animating Scene6 ', cabin);
    animateCameraToPosition(settings.bedRoomPosition, 'G-__560613', 5);
});

$('#elementsSet').click(function() {
    console.log(uniqueElements);
    uniqueElements = new Set();
});

$('#getCamera').click(function() {
    console.log(camera);
    console.log(camera.getWorldDirection);
    console.log(camera.getWorldPosition);
});

function reverseTimelineAtIndex(index) {
    if (index >= 0) {
        const timeline = animationTimelines[index];
        timeline.eventCallback("onReverseComplete", function() {
            if (index === 0) {
                animationTimelines = [];
            } else {
                reverseTimelineAtIndex(index - 1);
            }
        });
        timeline.reverse();
    }
}

$('#ResetTimeline').click(function() {
    for (let index = animationTimelines.length - 1; index >= 0; index--) {
        reverseTimelineAtIndex(animationTimelines.length - 1);
    }
    animateCameraToPosition(settings.initialCameraPosition, 'skp2663_2', 5);
    
});
