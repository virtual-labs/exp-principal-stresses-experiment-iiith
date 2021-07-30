'use strict';

document.addEventListener('DOMContentLoaded', function() {

    let scene3d = document.getElementById("scene3d");
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    let camera = new THREE.PerspectiveCamera(
        100, window.innerWidth / window.innerHeight,
        0.5, 1000
    );
    camera.position.z = 300;
    scene.translateX(0);
    scene.translateY(0);
    scene.translateZ(0);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);

    renderer.domElement.style = "display: inline; width: 100%";
    document.body.appendChild(renderer.domElement);

    //Cube
    const geometry = new THREE.BoxGeometry(250, 250, 250);
    const material = new THREE.MeshBasicMaterial({ color: data.colors.material, transparent: true, opacity: 0.0 });
    let cube = new THREE.Mesh(geometry, material);
    let edges = new THREE.EdgesHelper(cube, data.colors.cube);
    edges.matrixAutoUpdate = true;
    edges.material.linewidth = 2;
    scene.add(cube);
    scene.add(edges);
    cube.position.set(0, 0, 0);

    scene3d.appendChild(renderer.domElement);
    renderer.render(scene, camera);
    const tableData = [
        { "σ'": "X", "X": "0.000", "Y": "0.000", "Z": "0.000" },
        { "σ'": "Y", "X": "0.000", "Y": "0.000", "Z": "0.000" },
        { "σ'": "Z", "X": "0.000", "Y": "0.000", "Z": "0.000" },
    ];

    generateTableHead(table, Object.keys(tableData[0]));
    generateTable(table, tableData);

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
        for (let i = 0; i < matrix1.length; i++) {
            result[i] = [];
            for (let j = 0; j < matrix1[i].length; j++) {
                let sum = 0;
                for (let k = 0; k < matrix1[i].length; k++) {
                    sum = sum + matrix1[i][k] * matrix2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    function generateTableHead(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        data.forEach(function(key, ind) {
            let th = document.createElement("th");
            th.innerHTML = key;
            row.appendChild(th);
        });
    };

    function generateTable(table, data) {
        data.forEach(function(rowVals, ind) {
            let row = table.insertRow();
            Object.keys(rowVals).forEach(function(key, i) {
                let cell = row.insertCell();
                cell.innerHTML = rowVals[key];
            });
        });
    };

    function calc(input) {
        const sinx = Math.sin(Math.PI / 180 * input[9]);
        const siny = Math.sin(Math.PI / 180 * input[10]);
        const sinz = Math.sin(Math.PI / 180 * input[11]);
        const cosx = Math.cos(Math.PI / 180 * input[9]);
        const cosy = Math.cos(Math.PI / 180 * input[10]);
        const cosz = Math.cos(Math.PI / 180 * input[11]);
        const rhoXX = cosy * cosz;
        const rhoXY = -sinz * cosy;
        const rhoXZ = siny;
        const rhoYX = sinx * siny * cosz + sinz * cosx;
        const rhoYY = -sinx * siny * sinz + cosx * cosz;
        const rhoYZ = -sinx * cosy;
        const rhoZX = sinx * sinz - siny * cosx * cosz;
        const rhoZY = sinx * cosz + siny * sinz * cosx;
        const rhoZZ = cosx * cosy;
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


        const tableData = [
            { "σ'": "X", "X": principalSigma[0][0].toPrecision(4), "Y": principalSigma[0][1].toPrecision(4), "Z": principalSigma[0][2].toPrecision(4) },
            { "σ'": "Y", "X": principalSigma[1][0].toPrecision(4), "Y": principalSigma[1][1].toPrecision(4), "Z": principalSigma[1][2].toPrecision(4) },
            { "σ'": "Z", "X": principalSigma[2][0].toPrecision(4), "Y": principalSigma[2][1].toPrecision(4), "Z": principalSigma[2][2].toPrecision(4) },
        ];
        table.innerHTML = "";
        generateTableHead(table, Object.keys(tableData[0]));
        generateTable(table, tableData);
    }

    let input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
    });
});