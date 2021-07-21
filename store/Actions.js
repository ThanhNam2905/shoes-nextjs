
export const ACTIONS = {
    AUTH: 'AUTH',
    ADD_CART: 'ADD_CART',
    ADD_MODAL: 'ADD_MODAL',
    ADD_ORDERS: 'ADD_ORDERS'
}

export const addToCart = (product, cart) => {
    return ({ type: "ADD_CART", payload: [...cart, {...product, quantity: 1}]})
}

export const deleteItemCart = (data, id, type) => {
    const newData = data.filter(item => item.idCart !== id);
    return ({ type, payload: newData });
}