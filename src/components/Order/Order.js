import React from 'react';
import { connect } from 'react-redux';
import classes from './Order.css';
import Button from '../UI/Button/Button';
import * as actions from '../../store/actions/index';

const order = (props) => {

    const ingredients = Object.keys(props.ingredients)
                            .map(key => 
                                <span 
                                    key={key}
                                    className={classes.ing}>{key}: {props.ingredients[key]}
                                </span>);


    return (
        <div className={classes.Order}>
            <p><strong>Ingredients</strong>: {ingredients}</p>
            <p><strong style={{fontSize: '1.5rem'}}>Price: {props.price}</strong></p>
            <div style={{textAlign: 'center'}}>
                {/* <Button clicked={} btnType='Danger'>DELETE</Button> */}
                <Button clicked={() => props.reorder(props.id)} btnType='Success'>REORDER</Button>
            </div>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        reorder: (orderId) =>  dispatch(actions.reorder(orderId))
    }
}

export default connect(null, mapDispatchToProps)(order);