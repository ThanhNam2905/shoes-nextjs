import Head from "next/head";
import EditProductPage from "../../../../components/admin/products/edit-product/edit-product-page";
import { AdminLayout } from "../../../../layouts/admin-layout";

export default function EditProductAdmin(props) {
    return (
        <>
             <Head>
                <title>Edit Product Admin</title>
            </Head>

            <EditProductPage/>
        </>
    )
}

EditProductAdmin.Layout = AdminLayout;