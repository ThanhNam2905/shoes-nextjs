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
class APIFeatures {
    query: any; 
    queryString: any;
    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = {...this.queryString};

        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach(element => delete(queryObj[element]));

        if(queryObj.category !== 'all') {
            this.query.find({ category: queryObj.category });
        }
        if(queryObj.name !== 'all') {
            this.query.find({ name: {$regex: queryObj.name }})
        }
        this.query.find();
        return this;
    }
    sorting() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('');
            this.query = this.query.sort(sortBy);
        }
        else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 8;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

const getProducts = async (req, res) => {
    try {
        const features = new APIFeatures(Products.find(), req.query).filtering().sorting().paginating();
        const products = await features.query;
        // console.log(req.query);
        
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

