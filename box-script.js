var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 1;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var texts = [  "Dear Kassidy",  "I would be delighted",  "Absolutely thrilled",  "Completely ecstatic",  "If you said yes to",  "Being my valentine's"];

var planes = [];
for (var i = 0; i < texts.length; i++) {
  var text = createText(texts[i]);
  text.position.z = -i * 30;
  planes.push(text);
  scene.add(text);
}



createGradientBackground();

var heartShape = new THREE.Shape();
heartShape.moveTo( 75, 40 );
heartShape.bezierCurveTo( 75, 37, 70, 25, 50, 25 );
heartShape.bezierCurveTo( 20, 25, 20, 62.5, 20, 62.5 );
heartShape.bezierCurveTo( 20, 80, 40, 102, 75, 120 );
heartShape.bezierCurveTo( 110, 102, 130, 80, 130, 62.5 );
heartShape.bezierCurveTo( 130, 62.5, 130, 25, 100, 25 );
heartShape.bezierCurveTo( 85, 25, 75, 37, 75, 40 );

var extrudeSettings = {
  steps: 2,
  depth: 10,
  bevelEnabled: true,
  bevelThickness: 2,
  bevelSize: 2,
  bevelSegments: 1
};

var heartGeometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );
var heartMaterial = new THREE.MeshBasicMaterial( { color: 0xff69b4 } );
var heart = new THREE.Mesh( heartGeometry, heartMaterial ) ;
heart.scale.set(0.2, 0.2, 0.2);
heart.position.z = -250

scene.add(heart)


function createText(text) {
  var canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  var context = canvas.getContext("2d");
  context.fillStyle = "darkred";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "white";
  context.font = "96px Arial";
  context.textAlign = "center";
  context.fillText(text, canvas.width/2, canvas.height/2);

  var texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  var material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
  var mesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), material);
  mesh.scale.set(0.1, 0.1, 1);
  mesh.position.set(0, 0, 0);
  return mesh;
}

function createGradientBackground() {
  var canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  var context = canvas.getContext("2d");

  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#ff0066");
  gradient.addColorStop(1, "#ffa07a");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  var texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  var material = new THREE.MeshBasicMaterial({map: texture});
  
  
  meshCollection = [];
  for (var i = 0; i < planes.length; i++){
    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material);
    mesh.position.z = -i * 30;
    meshCollection.push(mesh);
    scene.add(mesh)
  }
  
  return mesh;
}


counter = 0;
function animate() {
  requestAnimationFrame( animate );

  renderer.render( scene, camera );

  for (var i = 0; i < planes.length; i++) {
    planes[i].material.opacity = 100;
  }

  if (camera.position.z > 8){
    camera.position.set(0,0,8)
  }
  

  if(camera.position.z<planes[planes.length-1].position.z-3 && counter == 0){
    alert("What took me so long was creating a 3D space in the browser, but what took the most...was this freaking 3D heart. I figured out how to draw it, I cannot wrap my head around how to make be rightside up lmao.");
    alert("In any case...I love you mi amor <3 I love you more than yesterday, but less than tomorrow.");
    counter++;
  }

  heart.rotation.y += 0.03;

  document.addEventListener( 'wheel', onMouseWheel, false );
  window.addEventListener( 'resize', onResize, false );

}

animate();


function onMouseWheel( event ) {

  camera.position.z += event.deltaY * 0.1; // move camera along z-axis

}

function onResize( event ) {

	const width = window.innerWidth;
	const height = window.innerHeight;
  
  windowHalf.set( width / 2, height / 2 );

  angle += 0.01;
  heart.rotation.x = angle;
  heart.rotation.y = angle;
	
  camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );
				
}