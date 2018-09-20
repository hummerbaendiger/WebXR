function groupBy(arr, property) {

    return arr.reduce(function (memo, x) {
        if (!memo[x[property]]) {
            memo[x[property]] = [];
        }
        memo[x[property]].push(x);
        return memo;
    }, {});

}

function prepareData(name, meshArray, mainWindow) {
    var group = new THREE.Group();
    var clone = new THREE.Group();

    group.name = name;

    if (name != 'blob') mainWindow.model.add(group);

    for (var i = 0; i < meshArray.length; i++) {
        group.add(meshArray[i]);
        meshArray[i].castShadow = true;
        meshArray[i].receiveShadow = true;
        meshArray[i].material = mainWindow.standardMat;
    }
    if (name == 'simple') {
        group.scale.set(5, 5, 5);
    }

    if (name == 'seat') {
        assignMaterials(group);

        clone = createClone(group);
        mainWindow.model.add(clone);

    } else if (name == 'trunk') {
        //  Helper to position pivot point of door
        var translation = new THREE.Matrix4().makeTranslation(-366, -138, 0);
        for (var j = 0; j < meshArray.length; j++) {
            meshArray[j].geometry.applyMatrix(translation);
        }
        group.position.set(366, 138, 0);

        assignMaterials(group);
        mainWindow.gtrunkLid = group;
    } else if (name == 'door' || name == 'door_inside') {
        // Helper to position pivot point of door
        var boxFW = new THREE.Box3().setFromObject(group);
        var translation = new THREE.Matrix4().makeTranslation(-222, -80, -90);
        for (var j = 0; j < meshArray.length; j++) {
            meshArray[j].geometry.applyMatrix(translation);
        }
        if (!mainWindow.gdoorDriver) {
            mainWindow.gdoorDriver = new THREE.Group();
            mainWindow.gdoorDriver.position.set(222, 80, 90);
            mainWindow.gdoorDriver.name = 'gdoor';
        }
        mainWindow.gdoorDriver.add(group);
        assignMaterials(group);

        if (!mainWindow.gdoorCoDriver) {
            mainWindow.gdoorCoDriver = new THREE.Group();
            mainWindow.gdoorCoDriver.position.set(222, 80, -90);
            mainWindow.gdoorCoDriver.name = 'gdoor_clone';
        }
        clone = createClone(group);
        clone.name = group.name + '_clone';
        mainWindow.gdoorCoDriver.add(clone);

        mainWindow.model.add(mainWindow.gdoorDriver);
        mainWindow.model.add(mainWindow.gdoorCoDriver);


    } else if (name == 'paint') {
        assignMaterials(group);
    } else if (name == 'paint2') {
        assignMaterials(group);
        group.add(createClone(meshArray[0]));
    } else if (name == 'frontlamp') {
        assignMaterials(group);
        clone = createClone(group);
        mainWindow.model.add(clone);


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
            if (i != 13 && i != 14 && i != 15 && i != 16) {
                if (i == 5 || i == 6 || i == 7 || i == 8 || i == 9) {
                    // 
                    clone.add(createClone(meshArray[i], false)); // don't mirror logo
                    meshArray[i].rotation.y = THREE.Math.degToRad(-180);
                    meshArray[i].position.x = 574.7;
                } else
                    clone.add(createClone(meshArray[i]));
            }
        }

        mainWindow.model.add(clone);

    } else if (name == 'rearlamp') {
        assignMaterials(group);
        clone = createClone(group);
        mainWindow.model.add(clone);
    } else if (name == 'chrome') {
        assignMaterials(group);
        clone.add(createClone(meshArray[2]));
        clone.add(createClone(meshArray[3]));
        clone.add(createClone(meshArray[4]));
        clone.add(createClone(meshArray[5]));
        mainWindow.model.add(clone);
    } else if (name == 'parts') {
        assignMaterials(group);
        group.add(createClone(meshArray[3]));
        group.add(createClone(meshArray[9]));
        group.add(createClone(meshArray[10]));
        group.add(createClone(meshArray[12]));
        group.add(createClone(meshArray[13]));
        group.add(createClone(meshArray[6]));
        //                        mainWindow.model.add( clone );

    } else if (name == 'window') {
        // Solution for alpha flackering issue 
        meshArray[0].renderOrder = 10000;
    }

    //                else if (name.indexOf('wheel') != -1)q6x
    //                {
    else if (name == 'q6x' || name == 'q8u') {
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
        mainWindow.wheelRL = mainWindow.wheelFL.clone();
        mainWindow.wheelRR = mainWindow.wheelRL.clone();
        mainWindow.wheelRR.rotation.y = THREE.Math.degToRad(180);
        mainWindow.pivotWheelFLRot.add(mainWindow.wheelFL);
        mainWindow.pivotWheelFRRot.add(mainWindow.wheelFR);
        mainWindow.pivotWheelRLRot.add(mainWindow.wheelRL);
        mainWindow.pivotWheelRRRot.add(mainWindow.wheelRR);
    } else if (name == 'j56_front' || name == 'j57_front') {
        assignMaterials(group);
        var boxFW = new THREE.Box3().setFromObject(group);
        for (var j = 0; j < group.children.length; j++) {
            boxFW.getCenter(group.children[j].position);
            // this re-sets the mesh position
            group.children[j].position.multiplyScalar(-1);
        }
        if ('j57_front')
            group.position.y -= 0.3;
        mainWindow.pivotWheelFL.add(group);
        clone = createClone(group);

        mainWindow.pivotWheelFR.add(clone);
        clone.position.x -= 139;
        if ('j57_front')
            clone.position.y -= 53.3;
        else
            clone.position.y -= 54.3;
        clone.position.z += 81;
    } else if (name == 'j56_rear' || name == 'j57_rear') {
        assignMaterials(group);
        if ('j57_rear')
            group.position.y += 1.3;
        clone = createClone(group);
        if ('j57_rear')
            clone.position.y += 1.3;
        mainWindow.model.add(clone);
    } else if (name == 'blob') {

        meshArray[0].material = mainWindow.matBlob;
        group.rotation.z = THREE.Math.degToRad(180);
        group.position.y -= 10;
        group.position.x = 260;
        group.rotation.z = THREE.Math.degToRad(0);
        mainWindow.blob = group;
        mainWindow.scene.add(mainWindow.blob);
    } else {
        // If nothing has to be done with the geometries we can assign the materials
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

    mainWindow.model = new THREE.Group();
    mainWindow.model.name = "CorvetteRoot"
    mainWindow.model.scale.set(0.01, 0.01, 0.01)
    //mainWindow.model.rotation.set(-0.995, -0.68, 0)
    //mainWindow.model.position.set(-3, -7, -3)
    //mainWindow.model.position.set(-4, -1, -3)

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
    mainWindow.pivotWheelRL.position.y = 54.3;
    mainWindow.pivotWheelRL.position.z = 80;
    mainWindow.model.add(mainWindow.pivotWheelRL);

    mainWindow.pivotWheelRR.position.x = 410;
    mainWindow.pivotWheelRR.position.y = 54.3;
    mainWindow.pivotWheelRR.position.z -= 80;
    mainWindow.model.add(mainWindow.pivotWheelRR);

    mainWindow.pivotWheelFL.position.x = 139;
    mainWindow.pivotWheelFL.position.y = 54.3;
    mainWindow.pivotWheelFL.position.z = 81;
    //mainWindow.pivotWheelFL.scale.set(.95, .95, .85);
    mainWindow.pivotWheelFL.rotation.y = THREE.Math.degToRad(30);
    mainWindow.model.add(mainWindow.pivotWheelFL);

    mainWindow.pivotWheelFR.position.x = 139;
    mainWindow.pivotWheelFR.position.y = 54.3;
    mainWindow.pivotWheelFR.position.z -= 81;
    mainWindow.pivotWheelFR.rotation.y = THREE.Math.degToRad(30);
    mainWindow.model.add(mainWindow.pivotWheelFR);

    mainWindow.scene.add(mainWindow.model);
}