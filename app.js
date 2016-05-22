window.addEventListener("load", init, false);

var 
scene, camera, fieldOfView, aspectRation, nearPlane, farPlane, HEIGHT, WIDTH, renderer, container;

function init() {

	//Set up scene, create camera, render
	createScene();

	//Add the lights
	createLights();

	//Add the objects
	createPlane();
	createSea();
	createSky();

	//Start a loop that will update the object's positions and render the scene for each frame
	loop();

}

function createScene(){

	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;

	//Create Scene
	scene = new THREE.Scene()
	scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

	//Create camera
	aspectRatio = WIDTH / HEIGHT;
	fieldOfView = 60;
	nearPlane = 1; 
	farPlace = 10000;
	camera = new THREE.PerspectiveCamera(
		fieldOfView,
		aspectRatio,
		nearPlane,
		farPlane
	);

	//Set position of camera
	camera.position.x = 0;
	camera.position.z = 400;
	camera.position.y = 100;

	//Renderer
	renderer = new THREE.WebGLRenderer({
		alpha: true, 
		antialias: true
	});
	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.enabled = true;

	//Add DOM element of the renderer to the container we made in HTML
	container = document.getElementById("world");
	container.appendChild( renderer.domElement );

	//Event handlers for window
	window.addEventListener('resize', handleWindowResize, false);

};

var hemisphereLight, shadowLight;

function createLights(){};

function createPlane(){};

var Sea = function() {

	//Create the geometry (Shape) of the cylinder
	//The parameters are: 
	//Radius top, Radius bottom, height, number of segments on the radius, number of segments vertically.
	var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);

	//rotate the geometry on the x axis 
	geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));

	//create the material
	var mat = new THREE.MeshPhongMaterial({
		color: Colors.blue,
		transparent: true,
		opacity: 0.6,
		shading: THREE.FlatShading
	});

	//To create a mesh in Three.js we have to create a mesh which is a combination of a geometry and a material
	this.mesh = new THREE.Mesh(geom, mat);

	//Allow sea to recieve shadows
	this.mesh.recieveShadow = true;

}

var sea;

function createSea(){

	sea = new Sea();

	//push it a little bit at the bottom of the scene
	sea.mesh.position.y = -600;

	//add the mesh of the sea to the scene
	scene.add(sea.mesh);

};

function createSky(){};

function handleWindowResize(){
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
};

function loop(){

	//Rotate stuff
	sea.mesh.rotation.z += 0.005;	

	//Render scene
	renderer.render(scene, camera);

	//Call loop again
	requestAnimationFrame(loop);
};