import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const add_ingredient = payload => {
    return {
            type: actionTypes.ADD_INGREDEINTS,
            ing: payload.ing
        };
}

export const rem_ingredient = payload => {
    return{
            type: actionTypes.REM_INGREDEINTS,
            ing: payload.ing
        };
}

export const set_ingredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDEINTS,
        ingredients: ingredients
    }
}

export const fetch_ingredients_failed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const init_ingredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(res => dispatch(set_ingredients(res.data)))
            .catch(err => dispatch(fetch_ingredients_failed()));
    }
}