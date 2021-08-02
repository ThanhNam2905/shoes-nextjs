import OrderAdminPage from "../../../components/admin/order/order-admin-page";
import { AdminLayout } from "../../../layouts/admin-layout";

export default function OrderManagerAdmin(props) {
    return (
        <>
            <OrderAdminPage/>
        </>
    )
}

OrderManagerAdmin.Layout = AdminLayout;