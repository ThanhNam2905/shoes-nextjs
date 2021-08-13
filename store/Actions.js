import { message } from "antd"

export const ACTIONS = {
    AUTH: 'AUTH',
    ADD_CART: 'ADD_CART',
    ADD_ORDERS: 'ADD_ORDERS',
    ADD_USERS: 'ADD_USERS',
    ADD_CATEGORIES: 'ADD_CATEGORIES',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
}

export const addToCart = (product, cart) => {
    if(product.inStock === 0) {
        message.error("Sản phẩm này đã hết hàng");
    } 
    return ({ type: "ADD_CART", payload: [...cart, {...product, quantity: 1}]})
}

export const deleteItemCart = (data, id, type) => {
    const newData = data.filter(item => item.idCart !== id);
    return ({ type, payload: newData });
}
export const updateItem = (data, id, post, type) => {
    const newData = data.map(item => (item._id === id ? post : item));
    return ({ type, payload: newData });
}
export const deleteItemUser = (data, id, type) => {
    const newData = data.filter(item => item._id !== id);
    return ({ type, payload: newData });
}
export const deleteItemCategory = (data, id, type) => {
    const newData = data.filter(item => item._id !== id);
    return ({ type, payload: newData });
}
export const deleteItemProduct = (data, id, type) => {
    const newData = data.filter(item => item._id !== id);
    return ({ type, payload: newData });
}