import Head from "next/head";
import Breadcrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import OrderDetailItem from "./component/order-detail-item";
// React Icon
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

const PAYMENT_CHECKOUT = {
    payment_on_delivery: 1
}


export default function OrderDetailPage(props) {

    const { state, dispatch } = useContext(DataContext);
    const { orders, auth } = state;

    const router = useRouter();
    // console.log(router);

    const [orderDetail, setOrderDetail] = useState([]);

    useEffect(() => {
        const newArray = orders.filter(order => order._id === router.query.id);
        setOrderDetail(newArray);
    }, [orders]);

    const formatDate = (datetime) => {
        const date = new Date(datetime);
        const year = new Intl.DateTimeFormat('vi', { year: 'numeric' }).format(date);
        const month = new Intl.DateTimeFormat('vi', { month: 'long' }).format(date);
        const day = new Intl.DateTimeFormat('vi', { day: '2-digit' }).format(date);
        const weekday = new Intl.DateTimeFormat('vi', { weekday: 'long' }).format(date);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const result = `${hours} giờ ${minutes} phút - ${weekday}, ${day}, ${month}, ${year} `;
        return (
            <>
                <span className="font-medium text-16 text-gray-700">{result}</span>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>Trang Chi tiết đơn hàng</title>
            </Head>

            <Breadcrumbs title="Chi tiết đơn hàng" />

            {/* Order Detail Content */}
            <div className="wrapper__order-detail w-4/5 mx-auto py-10">
                <div className="btn-back">
                    <button onClick={() => router.back()} className="bg-blue-600 text-white py-2 px-4 rounded-md flex items-center opacity-80 hover:opacity-100 hover:underline focus:outline-none hover:shadow-md">
                        <AiOutlineArrowLeft className="text-16 mr-2" />
                        <span>Quay lại lịch sử đơn hàng</span>
                    </button>
                </div>

                <div className="w-full mt-8">
                    
                        {
                            orderDetail.length > 0 &&
                                orderDetail.map((order, index) => (
                                    
                                        <div key={order._id}>
                                            <div className="flex items-center justify-between pb-1 border-b-2 border-gray-200 mb-0">
                                                <h2 className="text-18 capitalize mb-0">Mã đơn hàng: {order._id}</h2>
                                                <h2 className="text-18 capitalize mb-0">Trạng thái đơn hàng: {order.delivered ? "Hoàn thành" : "Chờ xác nhận"}</h2>
                                            </div>

                                            <div className="mt-5 mb-10 border-2 text-16 text-gray-900 border-blue-500 bg-blue-50 px-5 py-3 rounded-md">
                                                <p className="font-semibold ">Địa chỉ giao hàng: 
                                                    <span className="font-medium text-gray-700 ml-1">{order.address}</span>
                                                </p>
                                                <p className="font-semibold">Thông tin liên lạc: 
                                                    <span className="font-medium text-gray-700 ml-1">{order.user.username}</span>   
                                                </p>
                                                <p className="font-semibold">Số điện thoại:
                                                    <span className="font-medium text-gray-700 ml-1">{order.user.phone}</span>
                                                </p>
                                                <p className="font-semibold">Phương thức thanh toán: 
                                                    <span className="font-medium text-gray-700 ml-1">{order.payment === PAYMENT_CHECKOUT.payment_on_delivery ? "Thanh toán khi nhận hàng" : "CHưa xác định"}</span>
                                                </p>
                                                <p className="font-semibold mb-2">Ngày đặt hàng: {formatDate(order.createdAt)}</p>
                                            </div>

                                            <h2 className="text-18 capitalize pb-1 border-b-2 border-gray-200 mb-0">Danh sách sản phẩm: 
                                                <span className=" ml-1.5 text-16 text-gray-500 font-normal">{order.cart.length} sản phẩm</span>
                                            </h2>
                                            <div className="">
                                                {
                                                    order.cart.length > 0 && 
                                                        order.cart.map((item, index) => (
                                                            <OrderDetailItem data={item} key={index}/>
                                                        ))
                                                }
                                            </div>

                                            <div className="w-full flex justify-end">
                                                <div className="mt-10 bg-blue-50 border-2 border-blue-500 py-4 px-6 rounded-md">
                                                    <div className="flex items-center border-b-2 border-gray-400">
                                                        <RiMoneyDollarBoxLine className="mt-0.5 mr-1 text-22"/>
                                                        <span className="text-24 font-semibold capitalize tracking-wide">Tổng số tiền</span>
                                                    </div>
                                                    <p className="text-26 font-semibold text-red-500 text-right mb-0">{new Intl.NumberFormat("de-DE").format(order.totalPrice)} đ</p>
                                                </div>
                                            </div>    
                                        </div>

                                        
                                    
                                ))                          
                        }
                </div>

                
            </div>
        </>
    )
}