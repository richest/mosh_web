import React from 'react';

const Button = (props) => {
    return (
        <a
            className={props.className}
            href={props.href}
            disabled={props.disabled}
            onClick={props.onClick} >
            {props.children}
        </a>
    )
}
export default Button;
