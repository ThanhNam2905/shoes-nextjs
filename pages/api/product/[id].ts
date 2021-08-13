import connectDB from '../../../utils/connectDB';
import Products from '../../../models/ProductModel';
import Auth from '../../../middleware/auth';

connectDB();

export default async (request, response) => {
    switch(request.method) {
        case 'GET': 
            await getProductDetail(request, response);
            break;
        case 'PUT':
            await updateProduct(request, response);
            break;
        case 'DELETE':
            await deleteProduct(request, response);
            break;
    }
}

const getProductDetail =  async(req, res) => {
   try {
       const { id } = req.query;
       const product = await Products.findById(id);
       if(!product) {
           return res.status(400).json({ err: "Sản phẩm này không tồn tại "})
       }
       res.json({ product });

   } catch (error) {
       return res.status(500).json({ err: error.message})
   }
}

const updateProduct = async(req, res) => {
    try {
        const result = await Auth(req, res);
        if(result.role !== 'admin') {
            return res.status(400).json({ error: "Authentication is not valid"});
        }

        const { id } = req.query;
        const { name, code, description, infoProduct, category, productType, productLine, sizes, material, 
            colors, gender, tagProduct, images, accessories, price, discount, inStock
        } = req.body;

        await Products.findOneAndUpdate({_id: id}, {
            name, code, description, infoProduct, category, productType, productLine, sizes, material, 
            colors, gender, tagProduct, images, accessories, price, discount, inStock
        })

        res.json({
            msg: "Cập nhật sản phẩm thành công!"
        })
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

const deleteProduct = async(req, res) => {
    try {
        const result = await Auth(req, res);
        if(result.role !== 'admin') {
            return res.status(400).json({ error: 'Authentication is not valid'});
        }

        const { id } = req.query;
        await Products.findByIdAndDelete(id);
        
        res.json({
            msg: "Delete sản phẩm thành công!"
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}