import { useState } from "react";
import ProductPage from "../components/index/products/products-page";
import { DefaultLayout } from "../layouts/default-layout";
import { getData } from '../utils/fetchData';

export async function getServerSideProps() {

    const res = await getData('product');
    // console.log(res);
    return {
        props: {
            products: res.products,
            result: res.result,
        }, // will be passed to the page component as props
    }
};

export default function Product(props) {

    const [products, setProducts] = useState(props.products);
    
    return (
        <>
            <ProductPage products={products}/>
        </>
    )
}

Product.Layout = DefaultLayout;

