import { BoxGeometry, Mesh } from 'three';

const cube = (material, width = 1, height = 1, depth = 1) => {
  const geometry = new BoxGeometry(width, height, depth, 64, 64, 64);
  const mesh = new Mesh( geometry, material );
  const speed = Math.random() + 0.4;

  mesh.tick = (delta) => {
    // mesh.rotation.x += delta * speed;
    // mesh.rotation.y += delta * speed;
    // mesh.body.needUpdate = true;
  };

  return mesh;
}

export { cube };