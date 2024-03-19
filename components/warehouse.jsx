import * as THREE from 'three';

export default function Warehouse({x, y, z}) {
  return(
  <mesh position={[x/2, y/2, z/2]}>
    <boxGeometry args={[x, y, z]} />
    <meshLambertMaterial attach="material-0" color='#cccccc' side={THREE.BackSide} /> {/* right */}
    <meshLambertMaterial attach="material-1" color='#cccccc' side={THREE.BackSide} /> {/* left */}
    <meshBasicMaterial attach="material-2" transparent opacity={0.1} /> {/* top */}
    <meshBasicMaterial attach="material-3" color='#cccccc' side={THREE.DoubleSide}/> {/* bottom */}
    <meshLambertMaterial attach="material-4" color='#cccccc' side={THREE.BackSide} /> {/* front */}
    <meshLambertMaterial attach="material-5" color='#cccccc' side={THREE.BackSide} /> {/* back */}     
  </mesh>);
}