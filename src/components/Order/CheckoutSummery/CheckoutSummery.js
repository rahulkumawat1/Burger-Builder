import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.css';

const checkoutSummery = (props) => {

    return (
        <div className={classes.OrderSummery}>
            <h1>It is Delicious. :)</h1>
            <Burger ingredients={props.ingredients}/>
            <Button btnType='Danger' clicked={props.cancelClicked}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continueClicked}>CONTINUE</Button>
        </div> 
            
    );
}

export default checkoutSummery;