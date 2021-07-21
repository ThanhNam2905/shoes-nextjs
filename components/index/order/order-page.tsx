import { useContext } from "react";
import { DataContext } from "../../../store/GlobalState";
import Breadcrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";

//Ant Design
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import Head from "next/head";
import OrderItem from "./component/order-item";


export default function OrderPage(props) {

    const { state } = useContext(DataContext);
    const { orders } = state;

    const { TabPane } = Tabs;

    // Show All Orders
    const showAllOrder = (orders) => {
        return (
            orders.map((order, index) => (
                <OrderItem key={index} order={order}/>
            ))
        )
    }

    return (
        <>
            <Head>
                <title>Lịch sử đơn hàng</title>
            </Head>

            <Breadcrumbs title="Đơn hàng"/>

            <div className="w-full bg-gray-100 py-9">
                <div className="w-10/12 mx-auto bg-white border border-gray-300 rounded-md px-8 py-6">
                    <div className="flex items-center py-4">
                        <span className="uppercase text-20 font-semibold">Lịch sử mua hàng</span>
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