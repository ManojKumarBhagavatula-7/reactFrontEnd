import React, { Children } from 'react'

interface ButtonProps {
    children: string;
    onClick: () => void;
}
const Button = ({children, onClick}:ButtonProps) => {
  return (
    <div className="btn btn-primary" onClick={onClick}>
      {children}
    </div>
  )
}

export default Button
