import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Salad', type: 'salad'}
];

const buildcontrols = (props) => {
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
            <button className={classes.OrderButton} disabled={!props.purchasable}>ORDER</button>
        </div>
    );
};

export default buildcontrols;