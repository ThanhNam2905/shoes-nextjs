import Head from "next/head";
import { useState } from "react";
import ProductAdminPage from "../../../components/admin/products/product-admin-page";
import { AdminLayout } from "../../../layouts/admin-layout";
import { getData } from "../../../utils/fetchData";

export async function getServerSideProps() {
    const res = await getData('product');
    return {
        props: {
            products: res.products,
            result: res.result
        }
    }
}

export default function ProductManagerAdmin(props) {

    const [products, setProducts] = useState(props.products);

    return (
        <>
            <Head>
                <title>Product Manager</title>
            </Head>

            <ProductAdminPage products={products}/>
        </>
    )
}

ProductManagerAdmin.Layout = AdminLayout;