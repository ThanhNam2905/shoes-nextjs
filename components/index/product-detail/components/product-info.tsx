import { useContext, useEffect, useState } from "react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import SwiperCore, { Navigation, Pagination } from 'swiper'; // import Swiper core and required modules
import { DataContext } from "../../../../store/GlobalState";
import { addToCart } from "../../../../store/Actions";
import ProductQuantity from "../../../shared/product/product-quantity";
SwiperCore.use([Navigation, Pagination]); // install Swiper modules
import { message } from 'antd'; // Ant Design

type PropsType = {
    product: any
}

export default function ProductInfo({ product }: PropsType) {

    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;

    const productPrice = product.discount > 0 ? product.price * (100 - product.discount) / 100 : product.price;
    const [quantity, setQuantity] = useState(1);
    const [activeState, setActiveState] = useState({
        activeSize: null,
        arrayBtn: product.sizes
    });

    const handleToggleActive = (index) => {
        setActiveState({ ...activeState, activeSize: activeState.arrayBtn[index]});
    }
    const toggleActiveStyles = (index) => {
        if(activeState.arrayBtn[index] === activeState.activeSize) {
            return " btn btn--size active";
        }
        else {
            return " btn btn--size hover:border-gray-500";
        }
    }

    const AddProductToCart = () => {
        dispatch(addToCart({
            _id : product._id, 
            idCart : Math.floor(Math.random() * Date.now()).toString(), 
            productName : product.name, 
            productPrice : productPrice, 
            productImage : product.images[0], 
            qty: quantity, 
            size: activeState.activeSize,
            inStock: product.inStock,
            sold: product.sold
        }, cart))
        // dispatch(addToCart(product, cart));
        message.success("Thêm sản phẩm vào giỏ hàng thành công")
    }

    return (
        <>
            <h2 className="text-3xl font-semibold tracking-wide mb-1">{product.name}</h2>
                <div className="rating flex items-center">
                    <div className="flex items-center space-x-0.5 text-gray-300">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                    <div className="text-gray-600 text-15 divide-x-2 divide-gray-500 ml-4">
                        <a href="#" className="pr-3">0 Rating</a>
                        <a href="#" className="pl-3 hover:text-red-600 hover:underline">Đưa ra đánh giá của bạn</a>
                    </div>
                </div>
                <div className="grid grid-cols-3 divide-x-2 divide-gray-300 text-14 font-medium text-gray-600 my-4">
                    <div className="col-span-1 leading-6">
                        <p>Code: {product.code}</p>
                        <p>Chất liệu: {product.material}</p>
                    </div>
                    <div className="col-span-2 pl-8">
                        <p>Price: 
                            <span className="text-red-600 font-semibold text-3xl ml-3">{new Intl.NumberFormat('de-DE').format(productPrice)} đ</span> 
                        </p>
                        <p className="uppercase font-semibold text-15 mt-2">VẬN CHUYỂN MIỄN PHÍ ĐẾN TOÀN QUỐC</p>
                    </div>
                </div>
                <p className="border-b border-gray-300 leading-7 pb-2 select-none">
                    {product.description}
                </p>

                {
                    product.inStock === product.sold ? (
                        <p className="text-18 my-5 text-red-600">Sản phẩm này đã hết hàng</p>
                    ) : (
                        <>
                            <div className="w-7/12">
                                <div className="my-3 text-18 flex items-center justify-between">
                                    {
                                        activeState.activeSize === null ? (
                                            <p className="font-semibold">Vui lòng chọn Size</p>
                                        ) : (
                                            <p>Size: {activeState.activeSize}</p>
                                        )
                                    }
                                    <a href="#" className="hover:text-red-600">Hướng dẫn chọn Size</a>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {
                                        product.sizes.length > 0 ? (
                                            product.sizes.map((size, index) => (
                                                <button key={index}
                                                    className={toggleActiveStyles(index)}
                                                    onClick={() => handleToggleActive(index)}>EU {size}</button>
                                            ))
                                        ) : <p>Chưa có size</p>
                                    }
                                </div>
                            </div>
                            <div className="flex items-center my-6">
                                <p className="text-18 font-semibold mr-5">Số lượng: </p>
                                
                                <ProductQuantity quantity={quantity} setQuantity={setQuantity}/>
                                
                                <button className="btn btn--add-to-cart mx-8 text-14" 
                                        onClick={() => AddProductToCart()}>Đặt hàng
                                </button>
                                <button className="btn flex items-center btn--favourite"><FaRegHeart className="text-18" /></button>
                            </div>
                        </>
                    )
                }
                <div>
                    <p className="text-18 font-semibold mr-5">See More</p>
                    <Swiper
                        className="my-4"
                        spaceBetween={30}
                        slidesPerView={3}
                        navigation
                        loop={false}
                    >
                        {product.imagesFeedBack?.length > 0 ?
                            product.imagesFeedBack.map((img, index) => (
                                <SwiperSlide key={index} className="h-56">
                                    <img src={img} className="object-fill h-52 max-h-52 w-full max-w-full rounded" />
                                </SwiperSlide>
                            )) : (
                                <p>Không có ảnh</p>
                            )
                        }
                    </Swiper>
                </div>
        </>
    )
}