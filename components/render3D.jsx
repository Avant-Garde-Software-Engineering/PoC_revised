import useWarehouseStore from '@lib/store';
import { Box, OrbitControls, PerspectiveCamera, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import  Warehouse from "./warehouse";
import { useRef } from 'react'
import * as THREE from 'three'

export default function Render3D() {
  const { warehouse, shelves, selectedObjectId } = useWarehouseStore();
  const { width, depth, height } = warehouse;
  const selectObject = useWarehouseStore((state) => state.selectObject);
  const deselectObject = useWarehouseStore((state) => state.deselectObject);
  const updateShelfPosition = useWarehouseStore((state) => state.updateShelfPosition);

  const shelvesRef = useRef([]);

  const updatePosOnStore = () =>{
    if(selectedObjectId && (
      shelvesRef.current[selectedObjectId].position.x !== shelves.filter(shelf => shelf.name === selectedObjectId)[0].x ||
      shelvesRef.current[selectedObjectId].position.z !== shelves.filter(shelf => shelf.name === selectedObjectId)[0].z
    )) {
      updateShelfPosition(selectedObjectId, shelvesRef.current[selectedObjectId].position.x, shelvesRef.current[selectedObjectId].position.z);
    }
  }

  function handleClick(name) {
    updatePosOnStore();
    selectObject(name);
  };

  function handleUnclick() {
    if(selectedObjectId) {
      updatePosOnStore();
      deselectObject(selectedObjectId);
    }
    else {
      console.log("nessun elemento selezionato");
    }
  };

  function constrain() {
    const bbox = new THREE.Box3().setFromObject(shelvesRef.current[selectedObjectId]);
  
    if(!(0 <= bbox.min.x && width >= bbox.max.x &&
        0 <= bbox.min.z && depth >= bbox.max.z)) {
        const currentShelf = shelves.filter(shelf => shelf.name === selectedObjectId)[0];
        shelvesRef.current[selectedObjectId].position.x = currentShelf.x;
        shelvesRef.current[selectedObjectId].position.y = currentShelf.y;
        shelvesRef.current[selectedObjectId].position.z = currentShelf.z;
    }
  }

  return (
    <Canvas className='bg-gray-700 h-80-vh' >
      <PerspectiveCamera position={[0, height + (height * 3 / 2), depth + (depth / 2)]} fov={75} near={0.01} far={10000}/>
      <OrbitControls makeDefault />
      <ambientLight />
      <gridHelper args={[Math.max(depth, width)+3, (Math.max(depth, width)+3)*2, 'black', 'black']} position={[width/2, 0.001, depth/2]}/>
      
      {/* Render Warehouse */}
      <Warehouse x={width} y={height} z={depth}/>      

      {/* Render shelves */}
      {shelves.map((shelf) => (
        <Box
          name={shelf.name}
          key={shelf.name}
          args={[shelf.width * shelf.binSize, shelf.height * shelf.binSize, shelf.binSize]}
          position={[shelf.x, shelf.y, shelf.z]}
          ref={(element) => shelvesRef.current[shelf.name] = element}
          onClick={() => handleClick(shelf.name)}
          onPointerMissed={handleUnclick}
          material-color={selectedObjectId === shelf.name ? '#ff6080' : 'white'}
          dispose={null}
        />
      ))}

      {/* Movimento scaffalature */}
      {selectedObjectId && <TransformControls showY={false} translationSnap={0.5} onChange={constrain} object={shelvesRef.current[selectedObjectId]} />}
    </Canvas>
  );
}