import { useContext, useState } from "react";
import { FcShipped } from "react-icons/fc"; // React Icon
import { AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai"; // React Icon
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import SwiperCore, { Navigation, Pagination } from 'swiper'; // import Swiper core and required modules
import { DataContext } from "../../../../store/GlobalState";
import { addToCart } from "../../../../store/Actions";
import ProductQuantity from "../../../shared/product/product-quantity";
SwiperCore.use([Navigation, Pagination]); // install Swiper modules
import { message } from 'antd'; // Ant Design

type PropsType = {
    [x: string]: any;
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
            return " btn btn--size hover:border-blue-500 hover:text-blue-500";
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
            <h2 className="text-3xl font-semibold tracking-wide mb-2">{product.name}</h2>
                <div className="rating flex items-center mb-4">
                    <div className="flex items-center space-x-0.5 text-gray-300">
                        <AiOutlineStar className="text-yellow-300 text-22"/>
                        <AiOutlineStar className="text-yellow-300 text-22"/>
                        <AiOutlineStar className="text-yellow-300 text-22"/>
                        <AiOutlineStar className="text-yellow-300 text-22"/>
                        <AiOutlineStar className="text-yellow-300 text-22"/>
                    </div>
                    <div className="text-gray-600 flex items-center text-15 divide-x-2 divide-gray-500 ml-4">
                        <p className="pr-3 mb-0 text-gray-500 font-medium">{product.numberReview > 0 ? product.numberReview : "0 Reviews"} </p>
                        <a href="#" className="pl-3 text-gray-500 font-medium hover:text-red-600 hover:underline">Đưa ra đánh giá của bạn</a>
                    </div>
                </div>

                <div className=" bg-gray-100 py-4 px-7 rounded-md">
                        <p className="text-16 font-medium mb-1.5 text-gray-700">Code: 
                            <span className="text-gray-600 font-normal ml-2">{product.code}</span>
                        </p>
                        <p className="text-16 font-medium mb-1.5 text-gray-700">Chất liệu: 
                            <span className="text-gray-600 font-normal ml-2">{product.material}</span>
                        </p>
                        <p className="text-16 font-medium mb-1.5 text-gray-700">Màu sắc: 
                            <span className="text-gray-600 font-normal ml-2">{product.colors}</span>
                        </p>
                        <p className="text-16 font-medium mb-1.5 text-gray-700">Giới tính: 
                            <span className="text-gray-600 font-normal ml-2">{product.gender}</span>
                        </p>
                        <p className="text-16 font-medium mb-1.5 text-gray-700">Price: 
                            <span className="text-red-500 font-semibold text-3xl ml-3 underline">{new Intl.NumberFormat('de-DE').format(productPrice)} đ</span> 
                        </p>
                        <p className="text-16 font-medium mb-1.5 text-gray-700">Phụ kiện đi kèm: 
                            <span className="text-gray-600 font-normal ml-2">{product.accessories}</span>
                        </p>
                        <p className="text-16 font-medium mt-2 inline-flex items-center text-green-600 bg-green-100 py-2 px-6 rounded-md">
                            <FcShipped className="text-24 mr-2"/>
                            <span>Vận chuyễn miễn phí trên toàn quốc và tặng kèm vớ khi đặt hàng online</span>
                        </p>
                        <p className="leading-7 pb-6 select-none text-16 mb-0">
                            {product.description}
                        </p>
                </div>
                

                {
                    product.inStock === product.sold ? (
                        <p className="text-18 my-5 text-red-600 mb-0">Sản phẩm này đã hết hàng</p>
                    ) : (
                        <>
                            <div className="w-7/12">
                                <div className="my-3 text-18 flex items-center justify-between">
                                    {
                                        activeState.activeSize === null ? (
                                            <p className="font-semibold mb-0">Vui lòng chọn Size</p>
                                        ) : (
                                            <p className="font-semibold mb-0">Size: 
                                                <span className="text-blue-500 text-20 ml-1.5">{activeState.activeSize}</span>
                                            </p>
                                        )
                                    }
                                    <button className="hover:text-red-600">Hướng dẫn chọn Size</button>
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
                            <div className="flex items-center justify-between bg-gray-200 rounded-lg my-10 py-8 px-8">
                                <div className="flex items-center">
                                    <p className="text-18 font-semibold mb-0 mr-5">Số lượng: </p>
                                    <ProductQuantity quantity={quantity} setQuantity={setQuantity}/>
                                </div>
                                
                                <button className="btn btn--add-to-cart mx-8 text-14 flex items-center opacity-80 hover:opacity-100 hover:underline" 
                                        onClick={() => AddProductToCart()}>
                                        <AiOutlineShoppingCart className="text-18 mr-2"/>
                                        <span>Thêm vào giỏ hàng</span>
                                </button>
                                
                            </div>
                        </>
                    )
                }
        </>
    )
}