import Link from "next/link";
import Head from 'next/head';
import { MdAttachMoney, MdChevronLeft, MdDeleteForever } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { useState, useContext } from "react";
import { DataContext } from '../../../store/GlobalState'
import Breadcrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";
import { getProductDetail } from '../../../pages/api/share/getProductDetail';

export default function CartPage(props) {

    const [quantity, setQuantity] = useState(1);

    const handleSetQuantity = (value) => {
        if (value < 0) {
            setQuantity(0);
        }
        else {
            setQuantity(value);
        }
    }

    const { state } = useContext(DataContext);
    const { cart } = state;
    cart.forEach(element => {
        getProductDetail(element.proid,true);
    });
    

    return (
        <>
            <Head>
                <title>Cart Page</title>
            </Head>

            {/* Breadcrumb */}
            <Breadcrumbs title="Cart"/>

            {
                cart.length === 0 ? (
                    <div className="flex flex-col items-center px-14 py-20 w-full">
                        
                        <i className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-full">
                            <FiShoppingBag className="text-4xl text-black"/>
                        </i>
                        <p className="text-18 my-8">Chưa có sản phẩm nào trong giỏ hàng.</p>
                        <Link href="/product">
                            <a className="btn btn--update-cart">Quay trở lại cửa hàng</a> 
                        </Link>
                    </div>
                    
                ): (
                    <>
                        {/* Main Cart */ }
                        <div className="flex justify-between px-14 my-20">
                            <div className="w-8/12">
                                <div className="border-b border-gray-300 pb-4 overflow-hidden">
                                    <Link href="/product">
                                        <div className="continue--shopping w-36 relative ">
                                            <a className="flex items-center text-red-600 whitespace-nowrap cursor-pointer">
                                                <MdChevronLeft className="text-20 mt-0.5" />
                                                <p>Tiếp tục mua sắm</p>
                                            </a>
                                            <div className="block--continue hidden bg-red-600 h-0.5 w-full absolute -bottom-0.5 left-0"></div>
                                        </div>
                                    </Link>
                                </div>

                                {/* Cart Item */}
                                {
                                    cart.length > 0 && (
                                        cart.map((item, index) => (
                                            <div className="mt-4 grid grid-cols-10 border-b border-gray-300 py-4 h-40" key={index}>
                                                <div className="col-span-2">
                                                    <img src="/assets/img/product/nike-sneaker8.jpg" alt="" className="object-contain w-4/5 max-w-4/5 h-3/5 max-h-4/5" />
                                                </div>
                                                <div className="col-span-4">
                                                    <p className="text-16 font-medium">Air Jordan 1 Low Light Smoke Grey Red</p>
                                                    <p className="text-12 my-2">Size: {item.size}</p>
                                                    <p className="text-14">Price: 8.200.000₫</p>
                                                </div>
                                                <div className="col-span-1">
                                                    <div className="flex items-center justify-between w-full mx-auto">
                                                        <button className="focus:outline-none p-1.5 hover:bg-gray-100 transition ease-in duration-150 rounded-full" onClick={() => handleSetQuantity(quantity - 1)}>
                                                            <FaMinus className="text-12 hover:text-gray-700" />
                                                        </button>
                                                        <input type="number" className="w-full text-center" value={item.quantity} onChange={(e) => handleSetQuantity(Number(e.target.value))} />
                                                        <button className="focus:outline-none p-1.5 hover:bg-gray-100 transition ease-in duration-150 rounded-full" onClick={() => handleSetQuantity(quantity + 1)}>
                                                            <FaPlus className="text-12 hover:text-gray-700" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 text-right">
                                                    <p>8.200.000₫</p>
                                                </div>
                                                <div className="col-span-1">
                                                    <button className="focus:outline-none flex items-center justify-end w-full text-18 text-red-600 hover:text-green-600">
                                                        <MdDeleteForever />
                                                        <span>Xoá</span>
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )
                                }

                                

                                <div className="flex items-start justify-between mt-9 ">
                                    <button className="btn btn--update-cart">Cập nhật giỏ hàng</button>
                                    <div className="flex flex-col">
                                        <input type="text" className="border-2 rounded text-gray-800 placeholder-gray-500 border-gray-200 px-3 py-3 w-72 focus:border-red-600" placeholder="Mã ưu đãi" />
                                        <button className="btn btn--apply mt-4">Áp dụng</button>
                                    </div>
                                </div>

                            </div>
                            <div className="w-3/12 border border-gray-800 py-7 px-7 rounded-sm">
                                <div className="divide-y-2 divide-gray-200">
                                    <h5 className="text-24 pb-4 flex items-center font-medium">
                                        <MdAttachMoney />
                                    Tổng giỏ hàng
                                </h5>
                                    <div className="flex items-center justify-between">
                                        <p className="uppercase py-5 ">Tạm tính</p>
                                        <p>8.200.000 đ</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="uppercase py-5">Tổng</p>
                                        <p>8.200.000 đ</p>
                                    </div>
                                </div>

                                <button className="bg-red-500 hover:bg-red-400 transition ease-in duration-150 py-3 mt-5 w-full text-white">Tiến hành thanh toán</button>
                            </div>
                        </div>
                    </>
                )
            }


        </>
    )
}