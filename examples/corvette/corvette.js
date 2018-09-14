class PageApp extends ThingsOnSurfacesApp {
	constructor(domElement){
		super(domElement, false)
		this.clock = new THREE.Clock()
		this.meshes = []
		this.clonemeshes = []
		this.geometries = []
		this.femaleGeometry = null
		this.maleGeometry = null
		this.corvetteModel = null
		this.corvetteMeshes =[]

		this.childNode = null

		this.initialized = false

		this.colors = [
			0xff4422,
			0xff9955,
			0xff77dd,
			0xff7744,
			0xff5522,
			0xff9922,
			0xff99ff
		]

		this.manager = new THREE.LoadingManager()
		const gltfLoader = new THREE.GLTFLoader()

		THREE.DRACOLoader.setDecoderPath("../../threeJS/js/libs/draco/")
		this.dracoLoader = new THREE.DRACOLoader()
		gltfLoader.setDRACOLoader(this.dracoLoader)

		

		const loader = new THREE.BinaryLoader()
		loader.load('../models/female02/Female02_bin.js', geometry => {
			this.femaleGeometry = geometry
			this.geometries.push(this.femaleGeometry)

			// Add a first model so that it's clear that the scene is running and before hit testing can find an anchor
			let firstNode = this.createSceneGraphNode()
			firstNode.position.set(0, 0, -2)
			this.floorGroup.add(firstNode)
		})
		loader.load('../models/male02/Male02_bin.js', geometry => {
			this.maleGeometry = geometry
			this.geometries.push(this.maleGeometry)
		})
		
		gltfLoader.load("../models/glb/corvette.glb", obj => {
			this.corvetteModel = obj
			
			CreateMaterialLibrary()
			loadHDRReflection()
			
			
			for (var i = 0; i < obj.scene.children.length; i++) 
			{
				
              	var objName = obj.scene.children[i].name
				objName = objName.slice(0, -3)
				obj.scene.children[i].name = objName
				this.corvetteMeshes.push(obj.scene.children[i])

				assignMaterials(obj.scene.children[i])
			}

			

			
			
			// Adds all single meshes
			/*this.corvetteModel.scene.traverse( child => {
				this.childNode = child
				if (child.isMesh) {
					this.corvetteMeshes.push(this.childNode)
				}
			})*/
		})

		//this.composer = new THREE.EffectComposer(this.renderer)
		//this.composer.addPass(new THREE.RenderPass(this.scene, this.camera))
		//this.composer.addPass(new THREE.BloomPass(0.75))
		//let filmPass = new THREE.FilmPass(0.5, 0.5, 1448, false)
		//filmPass.renderToScreen = true
		//this.composer.addPass(filmPass)
		
		

		

		this.meshes = [];


		

	}

	addCorvetteMeshes(){
		if (this.corvetteMeshes.length==0) return
		
		var corvetteGroup = new THREE.Group()
		for (var i=0; i<this.corvetteMeshes.length; i++){
			corvetteGroup.add(this.corvetteMeshes[i])
			this.initialized=true
		}
		corvetteGroup.scale.set(0.01,0.01,0.01)
		this.scene.add(corvetteGroup)
		
		
	}

	updateScene(frame){
		super.updateScene(frame)
		let delta = 10 * this.clock.getDelta()
		delta = delta < 2 ? delta : 2

		let data = null
		let vertices = null
		let vertices_tmp = null
		let vl = null
		let d = null
		let vt = null
		let mesh = null
		let p = null
		for(let j = 0, jl = this.meshes.length; j < jl; j ++){
			data = this.meshes[j]
			mesh = data.mesh
			vertices = data.vertices
			vertices_tmp = data.vertices_tmp
			vl = data.vl
			if (! data.dynamic) continue
			if (data.start > 0){
				data.start -= 1
			} else {
				if (!data.started){
					data.direction = -1
					data.started = true
				}
			}
			for (let i = 0; i < vl; i ++){
				p = vertices[i]
				vt = vertices_tmp[i]
				// falling down
				if (data.direction < 0){
					if (p.y > 0){
						p.x += 1.5 * (0.50 - Math.random()) * data.speed * delta
						p.y += 3.0 * (0.25 - Math.random()) * data.speed * delta
						p.z += 1.5 * (0.50 - Math.random()) * data.speed * delta
					} else {
						if (! vt[3]){
							vt[3] = 1
							data.down += 1
						}
					}
				}
				// rising up
				if (data.direction > 0){
					d = Math.abs(p.x - vt[0]) + Math.abs(p.y - vt[1]) + Math.abs(p.z - vt[2])
					if (d > 1){
						p.x += - (p.x - vt[0]) / d * data.speed * delta * (0.85 - Math.random())
						p.y += - (p.y - vt[1]) / d * data.speed * delta * (1 + Math.random())
						p.z += - (p.z - vt[2]) / d * data.speed * delta * (0.85 - Math.random())
					} else {
						if (! vt[4]){
							vt[4] = 1
							data.up += 1
						}
					}
				}
			}
			// all down
			if (data.down === vl){
				if (data.delay === 0){
					data.direction = 1
					data.speed = 10
					data.down = 0
					data.delay = 320
					for(let i = 0; i < vl; i ++){
						vertices_tmp[i][3] = 0
					}
				} else {
					data.delay -= 1
				}
			}
			// all up
			if (data.up === vl){
				if (data.delay === 0){
					data.direction = -1
					data.speed = 35
					data.up = 0
					data.delay = 120
					for(let i = 0; i < vl; i ++){
						vertices_tmp[i][4] = 0
					}
				} else {
					data.delay -= 1
				}
			}
			mesh.geometry.verticesNeedUpdate = true
		}
		if (this.initialized==false){
			this.addCorvetteMeshes()
		}
	}

	//doRender(){
		//this.renderer.clear()
		//this.composer.render(0.01)
	//}

	// Called during construction to allow the app to populate this.scene
	initializeScene(){
		// Add a box at the scene origin
		let box = new THREE.Mesh(
			new THREE.BoxBufferGeometry(0.1, 0.1, 0.1),
			new THREE.MeshPhongMaterial({ color: '#DDFFDD' })
		)
		box.position.set(0, 0.05, 0)
		var axesHelper = AxesHelper( 0.2 );
		this.floorGroup.add( axesHelper );
		this.floorGroup.add(box)
		
		

		// Add a few lights
		this.scene.add(new THREE.AmbientLight('#FFF', 0.2))
		let directionalLight = new THREE.DirectionalLight('#FFF', 0.6)
		directionalLight.position.set(0, 10, 0)
		this.scene.add(directionalLight)
	}

	createSceneGraphNode(){
		const group = new THREE.Group()
		group.add(this.createMesh(
			this.geometries[Math.floor(this.geometries.length * Math.random())], 
			0.006,
			0,0,0, 
			0.005, 
			this.colors[Math.floor(this.colors.length * Math.random())],
			true
		))
		return group
	}

	createMesh(originalGeometry, scale, x, y, z, pointSize, color, dynamic){
		let i, c, mesh, p
		let vertices = originalGeometry.vertices
		let vl = vertices.length
		let geometry = new THREE.Geometry()
		let vertices_tmp = []
		for (i = 0; i < vl; i ++){
			p = vertices[i]
			geometry.vertices[i] = p.clone()
			vertices_tmp[i] = [p.x, p.y, p.z, 0, 0]
		}
		if (dynamic){
			c = color
			mesh = new THREE.Points(geometry, new THREE.PointsMaterial({ size: pointSize, color: c }))
			this.clonemeshes.push({ mesh: mesh, speed: 0.5 + Math.random() })
		} else {
			mesh = new THREE.Points(geometry, new THREE.PointsMaterial({ size: pointSize, color: color }))
		}
		mesh.scale.x = mesh.scale.y = mesh.scale.z = scale
		mesh.position.x = x
		mesh.position.y = y
		mesh.position.z = z
		mesh.quaternion.setFromEuler(new THREE.Euler(0, (Math.PI * 2) * Math.random(), 0))
		this.meshes.push({
			mesh: mesh,
			vertices: geometry.vertices,
			vertices_tmp: vertices_tmp,
			vl: vl,
			down: 0,
			up: 0,
			direction: 0,
			speed: 35,
			delay: Math.floor(10 * Math.random()),
			started: false,
			start: Math.floor(100 * Math.random()),
			dynamic: dynamic
		})
		mesh.name = 'prettyperson: ' + Math.random() 
		return mesh
	}
}
function AxesHelper( size ) {
	size = size || 1;

	var vertices = [
		0, 0, 0,	size, 0, 0,
		0, 0, 0,	0, size, 0,
		0, 0, 0,	0, 0, size
	];

	var colors = [
		1, 0, 0,	1, 0.6, 0,
		0, 1, 0,	0.6, 1, 0,
		0, 0, 1,	0, 0.6, 1
	];

	var geometry = new THREE.BufferGeometry();
	geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

	var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

	return new THREE.LineSegments(geometry, material);
}