"use client"

import "@styles/globals.css"

const Button = ({id, value, title, classtype, onclick}) => {
  return (
    <button id={id} title={title} onClick={onclick} className={`${classtype} indent-[-999em] bg-no-repeat bg-cover w-[3.5em] h-[3.5em] mx-[0.5em] my-[0.1em] hover:bg-light rounded-[15px]`}>
        {value}
    </button>
  )
}

export default Button