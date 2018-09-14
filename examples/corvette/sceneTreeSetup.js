function prepareData(name, meshArray) {
    var group = new THREE.Group();
    var clone = new THREE.Group();

    group.name = name;

    if (name != 'blob') _this.model.add(group);

    for (var i = 0; i < meshArray.length; i++) {
        group.add(meshArray[i]);

        meshArray[i].castShadow = true;
        meshArray[i].receiveShadow = true;
        meshArray[i].material = _this.standardMat;
    }
    if (name == 'simple') {
        group.scale.set(5, 5, 5);
    }
    if (name == 'windowpane') {
        assignMaterials(group);
        group.add(createClone(meshArray[1]));
        group.add(createClone(meshArray[2]));

    }
    if (name == 'trunk') {
    }
    if (name == 'door') {
        assignMaterials(group);
        clone = createClone(group);
        _this.model.add(clone);
    }
    if (name == 'paint2') {
        assignMaterials(group);
        group.add(createClone(meshArray[0]));

    } else if (name == 'frontlamp') {
        assignMaterials(group);
        clone = createClone(group);
        _this.model.add(clone);
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
        _this.model.add(clone);
    } else if (name == 'rearlamp') {
        assignMaterials(group);
        clone = createClone(group);
        _this.model.add(clone);
    } else if (name == 'brake_front') {
        assignMaterials(group);
        var boxFW = new THREE.Box3().setFromObject(group);
        for (var j = 0; j < group.children.length; j++) {
            boxFW.getCenter(group.children[j].position);
            // this re-sets the mesh position
            group.children[j].position.multiplyScalar(-1);
        }

        _this.pivotWheelFL.add(group);
        clone = createClone(group);

        _this.pivotWheelFR.add(clone);
        clone.position.x -= 139;
        clone.position.y -= 53.5;
        clone.position.z += 81;
    } else if (name == 'brake_rear') {
        assignMaterials(group);
        clone = createClone(group);
        _this.model.add(clone);
    } else if (name == 'chrome') {
        assignMaterials(group);
        clone.add(createClone(meshArray[2]));
        clone.add(createClone(meshArray[3]));
        clone.add(createClone(meshArray[4]));
        clone.add(createClone(meshArray[5]));
        _this.model.add(clone);
    } else if (name == 'parts') {
        assignMaterials(group);
        group.add(createClone(meshArray[3]));
        group.add(createClone(meshArray[9]));
        group.add(createClone(meshArray[10]));
        group.add(createClone(meshArray[12]));
        group.add(createClone(meshArray[13]));
        group.add(createClone(meshArray[6]));

    } else if (name == 'blob') {

        meshArray[0].material = _this.matBlob;
        group.rotation.z = THREE.Math.degToRad(180);
        group.position.y -= 10;
        group.position.x = 260;

        // Other Blob
        group.rotation.z = THREE.Math.degToRad(0);
        _this.blob = group;
        _this.scene.add(_this.blob);
    } else if (name == 'window') {
        // Solution for alpha flackering issue 
        meshArray[0].renderOrder = 10000;
    }

    else if (name.indexOf('wheel') != -1) {

        _this.pivotWheelRLRot.remove(_this.wheelRL);
        _this.pivotWheelRRRot.remove(_this.wheelRR);
        _this.pivotWheelFLRot.remove(_this.wheelFL);
        _this.pivotWheelFRRot.remove(_this.wheelFR);

        _this.wheelFL = group;

        assignMaterials(group);

        var boxFW = new THREE.Box3().setFromObject(_this.wheelFL);

        for (var j = 0; j < _this.wheelFL.children.length; j++) {
            boxFW.getCenter(_this.wheelFL.children[j].position);
            // this re-sets the mesh position

            _this.wheelFL.children[j].position.multiplyScalar(-1);
        }

        _this.wheelFR = _this.wheelFL.clone();
        _this.wheelFR.rotation.y = THREE.Math.degToRad(180);
        //
        _this.wheelRL = _this.wheelFL.clone();

        _this.wheelRR = _this.wheelRL.clone();
        _this.wheelRR.rotation.y = THREE.Math.degToRad(180);
        _this.pivotWheelFLRot.add(_this.wheelFL);
        _this.pivotWheelFRRot.add(_this.wheelFR);
        _this.pivotWheelRLRot.add(_this.wheelRL);
        _this.pivotWheelRRRot.add(_this.wheelRR);
  
    } else {
        assignMaterials(group);
    }
}