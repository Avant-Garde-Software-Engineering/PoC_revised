import useWarehouseStore from '@lib/store';
import { Box, OrbitControls, PerspectiveCamera, TransformControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import  Warehouse from "./warehouse";
import ShelfMesh from './shelfMesh';
import { useRef, useEffect } from 'react';
import * as THREE from 'three'

export default function Render3D() {
  const { warehouse, shelves, selectedObjectId, products } = useWarehouseStore();
  const { width, depth, height } = warehouse;
  const selectObject = useWarehouseStore((state) => state.selectObject);
  const deselectObject = useWarehouseStore((state) => state.deselectObject);
  const updateShelfPosition = useWarehouseStore((state) => state.updateShelfPosition);

  const shelvesRef = useRef([]);
  const productsRef = useRef([]);

  const updatePosOnStore = () =>{
    if(selectedObjectId && (
      shelvesRef.current[selectedObjectId].position.x !== shelves.filter(shelf => shelf.name === selectedObjectId)[0].x ||
      shelvesRef.current[selectedObjectId].position.z !== shelves.filter(shelf => shelf.name === selectedObjectId)[0].z
    )) {
      updateShelfPosition(selectedObjectId, shelvesRef.current[selectedObjectId].position.x, shelvesRef.current[selectedObjectId].position.z);
    }
  }

  const updatePos = () => {
    constrain();
    updatePosOnStore();
  }

  function handleClick(name) {
    selectObject(name);
  };

  function handleUnclick() {
    if(selectedObjectId) {
      deselectObject(selectedObjectId);
    }
    else {
      console.log("nessun elemento selezionato");
    }
  };

  function isInsideWarehouse(){
    const bbox = new THREE.Box3().setFromObject(shelvesRef.current[selectedObjectId]);  
    if(bbox.min.x < 0) {
      shelvesRef.current[selectedObjectId].position.x = (bbox.max.x - bbox.min.x) / 2;
    }
    if(bbox.max.x > width) {
      shelvesRef.current[selectedObjectId].position.x = width - (bbox.max.x - bbox.min.x) / 2;
    }
    if(bbox.min.z < 0) {
      shelvesRef.current[selectedObjectId].position.z = (bbox.max.z - bbox.min.z) / 2;
    }
    if(bbox.max.z > depth) {
      shelvesRef.current[selectedObjectId].position.z = depth - (bbox.max.z - bbox.min.z) / 2;
    }
  }

  function isColliding() {
    const shelfToCheck = shelvesRef.current[selectedObjectId]; 
    const newBBox = new THREE.Box3().setFromObject(shelfToCheck); 
  
    // Riduco dimensioni del BoundingBox per poter mettere scaffalature vicine
    const newMin = new THREE.Vector3().copy(newBBox.min).addScalar(0.1);
    const newMax = new THREE.Vector3().copy(newBBox.max).subScalar(0.1);
    const reducedBBox = new THREE.Box3(newMin, newMax);
  
    for (const element of shelves) {
      if (element.name === shelfToCheck.name) continue;
      
      const otherBBox = new THREE.Box3().setFromObject(shelvesRef.current[element.name]);   
      
      if (reducedBBox.intersectsBox(otherBBox)) {
        return true; 
      }
    }
  
    for (const element of products) {
      const otherBBox = new THREE.Box3().setFromObject(productsRef.current[element.name]);   
      
      if (reducedBBox.intersectsBox(otherBBox)) {
        return true; 
      }
    }
    
    return false; 
  }

  function constrain() {
    isInsideWarehouse();
    if(isColliding()) {
      const currentShelf = shelves.filter(shelf => shelf.name === selectedObjectId)[0];
      shelvesRef.current[selectedObjectId].position.x = currentShelf.x;
      shelvesRef.current[selectedObjectId].position.y = currentShelf.y; 
      shelvesRef.current[selectedObjectId].position.z = currentShelf.z;
    }
  }

  function handleClickProd(name) {
    console.log("selezionato prodotto " + name);
  }

  const lastAddedShelfId = useWarehouseStore(state => state.lastAddedShelfId);
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (shelvesRef.current[lastAddedShelfId]) {
        selectObject(lastAddedShelfId);
      }
    }, 0);

    return () => clearTimeout(timerId);
  }, [lastAddedShelfId]);

  return (
    <Canvas className='bg-gray-700 h-80-vh'>
      <PerspectiveCamera position={[0, height + (height * 3 / 2), depth + (depth / 2)]} fov={75} near={0.01} far={10000}/>
      <OrbitControls makeDefault />
      <ambientLight />
      <gridHelper args={[Math.max(depth, width)+3, (Math.max(depth, width)+3)*2, 'black', 'black']} position={[width/2, 0.001, depth/2]}/>
      
      {/* Render Warehouse */}
      <Warehouse x={width} y={height} z={depth}/>      

      {/* Render shelves */}
      {shelves.map((shelf) => (
        <ShelfMesh
          name={shelf.name}
          width={shelf.width}
          height={shelf.height}
          binSize={shelf.binSize}
          key={shelf.name}
          position={[shelf.x, shelf.y, shelf.z]}
          ref={(element) => shelvesRef.current[shelf.name] = element}
          onClick={() => handleClick(shelf.name)}
          onPointerMissed={handleUnclick}
          material_color={selectedObjectId === shelf.name ? '#ff6080' : 'white'} 
          dispose={null}
          />
        
      ))}

      {/* Render products */}
      {products.map((prod) => (
        <Box
          name={prod.name}
          key={prod.name}
          args={[prod.size, prod.size, prod.size]}
          position={[prod.x, prod.y, prod.z]}
          ref={(element) => productsRef.current[prod.name] = element}
          material-color={'green'}
          onClick={() => handleClickProd(prod.name)}
          dispose={null}
          />
      ))} 

      {/* Movimento scaffalature */}
      {selectedObjectId && <TransformControls showY={false} translationSnap={0.5} onMouseUp={updatePos} object={shelvesRef.current[selectedObjectId]} />}
    </Canvas>
  );
}