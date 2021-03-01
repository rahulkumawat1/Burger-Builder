import React from 'react';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';
import BurgerClasses from './Burger.css';

const burger = (props) => {

    let burgerIngredients = Object.keys(props.ingredients)
        .map(ingName => {
            return [...Array(props.ingredients[ingName])].map((_, index) => 
                <BurgerIngredient key={ingName+index} type={ingName}/>);
        }).reduce((arr, ele) => arr.concat(ele),[]);
        
    if(burgerIngredients.length === 0)
        burgerIngredients = <p>Please add ingredients</p>
        

    return (
        <div className={BurgerClasses.Burger}>
            <BurgerIngredient type="bread-top"/>
            {burgerIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;