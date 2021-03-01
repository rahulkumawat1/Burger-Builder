import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {


    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    render() {

        let summery = <h1 
            style={{
                color: '#7e7474', 
                textAlign: 'center',
                textShadow: '2px 2px 2px #c4b6b6',
                fontSize: 'xxx-large'}}>Ingredients not selected</h1>

        if(this.props.ingredients)
            summery = (
                <div>
                    <CheckoutSummery 
                        ingredients={this.props.ingredients}
                        continueClicked={this.continueHandler}
                        cancelClicked={this.cancelHandler}/>

                    <Route 
                        path={this.props.match.url + '/contact-data'} 
                        component={ContactData}
                    />
                </div>
            );

        return this.props.purchased? <Redirect to='/'/>: summery;
    }    
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}


export default connect(mapStateToProps)(Checkout);