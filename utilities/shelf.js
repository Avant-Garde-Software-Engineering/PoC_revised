import * as THREE from 'three';
import * as BufferGeometryUtils from './BufferGeometryUtils';

export default class Shelf {
    static #_planeHeight = 0.2;
    static #_legWidth = 0.2;
    static #_legDepth = 0.2;
  
    constructor(width, height, binSize) {
      this.width = width;
      this.height = height;
      this.binSize = binSize;
    }

    static createShelfGeometry = (shelfWidth, shelfHeight, binSize) => { 
        let depth = binSize;
        console.log("Ciao");
      let geometriesArray = [];
      for (let rowIndex = 0; rowIndex < shelfHeight+1; rowIndex++) {
          for (let colIndex = 0; colIndex < shelfWidth; colIndex++) {
              // Adding plane geometry
              let geometry = new THREE.BoxGeometry( binSize, Shelf.#_planeHeight, depth );
              geometry.translate(binSize * (colIndex-0.5*shelfWidth) + binSize/2 , binSize * rowIndex + Shelf.#_planeHeight / 2, 0);
              geometriesArray.push(geometry);
          }
      }
    
      const frontLeftLegGeo = new THREE.BoxGeometry( Shelf.#_legWidth, shelfHeight*binSize, Shelf.#_legDepth );
      frontLeftLegGeo.translate(-(shelfWidth*binSize / 2 - Shelf.#_legWidth), (shelfHeight*binSize / 2), (depth / 2 - Shelf.#_legDepth));
      geometriesArray.push(frontLeftLegGeo);
    
      const frontRightLegGeo = new THREE.BoxGeometry( Shelf.#_legWidth, shelfHeight*binSize, Shelf.#_legDepth );
      frontRightLegGeo.translate((shelfWidth*binSize / 2 - Shelf.#_legWidth), (shelfHeight*binSize / 2), (depth / 2 - Shelf.#_legDepth));
      geometriesArray.push(frontRightLegGeo);
    
      const backLeftLegGeo = new THREE.BoxGeometry( Shelf.#_legWidth, shelfHeight*binSize, Shelf.#_legDepth );
      backLeftLegGeo.translate(-(shelfWidth*binSize / 2 - Shelf.#_legWidth), (shelfHeight*binSize / 2), -(depth / 2 - Shelf.#_legDepth));
      geometriesArray.push(backLeftLegGeo);
    
      const backRightLegGeo = new THREE.BoxGeometry( Shelf.#_legWidth, shelfHeight*binSize, Shelf.#_legDepth );
      backRightLegGeo.translate((shelfWidth*binSize / 2 - Shelf.#_legWidth), (shelfHeight*binSize / 2), -(depth / 2 - Shelf.#_legDepth));
      geometriesArray.push(backRightLegGeo);
      
      return BufferGeometryUtils.mergeGeometries(geometriesArray);
    }
  
  }
  