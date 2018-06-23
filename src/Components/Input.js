import React from 'react'

const Input = ({name, placeholder, value, className, onBlur, onChange}) => (
    <input type='text' name={name} value={value} className={className} onBlur={onBlur} placeholder={placeholder} onChange={onChange} />
)

export default Input