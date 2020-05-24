let scene, camera, renderer;
let ADD = 0.1;

let createCube = () => {
    let geometry = new THREE.BoxGeometry(1,1,1);
    let material = new THREE.MeshBasicMaterial({color: 0x00a1cb});
    cube = new THREE.Mesh(geometry, material);

    // wireframe
    var geo = new THREE.EdgesGeometry( cube.geometry );
    var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
    var wireframe = new THREE.LineSegments( geo, mat );
    wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
    cube.add( wireframe );

    scene.add(cube);
}

let initScene = () => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    camera = new THREE.PerspectiveCamera(30,
                windowWidth / windowHeight,
                1, 1000);

    camera.position.z = 5;

    let axes = new THREE.AxesHelper(5);
    scene.add(axes);

    createCube();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(windowWidth, windowHeight);

    document.body.appendChild(renderer.domElement);
}

let mainLoop = () => {
    cube.rotation.y -= ADD;

    if(cube.position.x <= -3 || cube.position.x >= 3) {
        ADD *= -1;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

initScene();
mainLoop();