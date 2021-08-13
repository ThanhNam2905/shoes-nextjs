import { ACTIONS } from './Actions';

const reducers = (state, action) => {
    switch(action.type) {
        case ACTIONS.AUTH:
            return {
                ...state,
                auth: action.payload
            };
            break;
        case ACTIONS.ADD_CART:
            return {
                ...state,
                cart: action.payload
            };
            break;
        case ACTIONS.ADD_ORDERS: 
            return {
                ...state,
                orders: action.payload
            };
            break;
        case ACTIONS.ADD_USERS: 
            return {
                ...state,
                users: action.payload
            };
            break; 
        case ACTIONS.ADD_CATEGORIES: 
            return {
                ...state,
                categories: action.payload
            };
            break;
        case ACTIONS.DELETE_PRODUCT: 
            return {
                ...state,
                products: action.payload
            };
            break; 
        default:
            return state;
    }
}

export default reducers;