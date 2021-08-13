import Head from "next/head";
import OrderAdminPage from "../../../components/admin/orders/order-admin-page";
import { AdminLayout } from "../../../layouts/admin-layout";

export default function OrderManagerAdmin(props) {
    return (
        <>
            <Head>
                <title>Orders Manager</title>
            </Head>

            <OrderAdminPage/>
        </>
    )
}

OrderManagerAdmin.Layout = AdminLayout;