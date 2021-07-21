import OrderPage from "../../components/index/order/order-page";
import { DefaultLayout } from "../../layouts/default-layout";

export default function Order(props) {
    return (
        <>
            <OrderPage/>
        </>
    )
}
Order.Layout = DefaultLayout;