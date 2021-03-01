import axios from 'axios';
import * as actionType from './actionTypes';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFailed = (error) => {
    return {
        type: actionType.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresDateIn');
    localStorage.removeItem('userId');

    return {
        type: actionType.LOGOUT
    }
}

export const authTimeout = (timeout) => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), timeout * 1000);
    }
}

export const auth = (payload) => {
    return (dispatch) => {
        dispatch(authStart());

        const authData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDcWnJ0wTu3PUwTEL70kpwo2J8DstvZevc';      // SignUp

        if(!payload.isSignUp)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDcWnJ0wTu3PUwTEL70kpwo2J8DstvZevc';   //SignIn

        axios.post(url, authData)
            .then(response => {
                const expiresDateIn = new Date(new Date().getTime() + response.data.expiresIn*1000);

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expiresDateIn', expiresDateIn);
                localStorage.setItem('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(authTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error.message));
            });
        // store payload on server
    }
}

export const setRedirectPath = (path) => {
    return {
        type: actionType.SET_REDIRECT_PATH,
        path: path
    }
} 

export const authStateCheck = () => {

    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) dispatch(logout());
        else {
            const expiresDate = new Date(localStorage.getItem('expiresDateIn'));
            if(expiresDate > new Date()){
                dispatch(authSuccess(token, localStorage.getItem('userId')));
                dispatch(authTimeout((expiresDate.getTime() - new Date().getTime())/1000));
            }
            else dispatch(logout());
        }
    }
}