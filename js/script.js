


var viewAngle = 75;
var aspectRatio = window.innerWidth / window.innerHeight;
var near = 0.1;
var far = 5000;
var camera = new THREE.PerspectiveCamera(viewAngle, aspectRatio, near, far);
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var cube;
var group;
var sphere;
var pointLight = new THREE.PointLight(0xFFFFFF);
var mouseX = 0;
var mouseY = 0;
var fov=0;
var input = data.computer.saturday.parallels_desktop;

function init(){
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.body.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
  window.addEventListener('resize',onWindowResize,false);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  pointLight.position.x = 10;
  pointLight.position.y = 1000;
  pointLight.position.z = 200;

  createSpheres(9,10,10,input/20);  //electrons
  centralSphere(input/10,10,10,0); //central sphere
  scene.add(sphere,group);
  scene.add(pointLight);
  camera.position.y = 100;
  camera.position.z = 3000;
  camera.lookAt(new THREE.Vector3(0,0,0));
  scene.add(camera);
}




function createSpheres(rad,seg,rings,num){
  var createSphere = function(){
    var newSphere = new THREE.SphereGeometry()
  };

  var radius = rad;
  var segments = seg;
  var rings = rings;
  var sphereMaterial = new THREE.MeshBasicMaterial(
    {
      color: 0xFFFFFF,
      wireframe: false
    });
    var sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);
    group = new THREE.Object3D();
    for(var i =0;i<num;i++){
      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.x = Math.random(i)*Math.cos(Math.PI/(num/2)*i)*700;
      sphere.position.y =Math.random(i)*Math.sin(Math.PI/(num/2)* i)*700;
      sphere.position.z = Math.random(i)*1000-500;

      group.add(sphere);
    }
  }


  function centralSphere(rad,seg,rings){
    var createSphere = function(){
      var newSphere = new THREE.SphereGeometry()
    };

    var radius = rad;
    var segments = seg;
    var rings = rings;
    var sphereMaterial = new THREE.MeshBasicMaterial(
      {
        color: 0xFFFFFF,
        wireframe: true
      });

      var sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);
      sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    }


    //var frameCount=0;

    function animatedRender(){
      requestAnimationFrame(animatedRender);
      sphere.rotation.x +=0.01;
      sphere.rotation.y +=0.01;
      group.rotation.x +=-0.08*input/1000;
      group.rotation.y +=-0.04*input/1000;
      group.rotation.z +=0.015*input/1000;
      renderer.render(scene,camera);

      //set background color
      bgColor = new THREE.Color(0,0,0);
      renderer.setClearColor(bgColor,1);
      camera.position.x += (mouseX - camera.position.x) * 0.01;
      camera.position.y += (-mouseY - camera.position.y) * 0.01;

    }



    function onDocumentMouseMove(event){
      mouseX = (event.clientX - window.innerWidth/2);
      mouseY = (event.clientY -window.innerHeight/2);
    }

    function onDocumentMouseWheel(event)
    {
      camera.position.z -= event.wheelDeltaY * 0.5;
    }


    function onWindowResize(){
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth,window.innerHeight);
    }

    init();
    animatedRender();
