import connectDB from '../../../utils/connectDB';
import Products from '../../../models/ProductModel';

connectDB();

export default async (request, response) => {
    switch(request.method) {
        case 'GET': 
            await getProductDetail(request, response);
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
