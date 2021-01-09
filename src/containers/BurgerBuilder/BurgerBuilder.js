import React, {Component} from 'react';
import Aux from '../../hoc/Layout/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildConrols';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

const INGREDIENT_PRICE = {
    salad: 5,
    cheese: 10,
    meat: 30,
    bacon: 25
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        price: 10,
        puchasable: false,
        purchasing: false
    };

    addIngredient = (type) => {
        let newIngredients = {...this.state.ingredients};
        newIngredients[type] = newIngredients[type] + 1;
        const newPrice = this.state.price + INGREDIENT_PRICE[type];

        this.setState({price: newPrice, ingredients: newIngredients});
        
        this.checkForPurchasable(newIngredients);
    };

    removeIngredient = (type) => {
        let newIngredients = {...this.state.ingredients};

        if(newIngredients[type] > 0){
            newIngredients[type] = newIngredients[type] - 1;
            const newPrice = this.state.price - INGREDIENT_PRICE[type];
            this.setState({price: newPrice, ingredients: newIngredients});
            this.checkForPurchasable(newIngredients);
        }
    };

    checkForPurchasable = (ingredients) => {
        const sum = Object.keys(ingredients)
                        .map(key => ingredients[key])
                        .reduce((s, ele) => s+ele,0);

        this.setState({puchasable: sum>0});
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    modalClosed = () => {
        this.setState({purchasing: false});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You have placed order');
    }

    render() {

        let disabledInfo = {...this.state.ingredients};

        for(let key in disabledInfo)
            disabledInfo[key] = (disabledInfo[key] <= 0);

        return (
            <Aux>
                <Modal backdropClicked={this.modalClosed} show={this.state.purchasing}>
                    <OrderSummery 
                        price={this.state.price}
                        cancelCliked={this.purchaseCancelHandler} 
                        continueClicked={this.purchaseContinueHandler} 
                        ingredients={this.state.ingredients}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    buttonClick={this.purchaseHandler}
                    ingredients = {this.state.ingredients}
                    price = {this.state.price}
                    disabledInfo = {disabledInfo} 
                    addIngredient={this.addIngredient} 
                    removeIngredient={this.removeIngredient}
                    purchasable={this.state.puchasable} />
            </Aux>
        );
    }
}

export default BurgerBuilder;