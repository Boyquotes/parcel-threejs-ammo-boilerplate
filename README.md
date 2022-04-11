# threejs-physics-boilerplate
Boilerplate for a fast start with physics in three.js

### How to Ammo with Parcel
To use Ammo successfully, be sure to have the library (https://github.com/kripken/ammo.js/tree/main/builds) in your assets folder. Use the commands below to use the version of library from the project assets folder.
```
# to copy assets to dist
npm run copy-assets-to-dist

# to copy assets to build
npm run copy-assets-to-build
````

### GitHub Page
https://birdlaketree.github.io/threejs-physics-boilerplate/

### how to deploy for github pages
```bash
rm -r build
npm run build
npm run copy-assets-to-build
npm run deploy
```