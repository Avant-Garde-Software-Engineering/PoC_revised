const ModalOverlay = ({id,  children}) => {
  return (
    <div id={id} className="fixed top-0 left-0 w-[100%] h-[100%] bg-mask justify-center items-center hidden">
        <div className="bg-dark p-[1em] rounded-[5px] text-center">
            { children }
        </div>
    </div>
  )
}

export default ModalOverlay