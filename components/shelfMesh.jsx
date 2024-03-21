import { useMemo, forwardRef } from 'react';
import Shelf from '../utilities/shelf.js';

const ShelfMesh = forwardRef(({ name, width, height, binSize, position, onClick, onPointerMissed, material_color, dispose }, ref) => {
  const geometry = useMemo(() => Shelf.createShelfGeometry(width, height, binSize), [width, height, binSize]);

  return (
    <mesh 
      name={name} 
      geometry={geometry}
      position={position}
      ref={ref}
      onClick={onClick}
      onPointerMissed={onPointerMissed}
      material-color={material_color}
      dispose={dispose}
      >
      <meshStandardMaterial />
    </mesh>
  );
});

export default ShelfMesh;