import connectDB from '../../../../utils/connectDB';
import Orders from '../../../../models/OrderModel';
import auth from '../../../../middleware/auth';

connectDB();

export default async (req, res) => {
    switch(req.method) {
        case "PATCH":
            await deliveredOrder(req, res);
            break;
    }
}

const deliveredOrder = async (req, res) => {
    try {
        const result = await auth(req, res);
        if(result.role !== "admin") {
            return res.status(400).json({ error: "Authentication is not valid."});
        }
        const { id } = req.query;

        const order = await Orders.findOne({_id: id});
        if(order.paid) {
            await Orders.findOneAndUpdate({_id: id}, { delivered: true });
            res.json({ 
                msg: "Cập nhật đơn hàng thành công!",
                result: {
                    paid: true,
                    dateOfPayment: order.dateOfPayment,
                    payment: order.payment,
                    delivered: true
                }
            });
        }
        else {
            await Orders.findOneAndUpdate({_id: id}, {
                paid: true, dateOfPayment: new Date().toISOString(), 
                payment: 1,
                delivered: true
            })

            res.json({
                msg: "Cập nhật đơn hàng thành công!",
                result: {
                    paid: true, 
                    dateOfPayment: new Date().toISOString(), 
                    payment: 1,
                    delivered: true
                }
            })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}