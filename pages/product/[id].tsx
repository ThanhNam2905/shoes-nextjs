import { useState } from "react";
import ProductDetailPage from "../../components/index/product-detail/product-detail-page";
import { DefaultLayout } from "../../layouts/default-layout";
import { getData } from "../../utils/fetchData";

export async function getServerSideProps({params: {id}}) {

    const res = await getData(`product/${id}`);
    // console.log(res);
    return {
        props: { productDetail: res.product }, // will be passed to the page component as props
    }
};

export default function ProductDetail(props) {

    const [product, setProduct] = useState(props.productDetail);

    return (
        <>
            <ProductDetailPage product={product}/>
        </>
    )
}

ProductDetail.Layout = DefaultLayout;

