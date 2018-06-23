import React from 'react'

const Radio = ({id, name, checked, label, onChange}) => (
    <li>
        <input id={id} type='radio' name={name} value={id} checked={checked} onChange={onChange} />
        <label htmlFor={id}>{label}</label>
    </li>
)

export default Radio