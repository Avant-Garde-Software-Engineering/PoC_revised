/*const ShelfMesh = ({name}) => {
  return (
    <mesh name={name}>
        <boxGeometry />
        <meshStandardMaterial />
    </mesh>
  )
}

export default ShelfMesh*/

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShelfGeometryBuilder } from '../app/business_logic/ShelfGeometryBuilder.js';

const Shelf = ({ width, height, depth, binDimensions, binRows, binCols }) => {
  const { scene } = useThree();

  // Costruisci la geometria del magazzino
  const ShelfGeometry = useMemo(() => {

    if(!width || !height || !depth) return null;
    console.log("Round 0:", width, height, depth);
    const wsg = new warehouse_geometry(width, height, depth);
    console.log("Round 1:", wsg);
    return wsg.geometry;

  }, [width, height, depth]);

  // Aggiungi la geometria del magazzino alla scena Three.js
  useMemo(() => {
    if (ShelfGeometry) {
      scene.add(new THREE.Mesh(ShelfGeometry, new THREE.MeshStandardMaterial({ color: 'green' })));
    }
  }, [ShelfGeometry, scene]);

  return null;
};

export default Shelf;