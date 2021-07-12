import Products from '../../../models/ProductModel';

export const getProductDetail =  async(req, res) => {
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
