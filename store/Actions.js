
export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_CART: 'ADD_CART',
    ADD_MODAL: 'ADD_MODAL'
}

export const addToCart = (product, cart) => {
    return ({ type: "ADD_CART", payload: [...cart, {...product, quantity: 1}]})
}

export const deleteItemCart = (data, id, type) => {
    const newData = data.filter(item => item.productId !== id);
    return ({ type, payload: newData });
}