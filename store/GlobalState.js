import { createContext, useEffect, useReducer } from 'react';
import reducers from './Reducers';
import { getData } from '../utils/fetchData';
import { message } from 'antd';

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const initialState = { auth: {}, cart: [], orders: [], users: [], categories: [] };
    const [ state, dispatch ] = useReducer(reducers, initialState);
    const { cart, auth } = state;

    // Function Login
    useEffect(() => {
        const authLogin = localStorage.getItem('auth-login');
        if(authLogin) {
            getData('auth/accessToken').then(res => {
                if(res.err) {
                    return localStorage.removeItem('auth-login');
                }
                dispatch({ 
                    type: "AUTH",
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            });
            getData('category').then(res => {
                if(res.err) {
                    message.error(res.err);
                }
                dispatch({ 
                    type: "ADD_CATEGORIES",
                    payload: res.categories
                })
            });
        }
    }, []);

    // Function Cart
    useEffect(() => {
        const cartItem = JSON.parse(localStorage.getItem("cartItem"));
        if(cartItem) {
            dispatch({ type: "ADD_CART", payload: cartItem })
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cartItem", JSON.stringify(cart))
    }, [cart]);

    useEffect(() => {
        if(auth.token) {
            getData('order', auth.token)
            .then(res => {
                if(res.error) {
                    message.error(res.error);
                }
                dispatch({ type: "ADD_ORDERS", payload: res.orders});
            })

            // Get Users
            if(auth.user.role === "admin") {
                getData('user', auth.token)
                .then(res => {
                    if(res.error) {
                        message.error(res.error);
                    }
                    dispatch({ type: "ADD_USERS", payload: res.users});
                })
            }
        }
        else {
            dispatch({ type: "ADD_ORDERS", payload: []});
            dispatch({ type: "ADD_USERS", payload: []});
        }
    }, [auth.token]);

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}