import { useContext, useEffect } from "react";
import { DataContext } from "../../../store/GlobalState";
import Breadcrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";

//Ant Design
import 'antd/dist/antd.css';
import { Tabs, notification } from 'antd';

import Head from "next/head";
import { useRouter } from 'next/router';
import OrderItem from "./component/order-item";
import NotFound from "../../shared/utilities/not-found";

export default function OrderPage(props) {

    const { state } = useContext(DataContext);
    const { auth, orders } = state;

    const { TabPane } = Tabs;
    const router = useRouter();

    // Show All Orders
    const showAllOrder = (orders) => {
        return (
            orders.length > 0 ? (
                orders.map((order, index) => (
                    <OrderItem key={index} order={order}/>
                ))
            ) : (
                <NotFound text="Bạn chưa có đơn hàng nào"/>
            )
            
        )
    }

    // useEffect(() => {
    //     if(Object.keys(auth).length === 0) {
    //         router.replace('/login');
    //         notification.info({
    //             message: "Thông báo",
    //             description: "Vui lòng đăng nhập tài khoản để xem lịch sử đơn hàng",
    //             duration: 4
    //         });
    //     }
    // }, [auth.token]);

    return (
        <>
            <Head>
                <title>Lịch sử đơn hàng</title>
            </Head>

            <Breadcrumbs title="Đơn hàng"/>

            <div className="w-full bg-gray-100 pt-12 pb-20">
                <div className="w-10/12 mx-auto bg-white border border-gray-300 rounded-md px-8 pt-6 pb-10">
                    <div className="flex items-center py-2">
                        <span className="uppercase text-20 font-semibold bg-blue-600 text-gray-200 py-2 px-5 rounded-md">Lịch sử mua hàng</span>
                    </div>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Tất cả" key="1">
                            {showAllOrder(orders)}
                        </TabPane>
                        <TabPane tab="Chờ xác nhận" key="2">
                            Chờ xác nhận
                        </TabPane>
                        <TabPane tab="Đã xét duyệt" key="3">
                            Đã xét duyệt
                        </TabPane>
                        <TabPane tab="Đã huỷ" key="4">
                            Đã huỷ
                        </TabPane>
                    </Tabs>
                </div>
            </div>
            
        </>
    )
}