import React from 'react'

const Checkbox = ({id, name, label, onChange}) => (
    <li>
        <input id={id} type="checkbox" name={name} value={id} onChange={onChange}/>
        <label htmlFor={id}>{label}</label><br />
    </li>
)

export default Checkbox

