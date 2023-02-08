let camera, scene, renderer;

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );
let collection = new Map();

init();

function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 500 );
    camera.position.z = 2;

    scene = new THREE.Scene();
    

    
    var textBoxShape = new THREE.PlaneGeometry( 2,1 );
    var textBoxBackgroundColor = new THREE.MeshBasicMaterial({color: 0xFF99CC} );
    var firstTextBox = new THREE.Mesh(textBoxShape, textBoxBackgroundColor);
    scene.add( firstTextBox );

    

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    

    document.addEventListener( 'wheel', onMouseWheel, false );
		window.addEventListener( 'resize', onResize, false );

}

function onMouseWheel( event ) {

  camera.position.z += event.deltaY * 0.1; // move camera along z-axis

}

function onResize( event ) {

	const width = window.innerWidth;
	const height = window.innerHeight;
  
  windowHalf.set( width / 2, height / 2 );
	
  camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );
				
}

function animate() {

  requestAnimationFrame( animate );
  renderer.render( scene, camera );

}


animate();