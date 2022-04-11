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

    const material_blue = colorStandardMaterial(0x3333ff);
    const material_red = colorStandardMaterial(0xff2222);
    const material_green = colorStandardMaterial(0x33ff33);

    // const nItems = 2;
    // const yShift = 2;
    // for (let i = 0; i < nItems; i++) {
    //   for (let j = 0; j < nItems; j++) {
    //     let temp_cube = cube(material);
    //     temp_cube.position.x = (i - nItems/2) * 1.2 + 0.5;
    //     temp_cube.position.y = (j - nItems/2) * 1.2 + 0.5 + yShift;
    //     temp_cube.position.z = -2;
    //     temp_cube.rotation.set(Math.random(), Math.random(), Math.random());
    //     this.scene.add( temp_cube );
    //     this.loop.updatables.push(temp_cube);
    //     physics.add.existing(temp_cube)
    //   }
    // }

    let c1 = cube(material_blue, 0.2, .2, .2);
    c1.castShadow = true;
    c1.position.x = 0;
    c1.position.y = 6;
    c1.position.z = 0;
    this.scene.add(c1);
    physics.add.existing(c1);
    // this.loop.updatables.push(c1);

    let c2 = cube(material_red, .2, .2, 2);
    c2.castShadow = true;
    c2.position.x = 1;
    c2.position.y = 6;
    c2.position.z = 1;
    this.scene.add(c2);
    physics.add.existing(c2);
    // this.loop.updatables.push(c2);

    let c3 = cube(material_green, .2, 2, .2);
    c3.castShadow = true;
    c3.position.x = -1;
    c3.position.y = 5;
    c3.position.z = 0;
    this.scene.add(c3);
    physics.add.existing(c3);
    this.loop.updatables.push(c3);

    physics.add.constraints.fixed(c1.body, c2.body)
    physics.add.constraints.fixed(c2.body, c3.body)
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };