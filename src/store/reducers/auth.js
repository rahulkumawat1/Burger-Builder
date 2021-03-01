import * as actionType from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    redirectPath: '/'
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionType.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                loading: false
            }
        case actionType.AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionType.LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        case actionType.SET_REDIRECT_PATH:
            return {
                ...state,
                redirectPath: action.path
            }
        default: return state;
    }
}

export default authReducer;