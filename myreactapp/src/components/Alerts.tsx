import React from 'react'
interface AlertProps {
    children: React.ReactNode;
}
const Alerts = ({children}:AlertProps) => {
  return (
    <div className="alert alert-danger">
        {children}
    </div>
  )
}

export default Alerts
