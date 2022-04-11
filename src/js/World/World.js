import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Loop } from './system/Loop.js';
import { createRenderer } from './system/renderer.js';
import { createScene } from './components/scene.js';
import { createCamera } from './components/camera.js';
import { createLights } from './components/lights.js';
import { createFloor } from './components/meshes/floor.js'
import { colorStandardMaterial } from './components/materials/color.js';
import { cube } from './components/meshes/cube.js';
import { sphere } from './components/meshes/sphere.js';
import { AmmoPhysics, PhysicsLoader } from '@enable3d/ammo-physics';

class World {
  constructor() {
    this.renderer = createRenderer();
    this.scene = createScene(this.renderer);
    this.camera = createCamera();
    this.lights = createLights(this.scene);
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    PhysicsLoader('/static/ammo/', () => this.ammoStart());        
  }

  ammoStart() {
    console.log('ammoStart.1');
    const physics = new AmmoPhysics(this.scene);
    physics.debug.enable(true);
    this.loop.setPhysics(physics);

    const floor = createFloor(this.scene);
    // physics.add.existing(floor);
    // floor.body.setCollisionFlags(2);
    physics.add.ground({ width: 20, height: 20, depth: 0.1 })

    const material = colorStandardMaterial(0x333333);
    const material_blue = colorStandardMaterial(0x3333ff);

    const nItems = 2;
    const yShift = 2;
    for (let i = 0; i < nItems; i++) {
      for (let j = 0; j < nItems; j++) {
        let temp_cube = cube(material);
        temp_cube.position.x = (i - nItems/2) * 1.2 + 0.5;
        temp_cube.position.y = (j - nItems/2) * 1.2 + 0.5 + yShift;
        temp_cube.position.z = -4;
        temp_cube.rotation.set(Math.random(), Math.random(), Math.random());
        this.scene.add( temp_cube );
        // this.loop.updatables.push(temp_cube);
        physics.add.existing(temp_cube)
      }
    }

    let temp_cube_c = cube(material_blue);
    temp_cube_c.position.x = 0;
    temp_cube_c.position.y = 4;
    temp_cube_c.position.z = -4;
    temp_cube_c.rotation.set(Math.random(), Math.random(), Math.random());
    this.scene.add( temp_cube_c );
    // this.loop.updatables.push(temp_cube_c);
    physics.add.existing(temp_cube_c)

    let temp_cube_in = cube(material_blue);
    temp_cube_in.position.x = 2;
    temp_cube_in.position.y = 2;
    temp_cube_in.position.z = 0;
    temp_cube_in.rotation.set(Math.random(), Math.random(), Math.random());
    temp_cube_c.add( temp_cube_in );
    // this.loop.updatables.push(temp_cube_in);
    // physics.add.existing(temp_cube_in)
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };