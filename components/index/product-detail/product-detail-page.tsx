import Head from "next/head";
import ProductMain from "./components/product-main";
import ProductContent from "./components/product-content";
import ProductList from "../../shared/product/product-list";
import Breadcrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";
import { useEffect, useState } from "react";
import { ScrollToTopBtn } from "../../shared/utilities/scrollToTop/scrollToTop";

type PropsType = {
    product?: [],
}

export default function ProductDetailPage({ product }: PropsType) {

    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        if(product) {
            setBreadcrumbs([
                { href: "/home", label: "Trang chủ" },
                { href: "/product", label: "Sản phẩm" },
            ])
        }
    }, [product]);


    return (
        <>  
            <Head>
                <title>Product Detail Page</title>
            </Head>

            {/* Button ScrollToTop */}
            <ScrollToTopBtn/>

            {/* Breadcrumb */}
            <Breadcrumbs breadcrumbs={breadcrumbs}/>

            {/* Product Detail Main */}
            <ProductMain product={product}/>

            {/* Product Content, Description, Comment */}
            <div className="border border-gray-300 mx-14 rounded-tl-md rounded-tr-md overflow-hidden">
                <ProductContent product={product}/>
            </div>
            
            {/* Related Products */}
            <ProductList title="Sản phẩm tương tự"/>

        </>
    )
}