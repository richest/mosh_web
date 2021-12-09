import React, { forwardRef } from 'react';

const Select = (props, ref) => {
    return (
        <select
            ref={ref}
            name={props.name}
            className={props.class}
            onChange={props.onChange}
            disabled={props.disabled}
            value={props.value}
        >
            {props.children}
        </select>
    )
}
export default forwardRef(Select);