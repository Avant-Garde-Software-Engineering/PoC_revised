const ShelfMesh = ({name}) => {
  return (
    <mesh name={name}>
        <boxGeometry />
        <meshStandardMaterial />
    </mesh>
  )
}

export default ShelfMesh