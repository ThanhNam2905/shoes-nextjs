import connectDB from '../../../utils/connectDB';
import Orders from '../../../models/OrderModel';
import Products from '../../../models/ProductModel';
import Auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
    switch(req.method) {
        case "POST": {
            await createOrder(req, res);
            break;
        }
    }
}

const createOrder = async (req, res) => {
    try {
        const result = await Auth(req, res);
        const { address, numberPhone, payment, cart, totalPrice } = req.body;

        const newOrder = new Orders({
            user: result.id,
            address,
            numberPhone,
            payment,
            cart,
            totalPrice
        })

        cart.filter(item => {
            return sold(item._id, item.qty, item.inStock, item.sold);
        })

        await newOrder.save();
        res.json({
            message: "Đặt hàng thành công! Chúng tôi sẽ liên lạc lại để xác nhận đơn hàng của bạn",
            newOrder
        });
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const sold = async (id, quantity, oldInStock, oldSold) => {
    await Products.findOneAndUpdate({_id: id}, {
        inStock: oldInStock - quantity,
        sold: oldSold + quantity
    })
}