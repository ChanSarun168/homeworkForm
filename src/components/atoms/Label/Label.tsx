import React, { ReactNode } from 'react'

interface LabelProps{
  labelfor : string,
  children : ReactNode
}
const Label:React.FC<LabelProps> = ({labelfor , children}) => {  
  return (
    <div>
      <label htmlFor={labelfor}>{children}</label> 
    </div>
  )
}

export default Label
