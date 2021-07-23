import Link from "next/link";
import Head from 'next/head';
import { MdChevronLeft } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { useState, useContext, useEffect } from "react";
import { DataContext } from '../../../store/GlobalState'
import Breadcrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";
import NotFound from "../../shared/utilities/not-found";
import CartItem from "./component/cart-item";
import CartPayment from "./component/cart-payment";

export default function CartPage(props) {

    const { state } = useContext(DataContext);
    const { cart } = state;
    const [totalPrice, setTotalPrice] = useState(0);
    
    const getTotalPrice = () => {
        const result = cart.reduce((prev, item) => {
            return prev + (item.productPrice * item.qty);
        }, 0);
        setTotalPrice(result);
    }
    useEffect(() => {
        getTotalPrice();
    }, [cart]);

    
    
    return (
        <>
            <Head>
                <title>Cart Page</title>
            </Head>

            {/* Breadcrumb */}
            <Breadcrumbs title="Cart"/>

            {
                cart.length === 0 ? (
                    <NotFound   text="Chưa có sản phẩm nào trong giỏ hàng." 
                                icon={<FiShoppingBag className="text-4xl text-black"/>}
                                href="/product"
                                textHref="trang sản phẩm"
                    />
                ): (
                    <>
                        {/* Main Cart */ }
                        <div className="flex justify-between px-14 my-20">
                            <div className="w-8/12">
                                <div className="border-b border-gray-300 pb-4 overflow-hidden">
                                    <Link href="/product">
                                        <div className="continue--shopping w-36 relative ">
                                            <a className="flex items-center text-red-600 whitespace-nowrap cursor-pointer hover:text-red-600">
                                                <MdChevronLeft className="text-20 mt-0.5" />
                                                <p className="mb-0">Tiếp tục mua sắm</p>
                                            </a>
                                            <div className="block--continue hidden bg-red-600 h-0.5 w-11/12 absolute -bottom-0.5 left-0"></div>
                                        </div>
                                    </Link>
                                </div>

                                {/* Cart Item */}
                                {
                                    cart.length > 0 && (
                                        cart.map((item, index) => (
                                            <CartItem item={item} key={index} cart={cart}/>
                                        ))
                                    )
                                }

                                <div className="flex items-start justify-end mt-9 ">
                                    <div className="flex flex-col">
                                        <input type="text" className="border-2 rounded text-gray-800 placeholder-gray-500 border-gray-200 px-3 py-3 w-72 focus:border-red-600" placeholder="Mã ưu đãi" />
                                        <button className="btn btn--apply mt-4">Áp dụng</button>
                                    </div>
                                </div>
                            </div>
                            <CartPayment totalPrice={totalPrice}/>
                        </div>
                    </>
                )
            }
        </>
    )
}