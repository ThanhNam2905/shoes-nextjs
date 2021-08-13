import Head from "next/head";
import CreateProductPage from "../../../../components/admin/products/create-product/create-product-page";
import { AdminLayout } from "../../../../layouts/admin-layout";


export default function CreateProductAdmin(props) {
    return (
        <>
            <Head>
                <title>Create Product Admin</title>
            </Head>

            <CreateProductPage/>
        </>
    )
}

CreateProductAdmin.Layout = AdminLayout;