const FormGroup = ({innerRef, labelText, type, id, step='', min='', max=''}) => {
    return (
        <div className="form_group p-[0.5em] flex flex-row w-[100%]">
            <label className="mr-[1em]" htmlFor={id}>{labelText}</label>
            <input ref={innerRef} className="text-textDarkColor ml-auto px-[0.2em] py-[0.1em]" type={type} id={id} step={step} min={min} max={max} required/>
        </div>
    )
}

export default FormGroup