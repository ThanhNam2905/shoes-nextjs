import Head from "next/head";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import Breadcrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";
import PaginationComponent from "../../shared/utilities/pagination/pagination-component";
import { ScrollToTopBtn } from "../../shared/utilities/scrollToTop/scrollToTop";
import ProductItem from "./components/productItem";

type PropsType = {
    [x: string]: any;
    products: any;
}

export default function ProductPage({ products }: PropsType) {

    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        if(products) {
            setBreadcrumbs([
                { href: "/home", label: "Trang chủ"},
                { label: "Sản phẩm"}
            ])
        }
    }, [products]);
    
    return (
        <>
            <Head>
                <title>Product Page</title>
            </Head>
            
            {/* Button ScrollToTop */}
            <ScrollToTopBtn/>

            {/* Product Banner */}
            <div>
                <img src="https://res.cloudinary.com/fpt-shoftware/image/upload/v1627833163/nextjs-media/banner-sneaker_mj1rv7.jpg" alt="Banner-sneaker" className="object-cover w-full h-138 animate-fade" />
            </div>

            {/* Breadcrumb */}
            <Breadcrumbs title="Sản phẩm" breadcrumbs={breadcrumbs}/>

            {/* Product Content */}
            <div className="px-14 mt-8 mb-10">
                {/* Product Sort */}
                <div className="border border-gray-300 text-15 rounded-md flex items-center justify-between px-6 h-14">
                    <div className="flex items-center space-x-3">
                        <img src="/assets/img/icon/bkg_grid4_hover.png" alt="" className="object-contain cursor-pointer" />
                        <img src="/assets/img/icon/bkg_grid.png" alt="" className="object-contain cursor-pointer" />
                        <img src="/assets/img/icon/bkg_list.png" alt="" className="object-contain cursor-pointer" />
                    </div>
                    <div className="flex items-center border border-gray-400 py-1.5 px-6 rounded-md tracking-wider">
                        Sort by default
                        <BiChevronDown className="ml-1 text-20" />
                    </div>
                    <p>Showing 1–12 of 21 results</p>
                </div>

                <div className="grid grid-cols-4 gap-8 mt-10 mb-20">
                    {/* Product Card */}
                    {   
                        products.length > 0 ? (
                            products.map((product) => 
                                <ProductItem key={product._id} product={product}/>
                            )
                        ) : "Không có sản phẩm"
                    }
                    
                </div>
            </div>

            {/* Pagination */}
            <PaginationComponent limit={10} page={1} total={100}/>

        </>
    )
}