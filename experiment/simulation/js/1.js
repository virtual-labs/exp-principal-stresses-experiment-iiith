var scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
                var camera = new THREE.PerspectiveCamera(
            100, window.innerWidth/window.innerHeight,
            0.5, 1000
        );
        camera.position.z =400;
        scene.translateX(0);
        scene.translateY(0);
        scene.translateZ(0);

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth , window.innerHeight/2);
        document.body.appendChild(renderer.domElement);

        //Cube
        var geometry = new THREE.BoxGeometry(150, 150, 150);
        geometry.translate( -75, -75, -75 );
        var material = new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true , opacity:0.0});
        var cube = new THREE.Mesh(geometry,material);//, material);
        var edges = new THREE.EdgesHelper( cube, 0x000000 );
        edges.matrixAutoUpdate = true;
        edges.material.linewidth = 2;
        scene.add(cube);
        scene.add( edges );
        cube.position.set(0, 0, 0);        
        function animate(a,b,c){
        //         requestAnimationFrame(animate);

            cube.rotation.x = a*Math.PI/180;
            cube.rotation.y = b*Math.PI/180;
            cube.rotation.z = c*Math.PI/180;
            edges.rotation.x = a*Math.PI/180;
            edges.rotation.y = b*Math.PI/180;
            edges.rotation.z = c*Math.PI/180;
            renderer.render(scene, camera);
        }
//        setInterval(animate,500,1,1,1);
       //animate(1,0,0);