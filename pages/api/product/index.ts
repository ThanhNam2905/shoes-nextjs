import connectDB from '../../../utils/connectDB';
import Products from '../../../models/ProductModel';

connectDB();

export default async (request, response) => {
    switch(request.method) {
        case 'GET': 
            await getProducts(request, response);
            break;
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Products.find();

        res.json({
            status: 'success',
            result: products.length,
            products
        })
    } catch (error) {
        return res.status(500).json({err: error.message})
    }
}