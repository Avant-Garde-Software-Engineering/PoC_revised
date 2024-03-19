import useWarehouseStore from '@lib/store';
import { Box, DragControls, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import  Warehouse from "./warehouse";
import { useRef } from 'react'

export default function Render3D() {
  const { warehouse, shelves } = useWarehouseStore();
  const { width, depth, height } = warehouse;

  return (
    <Canvas className='bg-gray-700'>
      <PerspectiveCamera position={[0, height + (height * 3 / 2), depth + (depth / 2)]} fov={75} near={0.01} far={10000}/>
      <OrbitControls makeDefault />
      <ambientLight />
      <gridHelper args={[Math.max(depth, width)+3, (Math.max(depth, width)+3)*2, 'black', 'black']} position={[width/2, 0.001, depth/2]}/>
      
      {/* Render Warehouse */}
      <Warehouse x={width} y={height} z={depth}/>

      {/* Render shelves */}
      {shelves.map((shelf) => (
        //<DragControls dragLimits={[[0, width-shelf.width*shelf.binSize], [0, 0], [0, depth-shelf.binSize]]} onDrag={handleDrag(index)} onDragEnd={handleDragEnd}>
          <Box
            name={shelf.name}
            key={shelf.name}
            args={[shelf.width * shelf.binSize, shelf.height * shelf.binSize, shelf.binSize]}
            position={[shelf.x, shelf.y, shelf.z]}
          />
        //</DragControls>
      ))}
    </Canvas>
  );
}