import { createContext, useEffect, useReducer } from 'react';
import reducers from './Reducers';

export const DataContext = createContext();

export const DataProvider = ({children}) => {

    const initialState = { notify: {}, auth: {}, cart: [], modal: {} };
    const [ state, dispatch ] = useReducer(reducers, initialState);
    const { cart } = state;

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