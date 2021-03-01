import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import classes from './OrderSummery.css';
import Button from '../../UI/Button/Button';

const orderSummery = (props) => {

    const ingredientsList = Object.keys(props.ingredients)
        .map(igName => <li key={igName} className={classes.ListItem}>
            <span className={classes.ingName}>{igName}:</span> {props.ingredients[igName]}
            </li>);

    return (
        <Aux>
            <h3>Order Summery:</h3>
            <p>Your delicious burger with the following ingredients:-</p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Checkout?</p>
            <Button clicked={props.cancelCliked} btnType='Danger'>CANCEL</Button>
            <Button clicked={props.continueClicked} btnType='Success'>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummery;