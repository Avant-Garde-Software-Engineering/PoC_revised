const ModalOverlay = ({hidden, id, children}) => {
  if(hidden) return <></>
  return (
    <div id={id} className="flex fixed top-0 left-0 w-[100%] h-[100%] bg-mask justify-center items-center">
        <div className="bg-dark p-[1em] rounded-[5px] text-center">
            { children }
        </div>
    </div>
  )
}

export default ModalOverlay