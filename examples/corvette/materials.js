function CreateMaterialLibrary() {
    _this.matSimple = new THREE.MeshStandardMaterial({
        color: 0x555555,
        side: 2
    });
    _this.standardMat = new THREE.MeshPhysicalMaterial({
        color: 0x888888,
        roughness: 1,
        metalness: 0,
        envMapIntensity: 1,
        clearCoat: 1,
        clearCoatRoughness: 1,
        reflectivity: 1,
    });

    _this.matBlack = new THREE.MeshBasicMaterial({
        color: 0,
        side: 2
    });

    _this.matLicense = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 1,
        map: _this.loaderc.load('textures/model/exterior/licenseplate_' + _this.textureformat + '.ktx', function (texture) {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearFilter;
            texture.repeat.set(1, 2);
        })
    });

    _this.matPrimer = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 1,
        metalness: 1,
        side: 2
    });

    _this.matInteriorBlack = new THREE.MeshStandardMaterial({
        color: 0x191919,
        roughness: 1,
        metalness: 0,
        envMapIntensity: 0.2,
        side: 0
    });

    _this.matPlasticGloss = new THREE.MeshStandardMaterial({
        color: 0, //0xb91524
        roughness: 0,
        metalness: 1,
        envMapIntensity: 1
    });
    _this.matWhite = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: 2
    });

    _this.matPlastic = new THREE.MeshStandardMaterial({
        color: 0x222222, //0xb91524
        roughness: 0.5,
        metalness: 0,
        envMapIntensity: .5,
        side: 2
    });
    _this.matPlasticDark = new THREE.MeshStandardMaterial({
        color: 0x151515, //0xb91524
        roughness: .6,
        metalness: 0,
        envMapIntensity: 0.2,
        side: 2
    });

    _this.matTread = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        roughness: 1,
        metalness: 0,
        map: _this.wheelTexture,
        bumpMap: _this.wheelTexture,
        bumpScale: 2,
        clearCoat: .5,
        clearCoatRoughness: 0.5,
        envMapIntensity: 0.1,
        reflectivity: 1,
        side: 0
    });
    _this.matTire = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 1,
        metalness: 0,
        map: _this.wheelTexture2,
        clearCoat: 0,
        clearCoatRoughness: 0.5,
        envMapIntensity: .3,
        reflectivity: 0,
        side: 0
    });

    // Bremsscheibe
    _this.matDisk = new THREE.MeshPhysicalMaterial({
        color: 0x666666,
        roughness: 0.3,
        map: _this.discTexture,
        metalness: 1,
        clearCoat: .5,
        clearCoatRoughness: 0.5,
        reflectivity: 0,
        side: 2,
    });

    // Bremsklotz
    _this.matCaliper = new THREE.MeshPhysicalMaterial({
        color: 0xFFC32B,
        roughness: 0.5,
        metalness: 0.5,
        clearCoat: 1,
        clearCoatRoughness: 0.2,
        envMapIntensity: .6,
        reflectivity: .5
    });
    _this.matCaliper.map = createColorTexture('#FFC32B');
    _this.matCaliper.color.setHex(0xffffff);

    _this.matCaliperLogo = new THREE.MeshBasicMaterial({
        color: 0,
        side: 2
    });

    _this.matStripe = new THREE.MeshPhysicalMaterial({
        color: 0xFFC32B,
        roughness: 0.5,
        metalness: 0.5,
        clearCoat: 1,
        clearCoatRoughness: 0.2,
        envMapIntensity: .6,
        reflectivity: .5
    });
    _this.matStripe.map = createColorTexture('#FFC32B');
    _this.matStripe.color.setHex(0xffffff);

    _this.matPaint = new THREE.MeshPhysicalMaterial({
        color: _this.paintTotal[_this.paintPos - 1].color, //0x0B1940
        roughness: _this.paintTotal[_this.paintPos - 1].roughness,
        metalness: _this.paintTotal[_this.paintPos - 1].metalness,
        clearCoat: _this.paintTotal[_this.paintPos - 1].clearCoat,
        clearCoatRoughness: _this.paintTotal[_this.paintPos - 1].clearCoatRoughness,
        envMapIntensity: _this.paintTotal[_this.paintPos - 1].envMapIntensity,
        reflectivity: _this.paintTotal[_this.paintPos - 1].reflectivity
    });
    _this.matPaint.map = createColorTexture('#' + _this.matPaint.color.getHexString());
    _this.matPaint.color.setHex(0xffffff);
    _this.matMirror = new THREE.MeshPhysicalMaterial({
        //                        color: paintTotal[1],
        color: new THREE.Color().setHex(0),
        roughness: 1,
        metalness: 1,
        clearCoat: 1,
        clearCoatRoughness: 0,
        reflectivity: .7,
        side: 2
    });
    _this.matMirrorGlas = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0,
        metalness: 0,
        clearCoat: 1,
        depthWrite: false,
        clearCoatRoughness: 0,
        reflectivity: 1,
        transparent: false,
        side: 2
    });
    _this.matWindow = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0,
        metalness: 1,
        opacity: .8,
        transparent: true,
        side: 2
    });
    _this.matWindowPrivat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0,
        metalness: 1,
        opacity: .8,
        transparent: true,
        side: 2
    });
    _this.matGlas = new THREE.MeshStandardMaterial({
        color: 0x666666,
        depthWrite: true,
        roughness: 0,
        metalness: .5,
        opacity: .45,
        transparent: true,
        side: 2
    });

    _this.matGlasDark = new THREE.MeshStandardMaterial({
        color: 0x444444,
        depthWrite: false,
        roughness: 1,
        metalness: 0,
        opacity: .45,
        transparent: true,
        side: 1
    });
    _this.matGlasRed = new THREE.MeshStandardMaterial({
        color: 0xff0000, //0xc80009
        roughness: 0,
        metalness: .75,
        envMapIntensity: .7,
        opacity: .65,
        transparent: true,
        side: 2
    });
    _this.matGlasOrange = new THREE.MeshStandardMaterial({
        color: 0xF44900, //0xc80009
        roughness: 0,
        metalness: .75,
        envMapIntensity: .7,
        opacity: .65,
        transparent: true,
        side: 2
    });
    _this.matAlu = new THREE.MeshPhysicalMaterial({
        color: 0x555555,
        roughness: 0.2,
        metalness: 0.4,
        clearCoat: 1,
        clearCoatRoughness: 0,
        envMapIntensity: .4,
        reflectivity: .6,
        metalnessMap: false,
        roughnessMap: false //wheelTexture
    });
    _this.matAluDark = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        roughness: 0,
        metalness: 0.4,
        clearCoat: 1,
        clearCoatRoughness: 0,
        envMapIntensity: .1,
        reflectivity: 1,
        metalnessMap: false,
        roughnessMap: false //wheelTexture
    });
    _this.matAlu2 = new THREE.MeshPhysicalMaterial({
        color: 0x555555,
        roughness: 0.2,
        metalness: 0.4,
        clearCoat: 1,
        clearCoatRoughness: 0,
        envMapIntensity: .2,
        reflectivity: .6,
        metalnessMap: false,
        roughnessMap: false //wheelTexture
    });
    _this.matDSLogo = new THREE.MeshStandardMaterial({
        color: 0, //0xa80202
        roughness: 1,
        metalness: 0,
        envMapIntensity: 1,
        side: 2
    });
    _this.matAlloy = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.4,
        metalness: .8,
        clearCoat: 1,
        clearCoatRoughness: 0.1,
        envMapIntensity: .8,
        reflectivity: 1,
        side: 2
    });
    _this.matAlloyContrast = new THREE.MeshPhysicalMaterial({
        color: 0xff0000,
        roughness: .5,
        metalness: .5,
        clearCoat: 1,
        clearCoatRoughness: 0,
        envMapIntensity: .6,
        reflectivity: .5,
        side: 2
    });
    _this.matAlloyDark = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        roughness: .5,
        metalness: .5,
        clearCoat: 1,
        clearCoatRoughness: 0.2,
        envMapIntensity: .4,
        reflectivity: .2,
        side: 2
    });
    _this.matChrome = new THREE.MeshPhysicalMaterial({
        color: 0x999999,
        roughness: 0.3,
        metalness: 1,
        clearCoat: 1,
        clearCoatRoughness: 0.5,
        side: 2,
    });
    _this.matLogoRed = new THREE.MeshPhysicalMaterial({
        color: 0xFF0000,
        roughness: 0.5,
        metalness: 0.5,
        clearCoat: 1,
        clearCoatRoughness: 0.5,
        envMapIntensity: .5,
        side: 2,
    });
    _this.matLogoWhite = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: 2
    });
    _this.matLogoYellow = new THREE.MeshBasicMaterial({
        color: 0xFFB603,
        side: 2
    });
    _this.physicalMaterial = _this.matPaint;

    loadHDRReflection();

}

function loadHDRReflection() {
    var genCubeUrls = function (prefix, postfix) {
        return [
            prefix + 'left' + postfix, prefix + 'right' + postfix,
            prefix + 'top' + postfix, prefix + 'bottom' + postfix,
            prefix + 'back' + postfix, prefix + 'front' + postfix
        ];
    };

    var hdrUrls = genCubeUrls('./textures/' + _this.envGUICurrent + '/reflection.', ".hdr"); //paris
    new THREE.HDRCubeTextureLoader().load(THREE.UnsignedByteType, hdrUrls, function (hdrCubeMap) {

        var pmremGenerator = new THREE.PMREMGenerator(hdrCubeMap);
        pmremGenerator.update(_this.renderer);

        var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
        pmremCubeUVPacker.update(_this.renderer);

        _this.hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
        _this.hdrCubeRenderTarget.texture.encoding = THREE.RGBM16Encoding;

        _this.matTire.envMap = _this.matTread.envMap = _this.matCaliper.envMap = _this.matAlu.envMap = _this.matAluDark.envMap = _this.matAlu2.envMap = _this.matGlasRed.envMap = _this.matGlas.envMap = _this.matPrimer.envMap = _this.matChrome.envMap = _this.matLogoRed.envMap = _this.matMirror.envMap = _this.matAlloy.envMap = _this.matAlloyContrast.envMap = _this.matAlloyDark.envMap = _this.matGlasOrange.envMap = _this.matWindowPrivat.envMap = _this.matWindow.envMap = _this.matMirror.envMap = _this.standardMat.envMap = _this.matPlasticDark.envMap = _this.matPlastic.envMap = _this.matPlasticGloss.envMap = _this.matLicense.envMap = _this.matDisk.envMap = _this.matStripe.envMap = _this.matPaint.envMap = _this.matDSLogo.envMap = _this.matMirrorGlas.envMap = _this.hdrCubeRenderTarget.texture; //_this.matBrakeDisc.envMap = 


    });
}