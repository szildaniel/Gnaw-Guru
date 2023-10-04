import React from 'react'

type Props = {
  children: string | JSX.Element | JSX.Element[] 
}

export const ResetPwContainer = ({children}: Props) => {
  return (
    <div className="reset__container"> {children} </div>
  ) 
}
