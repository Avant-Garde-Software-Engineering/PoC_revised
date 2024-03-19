const WhsMesh = ({width, depth, height}) => {
    return (
      <mesh>
          <boxGeometry args={[width, height, depth]}/>
          <meshStandardMaterial />
      </mesh>
    )
  }
  
  export default WhsMesh