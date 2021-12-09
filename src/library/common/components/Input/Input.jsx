import React, {forwardRef} from 'react';

const Input = (props, ref) => {
 
    return (
        <input
            id={props.id}
            ref={ref}
            disabled={props.disabled}
            onChange={props.onChange}
            type={props.type}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            checked={props.checked}
            data-toggle={props.dataToggle} 
            data-target={props.dataTarget}
            data-dismiss={props.dataDismiss}
            className={props.class}
            onClick={props.onClick}
            accept={props.accept} 
            min={props.min}
            maxlength = {props.maxlength}/>
    )
}
export default forwardRef(Input);