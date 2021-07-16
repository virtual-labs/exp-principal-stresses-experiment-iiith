'use strict';

let scene3d = document.getElementById("scene3d");
let scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
let camera = new THREE.PerspectiveCamera(
    100, window.innerWidth / window.innerHeight,
    0.5, 1000
);
camera.position.z = 400;
scene.translateX(0);
scene.translateY(0);
scene.translateZ(0);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
document.body.appendChild(renderer.domElement);

//Cube
let geometry = new THREE.BoxGeometry(250, 250, 250);
let material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0 });
let cube = new THREE.Mesh(geometry, material);
let edges = new THREE.EdgesHelper(cube, 0x000000);
edges.matrixAutoUpdate = true;
edges.material.linewidth = 2;
scene.add(cube);
scene.add(edges);
cube.position.set(0, 0, 0);

scene3d.appendChild(renderer.domElement);
renderer.render(scene, camera);

function animate(a, b, c) {

    cube.rotation.x = a * Math.PI / 180;
    cube.rotation.y = b * Math.PI / 180;
    cube.rotation.z = c * Math.PI / 180;
    edges.rotation.x = a * Math.PI / 180;
    edges.rotation.y = b * Math.PI / 180;
    edges.rotation.z = c * Math.PI / 180;
    scene3d.appendChild(renderer.domElement);
    renderer.render(scene, camera);
}

function matMult(matrix1, matrix2) {
    let result = [];
    for (let i = 0; i < 3; i++) {
        result[i] = [];
        for (let j = 0; j < 3; j++) {
            result[i][j] = 0;
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let sum = 0;
            for (let k = 0; k < 3; k++) {
                sum = sum + matrix1[i][k] * matrix2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

function calc(input) {
    let sinx = Math.sin(Math.PI / 180 * input[9]);
    let siny = Math.sin(Math.PI / 180 * input[10]);
    let sinz = Math.sin(Math.PI / 180 * input[11]);
    let cosx = Math.cos(Math.PI / 180 * input[9]);
    let cosy = Math.cos(Math.PI / 180 * input[10]);
    let cosz = Math.cos(Math.PI / 180 * input[11]);
    let rhoXX = cosy * cosz;
    let rhoXY = -sinz * cosy;
    let rhoXZ = siny;
    let rhoYX = sinx * siny * cosz + sinz * cosx;
    let rhoYY = -sinx * siny * sinz + cosx * cosz;
    let rhoYZ = -sinx * cosy;
    let rhoZX = sinx * sinz - siny * cosx * cosz;
    let rhoZY = sinx * cosz + siny * sinz * cosx;
    let rhoZZ = cosx * cosy;
    let rho = [];
    let sigma = [];
    let final = [];
    let principalSigma = [];
    rho.push([rhoXX, rhoXY, rhoXZ]);
    rho.push([rhoYX, rhoYY, rhoYZ]);
    rho.push([rhoZX, rhoZY, rhoZZ]);
    final.push([rhoXX, rhoYX, rhoZX]);
    final.push([rhoXY, rhoYY, rhoZY]);
    final.push([rhoXZ, rhoYZ, rhoZZ]);
    sigma.push([input[0], input[3], input[4]]);
    sigma.push([input[5], input[1], input[6]]);
    sigma.push([input[7], input[8], input[2]]);
    principalSigma = matMult(matMult(rho, sigma), final);

    document.getElementById("bxx").innerHTML = principalSigma[0][0].toPrecision(10);
    document.getElementById("bxy").innerHTML = principalSigma[0][1].toPrecision(10);
    document.getElementById("bxz").innerHTML = principalSigma[0][2].toPrecision(10);
    document.getElementById("byx").innerHTML = principalSigma[1][0].toPrecision(10);
    document.getElementById("byy").innerHTML = principalSigma[1][1].toPrecision(10);
    document.getElementById("byz").innerHTML = principalSigma[1][2].toPrecision(10);
    document.getElementById("bzx").innerHTML = principalSigma[2][0].toPrecision(10);
    document.getElementById("bzy").innerHTML = principalSigma[2][1].toPrecision(10);
    document.getElementById("bzz").innerHTML = principalSigma[2][2].toPrecision(10);
}

let input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const sliders = ["XX", "YY", "ZZ", "XY", "XZ", "YX", "YZ", "ZX", "ZY", "X", "Y", "Z"];

sliders.forEach(function(elem, ind) {
    const slider = document.getElementById("myRange" + elem);
    const output = document.getElementById("demo" + elem);
    slider.oninput = function() {
        output.innerHTML = this.value;
        input[ind] = this.value;

        if (ind > 2 && ind < 9) {
            const slider2 = document.getElementById("myRange" + elem[1] + elem[0]);
            const output2 = document.getElementById("demo" + elem[1] + elem[0]);
            slider2.value = this.value;
            output2.innerHTML = this.value;
        }
        animate(input[9], input[10], input[11]);
        calc(input);
    }
})