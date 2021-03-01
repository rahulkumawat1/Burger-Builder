import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildConrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {

    state = {
        puchasable: false,
        purchasing: false
    };

    componentDidMount() {
        this.props.init_ing();
    }

    checkForPurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
                        .map(key => ingredients[key])
                        .reduce((s, ele) => s+ele,0);

        return sum > 0;
    };

    purchaseHandler = () => {
        if(this.props.isAuth)
            this.setState({purchasing: true});
        else {
            this.props.setAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    modalClosed = () => {
        this.setState({purchasing: false});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You have placed order');
        this.props.init_burgerPurchase();
        this.props.history.push('/checkout');
    }

    render() {

        let disabledInfo = {...this.props.ingredients};

        for(let key in disabledInfo)
            disabledInfo[key] = (disabledInfo[key] <= 0);

        let orderSummery = null;
        let burger = this.props.error? <p>This is an error</p>: <Spinner/>;

        if(this.props.ingredients) {

            orderSummery = <OrderSummery 
                            price={this.props.price}
                            cancelCliked={this.purchaseCancelHandler} 
                            continueClicked={this.purchaseContinueHandler} 
                            ingredients={this.props.ingredients}
                        />;

            burger = (<Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    buttonClick={this.purchaseHandler}
                    ingredients = {this.props.ingredients}
                    price = {this.props.price}
                    disabledInfo = {disabledInfo} 
                    addIngredient={this.props.add_ing} 
                    removeIngredient={this.props.rem_ing}
                    purchasable={this.checkForPurchasable(this.props.ingredients)} />
            </Aux>);

        }

        return (
            <Aux>
                <Modal backdropClicked={this.modalClosed} show={this.state.purchasing}>
                    {orderSummery}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null   
    }
};

const mapDispatcherToProps = (dispatch) => {
    return {
        add_ing: (ingr) => dispatch(actions.add_ingredient({ing: ingr})),
        rem_ing: (ingr) => dispatch(actions.rem_ingredient({ing: ingr})),
        init_ing: () => dispatch(actions.init_ingredients()),
        init_burgerPurchase: () => dispatch(actions.burgerPurchaseInit()),
        setAuthRedirectPath: (path) => dispatch(actions.setRedirectPath(path))
    };
}

export default connect(mapStateToProps, mapDispatcherToProps)(withErrorHandler(BurgerBuilder, axios));