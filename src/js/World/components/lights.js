import { AmbientLight, DirectionalLight, PointLight } from 'three';

const createLights = scene => {
  const light_ambient = new AmbientLight({ color: 0x000000, intensity: 2 })
  scene.add(light_ambient)

  const light = new DirectionalLight('white', 1);
  light.position.set(10, 20, 10);
  scene.add(light)

  const light1 = new PointLight( 0xffffff, 10, 40 );
  light1.position.set( 0, 20, 0 );
  light1.castShadow = true;
  light1.shadow.mapSize.width = 4096;
  light1.shadow.mapSize.height = 4096;
  scene.add( light1 );

  const light2 = new PointLight( 0xffffff, 10, 40 );
  light2.position.set( -10, 20, 10 );
  scene.add( light2 );
}

export { createLights };