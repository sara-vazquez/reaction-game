import React from 'react'
import './Button.css'

const Button = ({onClick}) => {

  return (
    <div>
        <button className="btnAction" onClick={onClick}>Iniciar</button>
    </div>
  )
}

export default Button