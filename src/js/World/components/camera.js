import { PerspectiveCamera } from 'three';

const createCamera = () => {
  const camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 100 );
  camera.position.z = 12;
  camera.position.y = 1.6;
  return camera;
}

export { createCamera };