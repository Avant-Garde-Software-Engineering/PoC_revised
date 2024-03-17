const SideContent = ({value, onBtClick}) => {
  return (
    <li className="flex flex-row items-center"><p className="inline">{value}</p><button className="ml-auto cursor-pointer border-[2px] rounded-[5px] p-[0.2em] hover:bg-light" onClick={onBtClick}>Delete</button></li>
  )
}

export default SideContent