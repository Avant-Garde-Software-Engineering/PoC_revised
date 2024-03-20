import useWarehouseStore from '@lib/store';
import { Box, OrbitControls, PerspectiveCamera, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import  Warehouse from "./warehouse";
import { useRef } from 'react'

export default function Render3D() {
  const { warehouse, shelves, selectedObjectId } = useWarehouseStore();
  const { width, depth, height } = warehouse;
  const selectObject = useWarehouseStore((state) => state.selectObject);
  const deselectObject = useWarehouseStore((state) => state.deselectObject);
  const updateShelfPosition = useWarehouseStore((state) => state.updateShelfPosition);

  const shelvesRef = useRef([]);

  const updatePosOnStore = () =>{
    if(selectedObjectId && (
      shelvesRef.current[selectedObjectId].position.x !== shelves.filter(shelf => shelf.name === selectedObjectId).x ||
      shelvesRef.current[selectedObjectId].position.z !== shelves.filter(shelf => shelf.name === selectedObjectId).z
    )) {
      updateShelfPosition(selectedObjectId, shelvesRef.current[selectedObjectId].position.x, shelvesRef.current[selectedObjectId].position.z);
    }
  }

  function handleClick(name) {
    updatePosOnStore();
    selectObject(name);
    console.log("selezionato " + selectedObjectId);
  };

  function handleUnclick() {
    if(selectedObjectId) {
      updatePosOnStore();
      deselectObject(selectedObjectId);
      console.log("deselezionato " + selectedObjectId);
    }
    else {
      console.log("nessun elemento selezionato");
    }
  };

  const constrainTranslation = () => {
    const newPos = shelvesRef.current[selectedObjectId].position;
    // Modify newPos to ensure the child object stays within the parent object's bounds
    if (newPos.x < 0) newPos.x = 0;
    if (newPos.x > width) newPos.x = width;
    if (newPos.z < 0) newPos.z = 0;
    if (newPos.z > depth) newPos.z = depth;
    return newPos;
  };

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

      {/* Movimento scaffaalture */}
      {selectedObjectId && <TransformControls showY={false}  translationSnap={0.5} onChange={constrainTranslation} object={shelvesRef.current[selectedObjectId]} />}
    </Canvas>
  );
}