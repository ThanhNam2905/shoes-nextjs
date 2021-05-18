import { createContext, useEffect, useReducer } from 'react';
import reducers from './Reducers';
import { getData } from '../utils/fetchData';

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const initialState = { notify: {}, auth: {}, cart: [], modal: {} };
    const [ state, dispatch ] = useReducer(reducers, initialState);
    const { cart } = state;

    // Function Login
    useEffect(() => {
        const authLogin = localStorage.getItem('auth-login');
        if(authLogin) {
            getData('auth/accessToken').then(res => {
                // console.log(res);
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

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}