import OrderDetailPage from "../../components/index/order-detail/order-detail-page";
import { DefaultLayout } from "../../layouts/default-layout";

export default function OrderDetail(props) {
    return (
        <>
            <OrderDetailPage/>
        </>
    )
}
OrderDetail.Layout = DefaultLayout;