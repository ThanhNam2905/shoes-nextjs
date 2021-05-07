import Products from '../../../models/ProductModel';
const  baseURL = process.env.BASE_URL;

export const getData = async (url, token?) => {
    const res = await fetch(`${baseURL}/api/${url}`, {
        method: "GET",
        headers: {
            'Authorization': token,
        },
    })
    const data = await res.json();

    return data;
}

export const getProductDetail =  (id,cart=false) => {
    console.log(id)
    console.log(cart);
    
        if (cart == true){
        let product =  Products.findById(id);
            
        }

        // Check this product do not exists or not
    //    console.log(product)
        // return product;
    
}