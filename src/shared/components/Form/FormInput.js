import React from 'react'

export const FormInput = ({id, label, type, value, onValueChange}) => {
  const handleOnInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    onValueChange(key, value)
  }
  
    return (
    <>
        <label>{label}</label>
        <input name={id} type={type} onChange={handleOnInput}/>
    </>
  )
}