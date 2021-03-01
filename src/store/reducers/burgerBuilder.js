import * as actionType from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    price: 10,
    error: false,
    building: false
};

const INGREDIENT_PRICE = {
    salad: 5,
    cheese: 10,
    meat: 30,
    bacon: 25
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.ADD_INGREDEINTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ing]: state.ingredients[action.ing] + 1
                },
                price: state.price + INGREDIENT_PRICE[action.ing],
                building: true
            };

        case actionType.REM_INGREDEINTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ing]: state.ingredients[action.ing] - 1
                },
                price: state.price - INGREDIENT_PRICE[action.ing],
                building: true
            };
        
        case actionType.SET_INGREDEINTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                price: 10,
                building: false
            }

        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }

        default: return state;
    }
};

export default reducer;