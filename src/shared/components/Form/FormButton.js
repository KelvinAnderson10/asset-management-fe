import React from 'react'

export const FormButton = ({label, onClick, disabled=false}) => {
  return <button disabled={disabled} onClick={onClick}>{label}</button>
}