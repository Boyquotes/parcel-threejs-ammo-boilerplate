import { Group } from 'three';
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
    console.log('ammoStart.11');
    const physics = new AmmoPhysics(this.scene);
    physics.debug.enable(true);
    this.loop.setPhysics(physics);

    const floorSize = 20;
    const floor = createFloor(this.scene, floorSize, floorSize);
    // manually place the ground on zero with y=-0.5 and hide it because we are using mesh above to represent it visually
    const ground = physics.add.ground({ width: floorSize, height: floorSize, y:-0.5 });
    ground.visible = false;

    const material_gray = colorStandardMaterial(0x333333);
    const material_white = colorStandardMaterial(0xffffff);
    const material_blue = colorStandardMaterial(0x1111ff);
    const material_green = colorStandardMaterial(0x11ff11);
    const material_red = colorStandardMaterial(0xff1111);

    const nItems = 2;
    const yShift = 2;

    for (let i = 0; i < nItems; i++) {
      for (let j = 0; j < nItems; j++) {
        let w = Math.random() + 0.5;
        let h = Math.random();
        let d = Math.random()/2 + 0.5;
        let temp_cube = cube(material_gray, w, h, d);
        temp_cube.position.x = (i - nItems/2) * 1.2 + 0.5;
        temp_cube.position.y = (j - nItems/2) * 1.2 + 0.5 + yShift;
        temp_cube.position.z = 0;
        temp_cube.rotation.set(Math.random(), Math.random(), Math.random());
        this.scene.add( temp_cube );
        physics.add.existing(temp_cube)
      }
    }

    for (let i = 0; i < nItems; i++) {
      for (let j = 0; j < nItems; j++) {
        let radius = Math.random()/2 + 0.2;
        let temp_sphere = sphere(material_white, radius);
        temp_sphere.position.x = (i - nItems/2) * 1.2 + 0.5;
        temp_sphere.position.y = (j - nItems/2) * 1.2 + 0.5 + yShift;
        temp_sphere.position.z = 0;
        this.scene.add(temp_sphere);
        physics.add.existing(temp_sphere)
      }
    }

    const a = cube(material_blue, .2, 2, .2);
    a.castShadow = true;
    a.position.x = -1 - 0.2/2;
    a.position.y = 1;
    a.position.z = 0;

    const b = cube(material_green, 2, .2, .2);
    b.castShadow = true;
    b.position.x = -0.2;
    b.position.y = 2 + 0.1;
    b.position.z = 0;

    const c = cube(material_red, .2, .2, 2);
    c.castShadow = true;
    c.position.x = 1 - 0.1;
    c.position.y = 2 + 0.1;
    c.position.z = -1 + 0.1;

    const group = new Group();
    group.position.y = 0;
    group.add(a);
    group.add(b);
    group.add(c);
    this.scene.add(group);
    physics.add.existing(group);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };