import React, {Component} from 'react';
import BurgerIngredientClasses from './BurgerIngredients.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render(){
        let ingredient = null;

        switch(this.props.type){
            case 'bread-bottom':
                ingredient = <div className={BurgerIngredientClasses.BreadBottom}></div>;
                break;
            case 'bread-top':
                ingredient = <div className={BurgerIngredientClasses.BreadTop}>
                                <div className={BurgerIngredientClasses.Seeds1}></div>
                                <div className={BurgerIngredientClasses.Seeds2}></div>
                            </div>;
                break;
            case 'meat':
                ingredient = <div className={BurgerIngredientClasses.Meat}></div>;
                break;
            case 'cheese':
                ingredient = <div className={BurgerIngredientClasses.Cheese}></div>;
                break;
            case 'salad':
                ingredient = <div className={BurgerIngredientClasses.Salad}></div>;
                break;
            case 'bacon':
                ingredient = <div className={BurgerIngredientClasses.Bacon}></div>;
                break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;