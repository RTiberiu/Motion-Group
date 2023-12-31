import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import gsap from 'gsap';
import settings from '../settings.json';

// Create the basic scene
gsap.registerPlugin();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x323230);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);

// Add an ambient light to the scene
const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

// Add axis helper
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Create the renderer and append it to the container
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

// Create the user controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05; 
controls.rotateSpeed = 0.5;

// Toggle for displaying the size or not on click
let sizeMode = false;

// Loading elements that trigger the size show when hoevered
let hoverElements = settings.hoverElements;

// Create a raycaster and an array to store the intersected objects
const raycaster = new THREE.Raycaster();
const intersects = [];
let uniqueElements = new Set();

// Storing current mouse positions
let mouseX = 0;
let mouseY = 0;

// Add an event listener to capture mouse coordinates
window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Add event listener for button presses (used for testing) 
window.addEventListener('keydown', onMouseClick);

// Function to handle window resize
function onWindowResize() {
    // Update the camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add event listener for window resize
window.addEventListener('resize', onWindowResize);

/**
 * Create a basic mesh material.
 * @param {string} color hex value representing the material's color
 * @returns Three js mesh material
 */
function createBasicMaterialWithColor(color) {
    let hexColor = parseInt(color, 16);
    let material = new THREE.MeshBasicMaterial({color: hexColor});
    material.castShadow = true;
    material.receiveShadow = true;
    return material;
}

// Create testing materials
const redMaterial = createBasicMaterialWithColor('ff0000');
const orangeMaterial = createBasicMaterialWithColor('ff6900');

function onMouseClick(event) {
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
            console.log("Clicked Object name: " + intersects[0].object.name);
            console.log(intersects[0].object);
        }
    }
}


// Adding the font loader
const fontLoader = new FontLoader();

// Adding the text material
const textMaterial = new THREE.MeshBasicMaterial({color: 'red'});

// Adding the text mesh
let heightTextMesh = null;
let widthTextMesh = null;
function showDimensionsAtPosition(height, width, mainObject) {
    fontLoader.load('../fonts/Montserrat Thin_Regular.json', function(font) {
        const heightGeometry = new TextGeometry(height, {
            font: font,
            size: 30,
            height: 30
        });

        const widthGeometry = new TextGeometry(width, {
            font: font,
            size: 30,
            height: 30
        });
        
        heightTextMesh = new THREE.Mesh(heightGeometry, textMaterial);
        widthTextMesh = new THREE.Mesh(widthGeometry, textMaterial);

        // Scale the mesh
        let scale = .005; 
        heightTextMesh.scale.set(scale, scale, scale);
        widthTextMesh.scale.set(scale, scale, scale);
    
        // Calculate element height using its bounding box
        console.log(mainObject);
        // Get world position rather than location position of object
        let objectPosition = new THREE.Vector3();
        mainObject.getWorldPosition(objectPosition);
        let boundingBox = new THREE.Box3().setFromObject(mainObject);
        let objectHeight = boundingBox.max.y - boundingBox.min.y;
        let objectWidth = boundingBox.max.x - boundingBox.min.x;
        console.log("objectHeight: " + objectHeight);
        console.log("objectWidth: " + objectWidth);

        // Offset the text position in the direction of the camera
        const offsetHeight = 0; //0.1;
        const offsetWidth = 0.5;

        // Text positions
        let heightTextPosition = new THREE.Vector3(objectPosition.x, objectPosition.y + objectHeight + offsetHeight, objectPosition.z);
        let widthTextPosition = new THREE.Vector3(objectPosition.x + offsetWidth, objectPosition.y, objectPosition.z);

        // Set text positions to the text mesh
        console.log('Object position. X: ' + objectPosition.x + " Y: " + objectPosition.y + " Z: " + objectPosition.z);
        heightTextMesh.position.set(heightTextPosition.x, heightTextPosition.y, heightTextPosition.z);
        widthTextMesh.position.set(widthTextPosition.x, widthTextPosition.y, widthTextPosition.z);
      

        // Add text mesh to scene
        scene.add(heightTextMesh);
        scene.add(widthTextMesh);
        // TODO Improve how the text mesh is getting created.
        // TODO Properly remove the text when switching to another mesh.
        // textMesh.position.set(interestedObject.position.x, interestedObject.position.y, interestedObject.position.z);
        // TODO Get the correct position for the text.

    })
    
}

// Create and store the popup element
scene.add(camera);
function loadPopupElement() {
    const geometry = new THREE.BoxGeometry(3, 2, .1);
    const material = createBasicMaterialWithColor('fffff2');
    material.transparent = true;
    material.opacity = 0;
    const popup = new THREE.Mesh(geometry, material);
    popup.userData.id = 'popup';
    popup.scale.x = 0.5;
    popup.scale.y = 0.5;
    camera.add(popup);
    return popup;
}
const popup = loadPopupElement();

function spawnPopupAtLocation(name, height, width) {
    let text = `Wall: ${name}\nHeight: ${height}\nWidth: ${width}`
    fontLoader.load('../fonts/Montserrat Thin_Regular.json', function (font) {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: .2,
            height: 0.1,
            curveSegments: 12,
            bevelEnabled: false
        });

        // Adding the text to the popup
        const material = createBasicMaterialWithColor('3a3b3c');
        const textMesh = new THREE.Mesh(textGeometry, material);
        console.log(popup);
        let popupTimeline = gsap.timeline({paused: true});
        let animDuration = 0.5;
        popupTimeline.to(popup.position, {
            x: 0,
            y: 0,
            z: -5,
            duration: 0,
            ease: 'power1.inOut'
        })
        .to(popup.material, {
            opacity: 1,
            duration: animDuration,
            ease: 'power1.inOut'
        })
        .to(popup.scale, {
            x: 1,
            y: 1,
            duration: animDuration,
            ease: 'power1.inOut',
            onComplete: () => {
                textMesh.position.x = popup.position.x - 1.4;
                textMesh.position.y = -popup.position.y + .3;
                popup.add(textMesh);
            }
        }, '-=' + animDuration)
        popupTimeline.play();
    });

}

function removePopup() {
    let popupTimeline = gsap.timeline({paused: true});
    let animDuration = 0.5;
    popupTimeline.to(popup.material, {
        opacity: 0,
        duration: animDuration,
        ease: 'power1.inOut'
    })
    .to(popup.scale, {
        x: 0.5,
        y: 0.5,
        duration: animDuration,
        ease: 'power1.inOut'
    }, '-=' + animDuration)
    popupTimeline.to(popup.position, {
        x: 0,
        y: 0,
        z: +5,
        duration: 0,
        ease: 'power1.inOut'
    });
    popupTimeline.play();

    // Remove mesh children from popup
    if (popup.children.length > 0) {
        console.log("Removing children!");
        popup.children.forEach((child) => {
            popup.remove(child);
        });
    }
}

// Configurator mode or coffeShop mode
let isConfiguratorMode = false;
let isCoffeeShopMode = false;

// Storing configurator components
let configPlaceholders = [["together"]];
let configWalls = [["together"]];
let originalWallPosition;
let newWallPosition;
let placeholderHeight;
let originalPlaceholderPosition;

// Importing the 3D model for the cabin
const loader = new GLTFLoader();
let cabin;
let coffeeShopIds = new Set();
function importCabinModel() {
    loader.load('../3d_models/beohus_with_coffee_shop_finale1.gltf', function(gltf) {
        cabin = gltf.scene;
        scene.add(cabin);
    
        // Initial settings to the cabin
        cabin.traverse((child) => {
            // Add shadow for all the cabin's meshes
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
    
                // Hide configurator walls and placeholders
                let isWall = child.name.includes('wall_');
                let isPlaceholder = child.name.includes('placeholder_');
                let isCoffeeShop = child.name.includes('coffeeshop_')
                if (isWall || isPlaceholder || isCoffeeShop) {
                    // Clone the material and apply it to mesh to avoid animating on shared material
                    let clonedMaterial = child.material.clone();
                    clonedMaterial.transparent = true;
                    child.material = clonedMaterial;
                    // Make the mesh transparent
                    child.material.opacity = 0;
    
                    // Store mesh names into arrays
                    let boundingBox = new THREE.Box3().setFromObject(child);
                    let objectHeight = boundingBox.max.y - boundingBox.min.y;
                    if (isWall) {
                        configWalls[0].push(child.name);
                        // Store original wall position
                        if (originalWallPosition == null) {
                            originalWallPosition = child.position.y;
                        }
                        // Move walls underneath the cabin
                        newWallPosition = child.position.y - objectHeight - .4;
                        child.position.y = newWallPosition;
                    } else if (isPlaceholder) {
                        configPlaceholders[0].push(child.name);
                        placeholderHeight = objectHeight;

                        // Store original placeholder position
                        if (originalPlaceholderPosition == null) {
                            originalPlaceholderPosition = child.position.y;
                        }
                        child.position.y = child.position.y - objectHeight - .4;
                    } else if (isCoffeeShop) {
                        child.position.y = child.position.y - objectHeight - 5;
                    }
                }
            }
    
        });
        // Set the camera position
        camera.position.set(10.51637277396685, 6.694731096055621, -13.827832078903775);
    
        // Set the camera rotation
        camera.rotation.set(-2.5584984615871456, 0.5050634351181527, 2.8326555783283576);
    }, undefined, function (error) {
        console.error(error);
    });
}

importCabinModel();

// Support function to get all the coffeshop meshes IDs
function getIds() {
    cabin.traverse((child) => {
        if (child.name.includes('coffeeshop_')) {
            if (child.isMesh) {
                coffeeShopIds.add(child.name);
            } else {
                child.children.forEach((childMesh) => {
                    coffeeShopIds.add(childMesh.name);
                });
            }
        }
    });
    console.log(coffeeShopIds);
}

// Function that runs every second to animate
function animate() {
    requestAnimationFrame(animate);
    
    // Add animations here
    controls.update(); // Update camera controls

    // Make the text always face the camera
    if (heightTextMesh != null && widthTextMesh != null) {
        heightTextMesh.lookAt(camera.position);
        widthTextMesh.lookAt(camera.position);
    }

    if (popup != null) {
        popup.lookAt(camera.position);
    }
    renderer.render(scene, camera);
}
animate();


let cameraTimeline = gsap.timeline({paused: true});
let animationTimelines = [];
/**
 * 
 * @param {array} arrayOffElementNames array of elements in the format found in settings.json 
 * @param {int} secondsToAnimate how many seconds for the animation to last
 * @param {boolean} lowerElement true for lowering, false for rising the element
 * @param {int} distance how far should the element move (from 1 to 10)
 * @param {boolean} storeTimeline decide to store the timeline that will be reversed later
 */
function animateElements(arrayOffElementNames, secondsToAnimate, lowerElement, distance, makeVisibile, storeTimeline) {
    // Decide if to animate the object up or down 
    let directionMultiplier;
    if (lowerElement) {
        directionMultiplier = -1;
    } else {
        directionMultiplier = 1;
    }

    // Decide to animate the object to visible or invisible
    let animateToOpacity;
    if (makeVisibile) {
        animateToOpacity = 1;
    } else {
        animateToOpacity = 0;
    }

    let localArrayOfElementNames = JSON.parse(JSON.stringify(arrayOffElementNames));
    function _animateObjectToTimeline(timeline, object, objectY, animationTime, delayAnimation) {
        if (delayAnimation) {
            // Animate object position
            timeline.to(object.position, {
                y: (distance) * directionMultiplier,
                duration: animationTime,
                ease: "power3.in"
            });
        } else {
            // Animate object position
            timeline.to(object.position, {
                y: (distance) * directionMultiplier,
                duration: animationTime,
                ease: "power3.in"
            }, '');
        }

        // Clone the material and apply it to mesh to avoid animating on shared material
        let clonedMaterial = object.material.clone();
        clonedMaterial.transparent = true;
        object.material = clonedMaterial;
        
        timeline.to(clonedMaterial, {
            opacity: animateToOpacity,
            duration: animationTime,
            ease: "power3.in",
        }, '-=' + (animationTime));
    }
    
    let elementObject;
    let elementObjectY;
    let currentTimeline;
    let animationStyle;
    let animationDelay;
    
    
    // Calculate how long each item should be animating for
    let totalItemsToAnimate = countTotalElementsOfArray(localArrayOfElementNames);
    // let animStagger = secondsToAnimate / totalItemsToAnimate;
    let itemAnimationTime = secondsToAnimate / totalItemsToAnimate;
    let animStagger = itemAnimationTime / 2;
    let mainTimeline = gsap.timeline({paused: true, stagger: animStagger});
    // Loop though the array of arrays and create a timeline for each
    localArrayOfElementNames.forEach((elementArray, indexSet) => {
        if (Array.isArray(elementArray)) {
            animationStyle = elementArray.shift();
            if (animationStyle == 'together') {
                currentTimeline = gsap.timeline({paused: false, stagger: 0});
                animationDelay = false;
            } else if (animationStyle == 'separate') {
                currentTimeline = gsap.timeline({paused: false, stagger: animStagger});
                animationDelay = true;
            }
            
            // Loop over a single array and animate it depending on its settings
            elementArray.forEach((elementName, index) => {
                elementObject = cabin.getObjectByName(elementName);
                elementObjectY = elementObject.position.y;
                _animateObjectToTimeline(currentTimeline, elementObject, elementObjectY, itemAnimationTime, animationDelay);
            });
            
            // Add to maintimeline
            mainTimeline.add(currentTimeline);
        }
    });
    // Store timeline for reversing later
    console.log("Added main timeline to timelines");
    if (storeTimeline) animationTimelines.push(mainTimeline);

    // Play maintimeline
    mainTimeline.play();
}

function countTotalElementsOfArray(array) {
    let count = 0;
    array.forEach(item => {
        if (Array.isArray(item)) {
            if (item[0] == 'separate') {
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

function isNamePresentInObject(name) {
    for (const key in hoverElements) {
      if (hoverElements[key].includes(name)) {
        let firstObject = hoverElements[key][0];
        return {
            "hoveredObject": key, 
            "mainObject": firstObject
        } 
      }
    }
    return null;
}
  
let popupIsDisplayed = false;
let textForElementName;
function showSizeOnElementClick() {
    const mouse = new THREE.Vector2();
    mouse.x = mouseX;
    mouse.y = mouseY;

    // Update the raycaster with the mouse position
    raycaster.setFromCamera(mouse, camera);

    intersects.length = 0;
    raycaster.intersectObjects(scene.children, true, intersects);
    console.log(raycaster.intersectObject(popup));
    console.log(raycaster.intersectObject(popup).length > 0);

    if (raycaster.intersectObject(popup).length > 0) {
        removePopup();
        popupIsDisplayed = false;
    } else if (intersects.length > 0) {
        let nameOfObject = intersects[0].object.name;
        let namePresentObject = isNamePresentInObject(nameOfObject);
        
        if (namePresentObject != null) {
            let hoveringOver = namePresentObject.hoveredObject;
            // Get hovered item's settings
            let settingsArray = settings.hoverElementsSizes[hoveringOver];
            let name = settingsArray[0];
            let height = settingsArray[1];
            let width = settingsArray[2];
            
            // Show dimensions over the element 
            if (!popupIsDisplayed) { 
                textForElementName = hoveringOver;
                popupIsDisplayed = true;
                spawnPopupAtLocation(name, height, width);
            }
        }  
    } 
}

function clearSpawnedText() {
    if (heightTextMesh != null && widthTextMesh != null) {
        scene.remove(heightTextMesh);
        scene.remove(widthTextMesh);
        // Dispose of the geometry and material after removing from the scene
        heightTextMesh.geometry.dispose();
        widthTextMesh.material.dispose();
    }
}
    
$('#Scene1').click(function() {
    console.log('Animating Scene1 ', cabin);
    animateElements(settings.wallElementsNames1, 5, false, 10, false, true);
    animateCameraToPosition(settings.doubleBedroomPosition, 'G-__560793', 7)
});

$('#Scene2').click(function() {
    console.log('Animating Scene2 ', cabin);
    animateElements(settings.wallElementsNames2, 5, false, 10, false, true);
    animateCameraToPosition(settings.cameraPositionFrontWallTwo, 'G-__559866', 7);
});

$('#Scene3').click(function() {
    console.log('Animating Scene3 ', cabin);
    console.log(settings.roofElementsNames)
    animateElements(settings.roofElementsNames, 5, false, 10, false, true);
    animateCameraToPosition(settings.topDownPosition, 'G-__559866', 5);
});

$('#sizeMode').click(function() {
    if (sizeMode) sizeMode = false;
    else sizeMode = true;

    console.log('Size mode! ', sizeMode);

    if (sizeMode) {
        window.addEventListener('click', showSizeOnElementClick);
    } else {
        removePopup();
        window.removeEventListener('click', showSizeOnElementClick);
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

$('#Scene7').click(function () {
    console.log('Animating Scene7 ', cabin);
    // Animate all the camera positions
    let cameraPositions = [
        settings.cameraPositionFrontWallOne,
        settings.cameraPositionFrontWallOneToTwo,
        settings.cameraPositionFrontWallTwo,
        settings.cameraPositionFrontWallTwoToThree,
        settings.cameraPositionFrontWallThree,
        settings.cameraPositionFrontWallThreeToFour,
        settings.cameraPositionFrontWallFour,
        settings.cameraPositionFrontWallFourToFive,
        settings.cameraPositionFrontWallFive,
        settings.cameraPositionFrontWallFiveToSix,
        settings.cameraPositionFrontWallSix,
        settings.initialCameraPosition
    ];
    cameraPositions.forEach((position) => {
        animateCameraToPosition(position, 'G-__559866', 3);
    });

    // Animate the cabin walls
    let wallsObjectArray = [
        settings.wallElementsNames1,
        settings.wallElementsNames2,
        settings.wallElementsNames3,
        settings.wallElementsNames4,
        settings.wallElementsNames5,
        settings.wallElementsNames6
    ];
    let wallAnimationTime = 5;
    let timeout = 0;
    wallsObjectArray.forEach((wallObjects) => {
        setTimeout(() => {animateElements(wallObjects, wallAnimationTime, false, 10, false, true);}, timeout * 1000);
        timeout += wallAnimationTime;

    });
    
    // Reverse cabin objects animations
    setTimeout(() => {
        reverseTimelineAtIndex(0, 4, true);
    }, timeout * 1000);
});

$('#coffeeShop').click(function() {
    // Toggle configurator mode
    if (!isCoffeeShopMode) isCoffeeShopMode = true;
    else isCoffeeShopMode = false;

    if (isCoffeeShopMode) {
        console.log('Animating coffee shop ', cabin);
        // Animate camera
        let cameraDelay = 3000;
        animateCameraToPosition(settings.topDownSidePosition, 'G-__559866', 3);
        setTimeout(() => {animateCameraToPosition(settings.topDownCoffeePosition, 'G-__559866', 4)}, cameraDelay);
        cameraDelay += 4000;
        setTimeout(() => {animateCameraToPosition(settings.topDownCoffeeTwoPosition, 'G-__559866', 4)}, cameraDelay);
        cameraDelay += 4000;
        setTimeout(() => {animateCameraToPosition(settings.topDownCoffeeThreePosition, 'G-__559866', 4)}, cameraDelay);
        cameraDelay += 4000;
        setTimeout(() => {animateCameraToPosition(settings.topDownCoffeeFourPosition, 'G-__559866', 6)}, cameraDelay);
        cameraDelay += 6500;
        setTimeout(() => {animateCameraToPosition(settings.topDownSidePosition, 'G-__559866', 4)}, cameraDelay);
        
        // Animate roof
        animateElements(settings.roofElementsNames, 2, false, 8, false, true);
        
        // Animate interior walls
        let setAnimationDelay = 0;
        setAnimationDelay += 2000;
        setTimeout(() => {animateElements(settings.interiorWallls, 4, true, 7, false, true);}, setAnimationDelay);

        // Animate furniture 
        setAnimationDelay += 1500;
        setTimeout(() => {animateElements(settings.furniture, 2, true, 2, false, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(settings.furnitureTwo, 2, true, 2, false, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(settings.furnitureThree, 2, true, 2, false, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(settings.outsideFurniture, 2, true, 6, false, true);}, setAnimationDelay);
        
        // Animate the coffee shop items
        setAnimationDelay += 2000;
        let coffeeShopObjectsArray = [
            settings.coffeeShop,
            settings.coffeeShopTwo,
            settings.coffeeShopThree,
            settings.coffeeShopFour,
            settings.coffeeShopFive,
            settings.coffeeShopSix,
            settings.coffeeShopSeven
        ];
        
        setTimeout(() => {animateElements(coffeeShopObjectsArray[0], 10, false, 0, true, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(coffeeShopObjectsArray[1], 10, false, 0, true, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(coffeeShopObjectsArray[2], 10, false, 0, true, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(coffeeShopObjectsArray[3], 10, false, 0, true, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(coffeeShopObjectsArray[4], 10, false, 0, true, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(coffeeShopObjectsArray[5], 10, false, 0, true, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(coffeeShopObjectsArray[6], 10, false, 0, true, true);}, setAnimationDelay);

    } else {
        reverseTimelineAtIndex(animationTimelines.length - 1, 4, false);
        animateCameraToPosition(settings.topDownCoffeePosition, 'G-__559866', 16);
        setTimeout(() => {animateCameraToPosition(settings.initialCameraPosition, 'G-__559866', 4)}, 16000);
    }
});

$('#elementsSet').click(function() {
    console.log(uniqueElements);
    uniqueElements = new Set();
});

$('#getCamera').click(function() {
    console.log(camera);
    console.log('"x": ' + camera.position.x + ',' + '\n"y": ' + camera.position.y + ',' + '\n"z": ' + camera.position.z );
});

/**
 * Reverse all the timelines stored in animationTimelines.
 * @param {int} index Index of the timeline in the array to reverse
 * @param {int} speedMultiplier How much faster should the timeline reverse
 * @param {boolean} moveForward true to move forward in the timeline array, or false to move backwards
 */
function reverseTimelineAtIndex(index, speedMultiplier, moveForward) {
    if (index >= 0 && index < animationTimelines.length) {
        const timeline = animationTimelines[index];
        timeline.eventCallback("onReverseComplete", function() {
            if ((index === 0 && !moveForward) || (index === animationTimelines.length - 1 && moveForward)) {
                console.log("Cleared timelines!");
                animationTimelines = [];
            } else {
                let tempIndex = moveForward ? index + 1 : index - 1;
                reverseTimelineAtIndex(tempIndex, speedMultiplier, moveForward);
            }
        });
        timeline.timeScale(speedMultiplier).reverse();
    }
}

$('#ResetTimeline').click(function() {
    reverseTimelineAtIndex(animationTimelines.length - 1, 2, false);
    animateCameraToPosition(settings.initialCameraPosition, 'skp2663_2', 5);
    
});

$('#configurator').click(function() {
    // Toggle configurator mode
    if (!isConfiguratorMode) isConfiguratorMode = true;
    else isConfiguratorMode = false;

    if (isConfiguratorMode) {
        // Show configurator
        initializeConfigurator(true);
        // Adding mouse events
        window.addEventListener('mousemove', hoverInConfiguratorMode);
        window.addEventListener('click', clickInConfiguratorMode);
    } else {
        // Hide configurator
        initializeConfigurator(false);

        // Removing mouse events
        window.removeEventListener('mousemove', hoverInConfiguratorMode);
        window.removeEventListener('click', clickInConfiguratorMode);
    }

});

/**
 * Support function to animate the configurator on/off
 * @param {boolean} showConfigurator animate the cabin items and show configurator 
 */
function initializeConfigurator(showConfigurator) {
    let setAnimationDelay = 0;
    if (showConfigurator) {
        // Animate camera
        animateCameraToPosition(settings.topDownSidePosition, 'G-__559866', 6);
        setTimeout(() => {animateCameraToPosition(settings.topDownLowerPosition, 'G-__559866', 4);}, 7500);
    
        // Animate roof
        animateElements(settings.roofElementsNames, 5, false, 8, false, true);
    
        // Animate interior walls
        setAnimationDelay += 4000;
        setTimeout(() => {animateElements(settings.interiorWallls, 5, true, 7, false, true);}, setAnimationDelay);
        
        // Animate furniture
        setAnimationDelay += 2000;
        setTimeout(() => {animateElements(settings.furniture, 5, true, 2, false, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(settings.furnitureTwo, 5, true, 2, false, true);}, setAnimationDelay);
        setTimeout(() => {animateElements(settings.furnitureThree, 5, true, 2, false, true);}, setAnimationDelay);
        
        // Show placeholders
        setAnimationDelay += 5000;
        let placeHolderPosition = originalPlaceholderPosition + placeholderHeight;
        setTimeout(() => {animateElements(configPlaceholders, 2, true, -placeHolderPosition, true, true)}, setAnimationDelay);
    } else {
        animateElements(configPlaceholders, .5, true, 10, false, false);
        animateElements(configWalls, .5, true, 10, false, false);
        animateCameraToPosition(settings.topDownSidePosition, 'G-__559866', 7);
        animateCameraToPosition(settings.initialCameraPosition, 'G-__559866', 3);
        reverseTimelineAtIndex(animationTimelines.length - 1, 3, false);
    }
}

let originalPlaceholderMaterial;
let originalWallMaterial;
let currentHoveredPlaceholder;
let currentHoveredWall;
function hoverInConfiguratorMode() {
    const mouse = new THREE.Vector2();
    mouse.x = mouseX;
    mouse.y = mouseY;

    // Update the raycaster with the mouse position
    raycaster.setFromCamera(mouse, camera);

    intersects.length = 0;
    raycaster.intersectObjects(scene.children, true, intersects);

    // Check if it intersects with anything
    if (intersects.length > 0) {
        let intersectedObject = intersects[0].object;
        let nameOfIntersectObject = intersectedObject.name;

        // Check if it intersects with a placeholder
        if (nameOfIntersectObject.includes('placeholder_')) {
            if (currentHoveredPlaceholder != null && currentHoveredPlaceholder != intersectedObject) {
                // Restore material to previous item
                currentHoveredPlaceholder.material = originalPlaceholderMaterial;
                currentHoveredPlaceholder.transparent = false;
            }
            
            // Store the original material
            if (currentHoveredPlaceholder != intersectedObject && originalPlaceholderMaterial != intersectedObject.material) {
                originalPlaceholderMaterial = intersectedObject.material.clone();
                originalPlaceholderMaterial.transparent = true;
            } 

            // Store the current hovered placeholder name
            currentHoveredPlaceholder = intersectedObject;

            // Change color of hovered placeholder
            intersectedObject.material = orangeMaterial;
        } else {
            // Restore original material
            if (originalPlaceholderMaterial != null && currentHoveredPlaceholder != null) {
                currentHoveredPlaceholder.material = originalPlaceholderMaterial;
                currentHoveredPlaceholder.transparent = false;
                currentHoveredPlaceholder = null;
            }
        }

        // Check if it intersects with a wall
        if (nameOfIntersectObject.includes('wall_')) {
            if (currentHoveredWall != null && currentHoveredWall != intersectedObject) {
                // Restore material to previous item
                currentHoveredWall.material = originalWallMaterial;
                currentHoveredWall.transparent = false;
            }
            
            // Store the original material
            if (currentHoveredWall != intersectedObject && originalWallMaterial != intersectedObject.material) {
                originalWallMaterial = intersectedObject.material.clone();
                originalWallMaterial.transparent = true;
            } 

            // Store the current hovered placeholder name
            currentHoveredWall = intersectedObject;

            // Change color of hovered placeholder
            intersectedObject.material = orangeMaterial;
        } else {
            // Restore original material
            if (originalWallMaterial != null && currentHoveredWall != null) {
                currentHoveredWall.material = originalWallMaterial;
                currentHoveredWall.transparent = false;
                currentHoveredWall = null;
            }
        }
    } 
}

function clickInConfiguratorMode() {
    // Continue if there's a hovered placeholder
    if (currentHoveredPlaceholder != null) {
        let extractedId = extractIdFromName(currentHoveredPlaceholder.name);

        // Spawn wall with matching id
        if (extractedId != null) {
            let wallId = 'wall' + extractedId;
            animateElements([['together', currentHoveredPlaceholder.name]], .5, true, originalPlaceholderPosition-placeholderHeight, false, false);
            animateElements([['together', wallId]], .5, false, originalWallPosition, true, false);
        }
    // Continue if there's a hovered wall
    } else if (currentHoveredWall != null) {
        // Despawn wall
        let extractedId = extractIdFromName(currentHoveredWall.name);
        if (extractedId != null) {
            let placeholderId = 'placeholder' + extractedId;
            animateElements([['together', placeholderId]], .5, false, originalPlaceholderPosition+placeholderHeight, true, false);
            animateElements([['together', currentHoveredWall.name]], .5, true, newWallPosition, false, false);
        }
    }
}

// Helped function to extract the id from a name -- from wall_10, to _10
function extractIdFromName(name) {
    let regex = /_(\d+)/;
    let idMatch = regex.exec(name);
    let extractedId = idMatch ? idMatch[0] : null;
    return extractedId;
}