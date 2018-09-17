this.loaderc = new THREE.KTXLoader()

this.paintPos = 1
this.textureformat = 'dxt'

this.envGUICurrent = "reflection000"

this.paintTotal = [ 
                
    {code:'GC6',name:'Corvette Racing Yellow Tintcoat', color:0xFFC32B,roughness: .6,metalness: .2,clearCoat: 1,clearCoatRoughness: 0,reflectivity: 0,envMapIntensity: .6},
    {code:'G8G',name:'Arctic White', color:0xfffaee,roughness: 0.8,metalness: 0.2,clearCoat: .7,clearCoatRoughness: 0,reflectivity: 0,envMapIntensity: 0.6},
    {code:'GKZ',name:'Torch Red', color:0xE11313,roughness: .6,metalness: .2,clearCoat: 1,clearCoatRoughness: 0,reflectivity: 0,envMapIntensity: .6},
    {code:'GBA',name:'Black', color:0,roughness: 0.5,metalness: 0.5,clearCoat: 1,clearCoatRoughness: 0.1,reflectivity: 0,envMapIntensity: 0.8},
    {code:'G7Q',name:'Watkins Glen Gray Metallic', color:0x2A3233,roughness: 0.6,metalness: 0.8,clearCoat: 1,clearCoatRoughness: 0,reflectivity: 1,envMapIntensity: .8},
    {code:'G1F',name:'Ceramic Matrix Gray', color:0xC0CDDA,roughness: 0.6,metalness: 0.7,clearCoat: 1,clearCoatRoughness: 0,reflectivity: 1,envMapIntensity: .7},
    {code:'GAN',name:'Blade Silver Metallic', color:0xC6CCD2,roughness: 0.6,metalness: 0.9,clearCoat: 1,clearCoatRoughness: 0,reflectivity: 1,envMapIntensity: 0.7},
    {code:'GTR',name:'Admiral Blue Metallic', color:0x13377C,roughness: 0.6,metalness: 0.9,clearCoat: 1,clearCoatRoughness: 0,reflectivity: 1,envMapIntensity: 0.6},
    {code:'G1G',name:'Longbeach Red Metallic Tintcoat', color:0x7C1E27,roughness: .6,metalness: .2,clearCoat: 1,clearCoatRoughness: 0,reflectivity: 0,envMapIntensity: .6},
];

function CreateMaterialLibrary(mainWindow) {
    this.matSimple = new THREE.MeshStandardMaterial({
        color: 0x555555,
        side: 2
    });
    this.standardMat = new THREE.MeshPhysicalMaterial({
        color: 0x888888,
        roughness: 1,
        metalness: 0,
        envMapIntensity: 1,
        clearCoat: 1,
        clearCoatRoughness: 1,
        reflectivity: 1,
    });

    this.matBlack = new THREE.MeshBasicMaterial({
        color: 0,
        side: 2
    });

    this.matLicense = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 1,
        map: this.loaderc.load('../textures/model/exterior/licenseplate_' + this.textureformat + '.ktx', function (texture) {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearFilter;
            texture.repeat.set(1, 2);
        })
    });

    this.matPrimer = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 1,
        metalness: 1,
        side: 2
    });

    this.matInteriorBlack = new THREE.MeshStandardMaterial({
        color: 0x191919,
        roughness: 1,
        metalness: 0,
        envMapIntensity: 0.2,
        side: 0
    });

    this.matPlasticGloss = new THREE.MeshStandardMaterial({
        color: 0, //0xb91524
        roughness: 0,
        metalness: 1,
        envMapIntensity: 1
    });
    this.matWhite = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: 2
    });

    this.matPlastic = new THREE.MeshStandardMaterial({
        color: 0x222222, //0xb91524
        roughness: 0.5,
        metalness: 0,
        envMapIntensity: .5,
        side: 2
    });
    this.matPlasticDark = new THREE.MeshStandardMaterial({
        color: 0x151515, //0xb91524
        roughness: .6,
        metalness: 0,
        envMapIntensity: 0.2,
        side: 2
    });

    this.matTread = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        roughness: 1,
        metalness: 0,
        map: this.wheelTexture,
        bumpMap: this.wheelTexture,
        bumpScale: 2,
        clearCoat: .5,
        clearCoatRoughness: 0.5,
        envMapIntensity: 0.1,
        reflectivity: 1,
        side: 0
    });
    this.matTire = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 1,
        metalness: 0,
        map: this.wheelTexture2,
        clearCoat: 0,
        clearCoatRoughness: 0.5,
        envMapIntensity: .3,
        reflectivity: 0,
        side: 0
    });

    // Bremsscheibe
    this.matDisk = new THREE.MeshPhysicalMaterial({
        color: 0x666666,
        roughness: 0.3,
        map: this.discTexture,
        metalness: 1,
        clearCoat: .5,
        clearCoatRoughness: 0.5,
        reflectivity: 0,
        side: 2,
    });

    // Bremsklotz
    this.matCaliper = new THREE.MeshPhysicalMaterial({
        color: 0xFFC32B,
        roughness: 0.5,
        metalness: 0.5,
        clearCoat: 1,
        clearCoatRoughness: 0.2,
        envMapIntensity: .6,
        reflectivity: .5
    });
    //this.matCaliper.map = createColorTexture('#FFC32B');
    this.matCaliper.color.setHex(0xFFC32B);

    this.matCaliperLogo = new THREE.MeshBasicMaterial({
        color: 0,
        side: 2
    });

    this.matStripe = new THREE.MeshPhysicalMaterial({
        color: 0xFFC32B,
        roughness: 0.5,
        metalness: 0.5,
        clearCoat: 1,
        clearCoatRoughness: 0.2,
        envMapIntensity: .6,
        reflectivity: .5
    });
    //this.matStripe.map = createColorTexture('#FFC32B');
    this.matStripe.color.setHex(0xFFC32B);

    this.matPaint = new THREE.MeshPhysicalMaterial({
        color: this.paintTotal[this.paintPos - 1].color, //0x0B1940
        roughness: this.paintTotal[this.paintPos - 1].roughness,
        metalness: this.paintTotal[this.paintPos - 1].metalness,
        clearCoat: this.paintTotal[this.paintPos - 1].clearCoat,
        clearCoatRoughness: this.paintTotal[this.paintPos - 1].clearCoatRoughness,
        envMapIntensity: this.paintTotal[this.paintPos - 1].envMapIntensity,
        reflectivity: this.paintTotal[this.paintPos - 1].reflectivity
    });
    //this.matPaint.map = createColorTexture('#' + this.matPaint.color.getHexString());
    //this.matPaint.color.setHex(this.paintTotal[paintPos].color)
    this.matPaint.color.setHex(0xFFC32B);
    this.matMirror = new THREE.MeshPhysicalMaterial({
        //                        color: paintTotal[1],
        color: new THREE.Color().setHex(0),
        roughness: 1,
        metalness: 1,
        clearCoat: 1,
        clearCoatRoughness: 0,
        reflectivity: .7,
        side: 2
    });
    this.matMirrorGlas = new THREE.MeshPhysicalMaterial({
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
    this.matWindow = new THREE.MeshStandardMaterial({
        color: 0x444444,
        roughness: 0,
        metalness: 1,
        opacity: .8,
        transparent: true,
        side: 2
    });
    this.matWindowPrivat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0,
        metalness: 1,
        opacity: .8,
        transparent: true,
        side: 2
    });
    this.matGlas = new THREE.MeshStandardMaterial({
        color: 0x666666,
        depthWrite: true,
        roughness: 0,
        metalness: .5,
        opacity: .45,
        transparent: true,
        side: 2
    });

    this.matGlasDark = new THREE.MeshStandardMaterial({
        color: 0x444444,
        depthWrite: false,
        roughness: 1,
        metalness: 0,
        opacity: .45,
        transparent: true,
        side: 1
    });
    this.matGlasRed = new THREE.MeshStandardMaterial({
        color: 0xff0000, //0xc80009
        roughness: 0,
        metalness: .75,
        envMapIntensity: .7,
        opacity: .65,
        transparent: true,
        side: 2
    });
    this.matGlasOrange = new THREE.MeshStandardMaterial({
        color: 0xF44900, //0xc80009
        roughness: 0,
        metalness: .75,
        envMapIntensity: .7,
        opacity: .65,
        transparent: true,
        side: 2
    });
    this.matAlu = new THREE.MeshPhysicalMaterial({
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
    this.matAluDark = new THREE.MeshPhysicalMaterial({
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
    this.matAlu2 = new THREE.MeshPhysicalMaterial({
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
    this.matDSLogo = new THREE.MeshStandardMaterial({
        color: 0, //0xa80202
        roughness: 1,
        metalness: 0,
        envMapIntensity: 1,
        side: 2
    });
    this.matAlloy = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.4,
        metalness: .8,
        clearCoat: 1,
        clearCoatRoughness: 0.1,
        envMapIntensity: .8,
        reflectivity: 1,
        side: 2
    });
    this.matAlloyContrast = new THREE.MeshPhysicalMaterial({
        color: 0xff0000,
        roughness: .5,
        metalness: .5,
        clearCoat: 1,
        clearCoatRoughness: 0,
        envMapIntensity: .6,
        reflectivity: .5,
        side: 2
    });
    this.matAlloyDark = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        roughness: .5,
        metalness: .5,
        clearCoat: 1,
        clearCoatRoughness: 0.2,
        envMapIntensity: .4,
        reflectivity: .2,
        side: 2
    });
    this.matChrome = new THREE.MeshPhysicalMaterial({
        color: 0x999999,
        roughness: 0.3,
        metalness: 1,
        clearCoat: 1,
        clearCoatRoughness: 0.5,
        side: 2,
    });
    this.matLogoRed = new THREE.MeshPhysicalMaterial({
        color: 0xFF0000,
        roughness: 0.5,
        metalness: 0.5,
        clearCoat: 1,
        clearCoatRoughness: 0.5,
        envMapIntensity: .5,
        side: 2,
    });
    this.matLogoWhite = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: 2
    });
    this.matLogoYellow = new THREE.MeshBasicMaterial({
        color: 0xFFB603,
        side: 2
    });
    this.physicalMaterial = this.matPaint;

    loadHDRReflection (mainWindow.renderer)
}

function loadHDRReflection(renderer) {
    var genCubeUrls = function (prefix, postfix) {
        return [
            prefix + 'left' + postfix, prefix + 'right' + postfix,
            prefix + 'top' + postfix, prefix + 'bottom' + postfix,
            prefix + 'back' + postfix, prefix + 'front' + postfix
        ];
    };

    var hdrUrls = genCubeUrls('../textures/' + this.envGUICurrent + '/reflection.', ".hdr"); //paris
    new THREE.HDRCubeTextureLoader().load(THREE.UnsignedByteType, hdrUrls, function (hdrCubeMap) {
        var pmremGenerator = new THREE.PMREMGenerator(hdrCubeMap);
        pmremGenerator.update(renderer);
        var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker(pmremGenerator.cubeLods);
        pmremCubeUVPacker.update(renderer);
        this.hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
        this.hdrCubeRenderTarget.texture.encoding = THREE.RGBM16Encoding;
        this.matTire.envMap = this.matTread.envMap = this.matCaliper.envMap = this.matAlu.envMap = this.matAluDark.envMap = this.matAlu2.envMap = this.matGlasRed.envMap = this.matGlas.envMap = this.matPrimer.envMap = this.matChrome.envMap = this.matLogoRed.envMap = this.matMirror.envMap = this.matAlloy.envMap = this.matAlloyContrast.envMap = this.matAlloyDark.envMap = this.matGlasOrange.envMap = this.matWindowPrivat.envMap = this.matWindow.envMap = this.matMirror.envMap = this.standardMat.envMap = this.matPlasticDark.envMap = this.matPlastic.envMap = this.matPlasticGloss.envMap = this.matLicense.envMap = this.matDisk.envMap = this.matStripe.envMap = this.matPaint.envMap = this.matDSLogo.envMap = this.matMirrorGlas.envMap = this.hdrCubeRenderTarget.texture; //this.matBrakeDisc.envMap = 
    });
}

/*function createColorTexture(color) {
    var canvas = document.getElementById("colorcanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 2, 2);
    var texture = new THREE.CanvasTexture(canvas);
    return texture;
}*/

function assignMaterials(model) {
    var meshes = [];
    if (model.name == 'paint2')
        model.children[0].material = this.matPaint;
    else if (model.name == 'paint') {
        for (var i = 0; i < model.children.length; i++)
            model.children[i].material = this.matPaint;
    } else if (model.name == 'trunk') {
        model.children[0].material = this.matPaint;
        model.children[1].material = this.matWindowPrivat;
        model.children[2].material = this.matBlack;
    } else if (model.name == 'black') {
        model.children[0].material = this.matBlack;
    } else if (model.name == 'front') {
        for (var i = 0; i < model.children.length; i++)
            model.children[i].material = this.matPlasticGloss;
        model.children[1].material = this.matWindow;
        model.children[2].material = this.matPrimer;
        model.children[3].material = this.matPlasticDark;
        model.children[4].material = this.matPlastic;
        model.children[5].material = this.matPlasticDark;
        model.children[6].material = this.matPlasticGloss;
        model.children[7].material = this.matChrome;
        model.children[8].material = this.matLogoRed;
        model.children[9].material = this.matAluDark;
        model.children[10].material = this.matLogoWhite;
        model.children[11].material = this.matLogoYellow;
        model.children[13].material = this.matPrimer;
    } else if (model.name == 'frontlamp') {
        model.children[0].material = this.matGlasDark;
        model.children[1].material = this.matChrome;
        model.children[2].material = this.matGlas;
        model.children[3].material = this.matGlas;
        model.children[4].material = this.matAlu;
        model.children[5].material = this.matChrome;
        model.children[6].material = this.matPlasticGloss
        model.children[7].material = this.matPlasticGloss
    } else if (model.name == 'rearlamp') {
        model.children[0].material = this.matPlasticGloss;
        model.children[1].material = this.matGlas;
        model.children[2].material = this.matGlasRed;
        model.children[3].material = this.matGlasRed;
        model.children[4].material = this.matAluDark;
        model.children[5].material = this.matBlack;
    } else if (model.name == 'rear') {
        for (var i = 0; i < model.children.length; i++)
            model.children[i].material = this.matPlastic;
        model.children[0].material = this.matPlasticGloss;
        model.children[1].material = this.matLicense;
        model.children[2].material = this.matPlasticGloss;
        model.children[3].material = this.matGlasRed;
        model.children[4].material = this.matChrome;
        model.children[5].material = this.matPlastic;
        model.children[6].material = this.matPlasticGloss;
        model.children[7].material = this.matPlasticDark;
        model.children[8].material = this.matPlastic;
        model.children[9].material = this.matPlastic;
        // Logo Corvette
        model.children[10].material = this.matChrome;
        model.children[11].material = this.matChrome;
        model.children[12].material = this.matAluDark;
        model.children[13].material = this.matLogoWhite;
        model.children[14].material = this.matLogoYellow;
        model.children[15].material = this.matLogoRed;

        model.children[16].material = this.matPlasticGloss;
        model.children[17].material = this.matPlastic;
        model.children[18].material = this.matPlasticGloss;

        model.children[19].material = this.matPlasticDark;
        model.children[20].material = this.matChrome;
        model.children[21].material = this.matAluDark;
        model.children[22].material = this.matAluDark;


    } else if (model.name == 'side') {
        for (var i = 0; i < model.children.length; i++)
            model.children[i].material = this.matAlu;
        model.children[0].material = this.matGlasRed;
        model.children[1].material = this.matGlasRed;
        model.children[2].material = this.matPlastic;
        model.children[3].material = this.matPlasticDark;
        model.children[4].material = this.matPlasticGloss;
        model.children[10].material = this.matPlasticGloss;
        model.children[11].material = this.matPlasticGloss;
        model.children[12].material = this.matPlasticGloss;
        model.children[13].material = this.matLogoRed;
        model.children[14].material = this.matAlu;
        model.children[15].material = this.matLogoRed;
        model.children[16].material = this.matAlu;
        model.children[17].material = this.matGlasOrange;
        model.children[18].material = this.matGlasOrange;
        model.children[19].material = this.matPlastic;
        model.children[20].material = this.matPlasticGloss;
        model.children[21].material = this.matPlasticGloss;
        model.children[22].material = this.matPlasticGloss;
        model.children[23].material = this.matPlastic;
        model.children[24].material = this.matPlasticGloss;
        model.children[25].material = this.matWindowPrivat;
        model.children[26].material = this.matBlack;
        model.children[27].material = this.matPrimer;
    } else if (model.name == 'brake_front') {
        model.children[0].material = this.matAlu;
        model.children[1].material = this.matCaliper;
        model.children[2].material = this.matCaliperLogo;
        model.children[3].material = this.matDisk;
        model.children[4].material = this.matAluDark;
        model.children[5].material = this.matAlu;
    } else if (model.name == 'brake_rear') {
        model.children[0].material = this.matAlu;
        model.children[1].material = this.matAlu;
        model.children[2].material = this.matCaliper;
        model.children[3].material = this.matCaliperLogo;
        model.children[4].material = this.matDisk;
        model.children[5].material = this.matAluDark;
        model.children[6].material = this.matAlu;
    } else if (model.name == 'door') {
        for (var i = 0; i < model.children.length; i++)
            model.children[i].material = this.matPaint;
        model.children[1].material = this.matPrimer;
        model.children[2].material = this.matPlasticGloss;
        model.children[3].material = this.matPlastic;
        model.children[4].material = this.matPlasticGloss;
        model.children[5].material = this.matAluDark;
        model.children[6].material = this.matMirrorGlas;
        model.children[7].material = this.matWindow;
    } else if (model.name == 'windowpane') {
        model.children[0].material = this.matWindow;
        model.children[1].material = this.matWindow;
        model.children[2].material = this.matWindowPrivat;
        model.children[3].material = this.matWindowPrivat;
    } else if (model.name.indexOf('wheel') != -1) {
        if (model.name == 'wheel') {
            for (var i = 0; i < model.children.length; i++)
                model.children[i].material = this.matAluDark;
            model.children[1].material = this.matStripe;
            model.children[0].material = this.matAlloyDark;
            model.children[2].material = this.matAlu;
            model.children[3].material = this.matAlu;
            model.children[4].material = this.matLogoWhite;
            model.children[5].material = this.matLogoRed;
            model.children[6].material = this.matPlasticGloss;
            model.children[7].material = this.matPlastic;
            model.children[8].material = this.matLogoYellow;
            model.children[9].material = this.matPlastic;
            model.children[10].material = this.matTire;
            model.children[11].material = this.matTread;
        }

    }

    for(var i=0; i<model.children.length; i++){
        if(model.children[i].material==undefined) {
            model.children[i].material = this.matSimple
        }
    }
}