import { useEffect, useState } from "react";
import ProductPage from "../components/index/products/products-page";
import { DefaultLayout } from "../layouts/default-layout";
import { getData } from '../utils/fetchData';

// export async function getServerSideProps() {
//     const res = await getData('product');
//     return {
//         props: {
//             products: res.products,
//             result: res.result,
//         }, // will be passed to the page component as props
//     }
// };

export async function getServerSideProps({query}) {
    const page = query.page || 1;
    const category = query.category || 'all';
    const sort = query.sort || '';
    const search = query.search || 'all';
    
    const res = await getData(`product?limit=${page * 8}&category=${category}&sort=${sort}&name=${search}`);
    return {
        props: {
            products: res.products,
            result: res.result
        }
    }
}
export default function Product(props) {

    const [products, setProducts] = useState(props.products);
    useEffect(() => {
        setProducts(props.products)
    }, [props.products]);
    
    return (
        <>
            <ProductPage products={products}/>
        </>
    )
}

Product.Layout = DefaultLayout;

