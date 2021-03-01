import React from 'react';
import classes from './Button.css';

const button = (props) => {
    return <button
                disabled={props.disabled}
                onClick={(e) => props.clicked(e)} 
                className={[classes.Button, classes[props.btnType]].join(' ')}>{props.children}
           </button>;
};

export default button;