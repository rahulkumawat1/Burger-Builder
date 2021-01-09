import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const buildcontrols = (props) => {

    const controls = Object.keys(props.ingredients)
        .map(igKey => {return {label: igKey[0].toUpperCase()+igKey.slice(1), type: igKey}});

    return (
        <div className={classes.BuildControls}>
            <div className={classes.price}><strong>Price: {props.price}</strong> </div>
            {controls.map(ctrl => 
                <BuildControl 
                    key={ctrl.label} 
                    disable={props.disabledInfo[ctrl.type]}
                    label={ctrl.label}
                    added = {() => props.addIngredient(ctrl.type)}
                    removed = {() => props.removeIngredient(ctrl.type)}
                />)
            }
            <button 
                onClick={props.buttonClick} 
                className={classes.OrderButton} 
                disabled={!props.purchasable}>ORDER</button>
        </div>
    );
};

export default buildcontrols;