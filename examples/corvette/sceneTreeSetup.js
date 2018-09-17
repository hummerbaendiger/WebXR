function prepareData(name, meshArray, mainWindow) {
    var group = new THREE.Group();
    var clone = new THREE.Group();

    group.name = name;

    if (name != 'blob') mainWindow.modelRoot.add(group);

    for (var i = 0; i < meshArray.length; i++) {
        group.add(meshArray[i]);

        meshArray[i].castShadow = true;
        meshArray[i].receiveShadow = true;
        meshArray[i].material = mainWindow.standardMat;
    }
    if (name == 'simple') {
        group.scale.set(5, 5, 5);
    }
    if (name == 'windowpane') {
        assignMaterials(group);
        group.add(createClone(meshArray[1]));
        group.add(createClone(meshArray[2]));

    }
    if (name == 'trunk') {}
    if (name == 'door') {
        assignMaterials(group);
        clone = createClone(group);
        mainWindow.modelRoot.add(clone);
    }
    if (name == 'paint2') {
        assignMaterials(group);
        group.add(createClone(meshArray[0]));

    } else if (name == 'frontlamp') {
        assignMaterials(group);
        clone = createClone(group);
        mainWindow.modelRoot.add(clone);
    } else if (name == 'front') {
        assignMaterials(group);
        group.add(createClone(meshArray[0]));
    } else if (name == 'rear') {
        assignMaterials(group);
        group.add(createClone(meshArray[2]));
        group.add(createClone(meshArray[16]));
        group.add(createClone(meshArray[17]));
        group.add(createClone(meshArray[19]));
        group.add(createClone(meshArray[20]));
        group.add(createClone(meshArray[21]));
        group.add(createClone(meshArray[22]));

    } else if (name == 'side') {
        assignMaterials(group);
        for (var i = 0; i < meshArray.length; i++) {
            if (i != 13 && i != 14 && i != 15 && i != 16)
                clone.add(createClone(meshArray[i]));
        }
        mainWindow.modelRoot.add(clone);
    } else if (name == 'rearlamp') {
        assignMaterials(group);
        clone = createClone(group);
        mainWindow.modelRoot.add(clone);
    } else if (name == 'brake_front') {
        assignMaterials(group);
        var boxFW = new THREE.Box3().setFromObject(group);
        for (var j = 0; j < group.children.length; j++) {
            boxFW.getCenter(group.children[j].position);
            // this re-sets the mesh position
            group.children[j].position.multiplyScalar(-1);
        }

        mainWindow.pivotWheelFL.add(group);
        clone = createClone(group);

        mainWindow.pivotWheelFR.add(clone);
        clone.position.x -= 139;
        clone.position.y -= 53.5;
        clone.position.z += 81;
    } else if (name == 'brake_rear') {
        assignMaterials(group);
        clone = createClone(group);
        mainWindow.modelRoot.add(clone);
    } else if (name == 'chrome') {
        assignMaterials(group);
        clone.add(createClone(meshArray[2]));
        clone.add(createClone(meshArray[3]));
        clone.add(createClone(meshArray[4]));
        clone.add(createClone(meshArray[5]));
        mainWindow.modelRoot.add(clone);
    } else if (name == 'parts') {
        assignMaterials(group);
        group.add(createClone(meshArray[3]));
        group.add(createClone(meshArray[9]));
        group.add(createClone(meshArray[10]));
        group.add(createClone(meshArray[12]));
        group.add(createClone(meshArray[13]));
        group.add(createClone(meshArray[6]));

    } else if (name == 'blob') {

        meshArray[0].material = mainWindow.matBlob;
        group.rotation.z = THREE.Math.degToRad(180);
        group.position.y -= 10;
        group.position.x = 260;

        // Other Blob
        group.rotation.z = THREE.Math.degToRad(0);
        mainWindow.blob = group;
        mainWindow.modelRoot.add(mainWindow.blob);
    } else if (name == 'window') {
        // Solution for alpha flackering issue 
        meshArray[0].renderOrder = 10000;
    } else if (name.indexOf('wheel') != -1) {

        mainWindow.pivotWheelRLRot.remove(mainWindow.wheelRL);
        mainWindow.pivotWheelRRRot.remove(mainWindow.wheelRR);
        mainWindow.pivotWheelFLRot.remove(mainWindow.wheelFL);
        mainWindow.pivotWheelFRRot.remove(mainWindow.wheelFR);

        mainWindow.wheelFL = group;

        assignMaterials(group);

        var boxFW = new THREE.Box3().setFromObject(mainWindow.wheelFL);

        for (var j = 0; j < mainWindow.wheelFL.children.length; j++) {
            boxFW.getCenter(mainWindow.wheelFL.children[j].position);
            // this re-sets the mesh position

            mainWindow.wheelFL.children[j].position.multiplyScalar(-1);
        }

        mainWindow.wheelFR = mainWindow.wheelFL.clone();
        mainWindow.wheelFR.rotation.y = THREE.Math.degToRad(180);
        //
        mainWindow.wheelRL = mainWindow.wheelFL.clone();

        mainWindow.wheelRR = mainWindow.wheelRL.clone();
        mainWindow.wheelRR.rotation.y = THREE.Math.degToRad(180);
        mainWindow.pivotWheelFLRot.add(mainWindow.wheelFL);
        mainWindow.pivotWheelFRRot.add(mainWindow.wheelFR);
        mainWindow.pivotWheelRLRot.add(mainWindow.wheelRL);
        mainWindow.pivotWheelRRRot.add(mainWindow.wheelRR);

    } else {
        assignMaterials(group);
    }
}

function createClone(obj) {

    var clonedObj;
    //                var materialClone;
    var mS = (new THREE.Matrix4()).identity();
    //set -1 to the corresponding axis
    //                mS.elements[10] = -1;
    mS.elements[10] = -1;

    if (obj.type == 'Object3D' || obj.type == 'Group') {

        if (obj.type == 'Object3D')
            clonedObj = new THREE.Object3D();
        else
            clonedObj = new THREE.Group();
        clonedObj.applyMatrix(mS);

        for (var j = 0; j < obj.children.length; j++) {
            //                        materialClone = obj.children[j].material.clone();
            var newMesh = new THREE.Mesh(obj.children[j].geometry.clone(), obj.children[j].material);
            if (obj.children[j].castShadow) newMesh.castShadow = true;
            if (obj.children[j].receiveShadow) newMesh.receiveShadow = true;
            newMesh.material.side = 2; // Clickable clones = 2
            newMesh.material.shadowSide = 1;
            clonedObj.add(newMesh);
        }
    } else if (obj.type == 'Mesh') {
        clonedObj = new THREE.Mesh(obj.geometry.clone(), obj.material); //obj.material.clone()
        if (obj.castShadow) clonedObj.castShadow = true;
        if (obj.receiveShadow) clonedObj.receiveShadow = true;
        clonedObj.applyMatrix(mS);
        clonedObj.material.side = 2; // Clickable clones = 2
        clonedObj.material.shadowSide = 1;

    }
    //                console.log(clonedObj);
    return clonedObj;

}

function setupHelperGroups(mainWindow) {

    mainWindow.modelRoot = new THREE.Group();
    mainWindow.modelRoot.name = "CorvetteRoot"
    mainWindow.modelRoot.scale.set(0.01,0.01,0.01)
    mainWindow.modelRoot.position.set(-5,-7,-3)
    //mainWindow.modelRoot.position.set(-4, -1, -3)

    mainWindow.pivotWheelFL = new THREE.Group();
    mainWindow.pivotWheelFR = new THREE.Group();
    mainWindow.pivotWheelRL = new THREE.Group();
    mainWindow.pivotWheelRR = new THREE.Group();
    mainWindow.pivotWheelFL.name = 'wheelFL';
    mainWindow.pivotWheelFR.name = 'wheelFR';
    mainWindow.pivotWheelRL.name = 'wheelRL';
    mainWindow.pivotWheelRR.name = 'wheelRR';

    mainWindow.pivotWheelFLRot = new THREE.Group();
    mainWindow.pivotWheelFL.add(mainWindow.pivotWheelFLRot);
    mainWindow.pivotWheelFRRot = new THREE.Group();
    mainWindow.pivotWheelFR.add(mainWindow.pivotWheelFRRot);

    mainWindow.pivotWheelRLRot = new THREE.Group();
    mainWindow.pivotWheelRL.add(mainWindow.pivotWheelRLRot);
    mainWindow.pivotWheelRRRot = new THREE.Group();
    mainWindow.pivotWheelRR.add(mainWindow.pivotWheelRRRot);

    mainWindow.pivotWheelRL.position.x += 410;
    mainWindow.pivotWheelRL.position.y = 54.5;
    mainWindow.pivotWheelRL.position.z = 80;
    mainWindow.modelRoot.add(mainWindow.pivotWheelRL);

    mainWindow.pivotWheelRR.position.x = 410;
    mainWindow.pivotWheelRR.position.y = 54.5;
    mainWindow.pivotWheelRR.position.z -= 80;
    mainWindow.modelRoot.add(mainWindow.pivotWheelRR);

    mainWindow.pivotWheelFL.position.x = 139;
    mainWindow.pivotWheelFL.position.y = 53.5;
    mainWindow.pivotWheelFL.position.z = 81;
    mainWindow.pivotWheelFL.scale.set(.95, .95, .85);
    mainWindow.pivotWheelFL.rotation.y = THREE.Math.degToRad(30);
    mainWindow.modelRoot.add(mainWindow.pivotWheelFL);
    //               

    mainWindow.pivotWheelFR.position.x = 139;
    mainWindow.pivotWheelFR.position.y = 53.5;
    mainWindow.pivotWheelFR.position.z -= 81;
    mainWindow.pivotWheelFR.rotation.y = THREE.Math.degToRad(30);
    mainWindow.modelRoot.add(mainWindow.pivotWheelFR);

    mainWindow.scene.add(mainWindow.modelRoot);
}