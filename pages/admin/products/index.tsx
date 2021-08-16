import Head from "next/head";
import { useState } from "react";
import ProductAdminPage from "../../../components/admin/products/product-admin-page";
import { AdminLayout } from "../../../layouts/admin-layout";
import { getData } from "../../../utils/fetchData";

export async function getServerSideProps({query}) {

    const page = query.page || 1;
    const category = query.category || 'all';
    const sort = query.sort || '';
    const search = query.search || 'all';

    const res = await getData(`product?limit=${page * 1000}&category=${category}&sort=${sort}&name=${search}`);
    return {
        props: {
            products: res.products,
            result: res.result
        }
    }
}

// export async function getServerSideProps() {
//     const res = await getData('product');
//     console.log(res);
    
//     return {
//         props: {
//             products: res.products,
//             result: res.result
//         }
//     }
// }

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