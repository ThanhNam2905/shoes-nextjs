import connectDB from '../../../utils/connectDB';
import Products from '../../../models/ProductModel';
import Auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
    switch(req.method) {
        case 'GET': 
            await getProducts(req, res);
            break;
        case 'POST': 
            await createProduct(req, res);
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

const createProduct = async (req, res) => {
    try {
        const result = await Auth(req, res);
        if(result.role !== "admin") {
            return res.status(400).json({ error: "Authentication is not valid."});
        }
        
        const { name, code, description, infoProduct, category,
            productType, productLine, sizes, material, colors, gender, tagProduct,
            images, accessories, price, discount, inStock
        } = req.body;

        const checkProduct = await Products.findOne({name});
        if(checkProduct) {
            return res.status(400).json({ error: "Sản phẩm này đã tồn tại"});
        }

        const newProduct = new Products({
            name, code, description, infoProduct, category,
            productType, productLine, sizes, material, colors, gender, tagProduct,
            images, accessories, price, discount, inStock
        });

        await newProduct.save();
        res.json({
            msg: "Thêm mới sản phẩm thành công"
        })

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}