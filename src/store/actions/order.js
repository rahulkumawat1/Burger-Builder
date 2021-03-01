import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const burgerPurchasedSuccess = payload => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        id: payload.id,
        orderData: payload.orderData
    };
}

export const burgerPurchasedFailed = payload => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAILED,
        error: payload.error
    };
}

export const burgerPurchaseStart = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_START
    }
}

export const burgerPurchaseInit = () => {
    return {
        type: actionTypes.BURGER_PURCHASING_INIT
    }
}

export const burgerPurchase = (order, token) => {
    return dispatch => {
        dispatch(burgerPurchaseStart());
        axios.post('/orders.json?auth=' + token, order)
            .then(responce => {
                dispatch(burgerPurchasedSuccess({id: responce.data.name, orderData: order}));
            })
            .catch(error => {
                dispatch(burgerPurchasedFailed({error: error}));
            });
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo"' + userId + '"';

        axios.get('/orders.json' + queryParams)
            .then(res => {
                const orders = [];
                for(let i in res.data)
                    if(res.data[i].userId === userId)
                        orders.push({
                            ...res.data[i],
                            id: i
                        });
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
            });
        }
            
}

export const reorder = (orderId) => {
    return dispatch => {

        const token = localStorage.getItem('token');


        axios.get('/orders.json?auth=' + token)
            .then(res => {
                const order = res.data[orderId];
                dispatch(burgerPurchase(order, token));                
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error));
            });
    }
}
