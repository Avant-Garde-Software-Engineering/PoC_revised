import { useMemo } from 'react';
import Shelf from '../utilities/shelf.js';

const ShelfMesh = ({ name, width, height, binSize }) => {
  const geometry = useMemo(() => Shelf.createShelfGeometry(width, height, binSize), [width, height, binSize]);
  {console.log("Ciao")}

  return (
    <mesh name={name} geometry={geometry}>
      <meshStandardMaterial />
    </mesh>
  );
};

export default ShelfMesh;
