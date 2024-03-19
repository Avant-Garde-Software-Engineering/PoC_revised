const SideGroup = ({id, title, content}) => {
    return (
        <div className="side_content max-[768px]:w-[50%] max-[768px]:mx-auto" id={id}>
            <h2 className="text-lg font-semibold">{title}</h2>
            <ul className="list-none">
                <div className="ml-[1.4em] flex flex-col gap-[0.2em]">
                    {content}
                </div>
            </ul>
        </div>
    )
}

export default SideGroup