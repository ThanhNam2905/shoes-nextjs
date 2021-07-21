// Ant Design
import 'antd/dist/antd.css';
import { Button } from 'antd';
import Link from 'next/link';
import { AiOutlineShopping } from "react-icons/ai";

type PropsType = {
    [x: string]: any;
    order: any;
}

export default function OrderItem({ order }: PropsType) {

    return (
        <>  
            <div className="order__item flex items-center justify-between mt-4 py-3 px-6 border border-gray-300 rounded-md">
                <div>
                    <p className="font-medium">Mã đơn hàng: <span className="font-bold text-16">{order._id}</span></p>
                    <p className="font-medium">Tổng sản phẩm: <span className="font-bold text-16">{order.cart.length} sản phẩm</span></p>
                    <p className="font-medium">Tổng tiền: <span className="font-bold text-16 text-blue-500">{new Intl.NumberFormat('de-DE').format(order.totalPrice)}</span></p>
                    <p className="font-medium">Trạng thái đơn hàng: <span className="font-bold text-16">{order.delivered ? "Hoàn thành" : "Chờ xác nhận"}</span></p>
                    <p className="font-medium">Thời gian đặt hàng: { new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href={`/order/${order._id}`}>
                        <a className="text-16 font-semibold bg-blue-600 opacity-80 hover:opacity-100 text-white hover:text-white hover:underline py-2 px-4 rounded-md">Chi tiết đơn hàng</a>
                    </Link>
                    <Button type="default" size="large" className="btn__shopping" icon={<AiOutlineShopping className="mr-1"/>}>Mua lại</Button>
                </div>
            </div>
        </>
    )
}