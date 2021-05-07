
export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_CART: 'ADD_CART'
}

export const addToCart = (product, cart) => {

    return ({ type: "ADD_CART", payload: [...cart, {...product, quantity: 1}]})
}