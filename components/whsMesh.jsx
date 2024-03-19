import React, { useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { warehouse_geometry } from '../app/business_logic/warehouse_geometry.js';
import { useTexture } from '@react-three/drei'; // Importa useTexture qui
import * as THREE from 'three';

const Warehouse = ({ width, height, depth }) => {
  const { scene } = useThree();
  const whsRef = React.useRef();

  // Aggiorna la geometria affinché sia sempre visibile
  React.useEffect(() => {
    if (whsRef.current) {
      const geometry = whsRef.current.geometry;
      if (geometry instanceof BufferGeometry) {
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(whsRef.current.position);
        geometry.computeBoundingSphere();
      }
    }
  }, [width, depth, height]);

  // Rendi visibile la geometria da tutte le direzioni
  React.useEffect(() => {
    if (whsRef.current && whsRef.current.material) {
      whsRef.current.material.side = THREE.DoubleSide;
    }
  }, []);

  // Disabilita il backface culling
  React.useEffect(() => {
    if (whsRef.current && whsRef.current.geometry) {
      whsRef.current.geometry.side = THREE.DoubleSide;
    }
  }, []);

  // Costruisci la geometria del magazzino
  const warehouseGeometry = useMemo(() => {
    if(!width || !height || !depth) return null;
    console.log("Round 0:", width, height, depth);
    const wsg = new warehouse_geometry(width, height, depth);
    console.log("Round 1:", wsg);
    return wsg.geometry;
  }, [width, height, depth]);

  // Utilizza useTexture all'esterno del blocco condizionale
  //const texture = useTexture('../assets/muro.jpg');

  // Aggiungi la geometria del magazzino alla scena Three.js
  useMemo(() => {
    if (warehouseGeometry) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load('../assets/muro.jpg');

      // Crea un materiale usando la texture
      const material = new THREE.MeshBasicMaterial({ map: texture });

      scene.add(new THREE.Mesh(warehouseGeometry, material));
    }
  }, [warehouseGeometry, scene, texture]);

  return null;
};

export default Warehouse;
