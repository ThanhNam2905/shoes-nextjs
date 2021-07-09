import { BsQuestionCircle } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import ProductQuantity from "../../../shared/product/product-quantity";
import Dialog from "../../../shared/utilities/dialog/dialog";
import { DataContext } from "../../../../store/GlobalState";
import { deleteItemCart } from '../../../../store/Actions';

type PropsType = {
    [x: string]: any;
    item: any;
    cart: any;
}

export default function CartItem({ item, cart }: PropsType) {

    const [productPrice, setProductPrice] = useState(item.productPrice * item.qty);

    useEffect(() => {
        setProductPrice(item.qty * item.productPrice);
    }, [cart]);

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }
    
    const { state, dispatch } = useContext(DataContext);
    const { modal } = state;

    const ClickBtnDeleteItemCart = () => {
        openModal();
        dispatch({ 
            type: 'ADD_MODAL',
            payload: { data: cart, productIdCart: item.productIdCart, productName: item.productName }
        })
    }
    
    const handlerDeleteItemCart = () => {
        dispatch(deleteItemCart(modal.data, modal.productIdCart, 'ADD_CART'));
        closeModal();
    }
    
    return (
        <> 
            <div className="mt-4 grid grid-cols-10 border-b border-gray-300 py-4 h-40">
                <div className="col-span-2">
                    <img src={item.productImage} alt={item.productImage} className="object-contain w-4/5 max-w-4/5 h-3/5 max-h-4/5" />
                </div>
                <div className="col-span-4">
                    <h5 className="text-16 font-medium">
                        <Link href={`/product/${item.productId}`}>
                            <a className="hover:text-red-600 hover:underline capitalize text-gray-800">{item.productName}</a>
                        </Link>
                    </h5>
                    <p className="text-12 my-2">Size: {item.size}</p>
                    <p className="text-14">Price: {new Intl.NumberFormat('de-DE').format(item.productPrice)} ₫</p>
                </div>
                <div className="col-span-1">
                    <ProductQuantity quantity={item.qty}  inStock={item.inStock} cart={cart} productIdCart={item.productIdCart}/>
                </div>
                <div className="col-span-2 text-right">
                    <p>{new Intl.NumberFormat('de-DE').format(productPrice)} ₫</p>
                </div>
                <div className="col-span-1">
                    <button className="focus:outline-none flex items-center justify-end w-full text-18 text-red-600 hover:text-green-600"
                            onClick={() => ClickBtnDeleteItemCart()}>
                        <RiDeleteBinLine />
                        <span>Delete</span>
                    </button>
                </div>
            </div>

            <Dialog showModal={showModal} 
                    closeModal={closeModal} 
                    className="w-1/3 animate-slide-up fixed top-1/3 left-1/3 z-50 bg-white pt-10 pb-4 text-center rounded-md">

                <i className="text-center inline-block">
                    <BsQuestionCircle className="text-yellow-600 text-3xl"/>
                </i>
                <p className="text-gray-900 text-20 font-semibold">Thông báo</p>
                <p className="text-gray-700 text-16 mt-3 mb-8">Bạn có chắc muốn xoá sản phẩm này?</p>
                <div className="flex items-center justify-end border-t border-gray-300 pt-3 px-8 text-15 space-x-3">
                    <button className="btn--cancel focus:outline-none hover:text-black transition ease-linear duration-200 font-semibold text-gray-600 px-4 py-1.5" 
                            onClick={() => closeModal()}>Cancel
                    </button>
                    <button className="btn--confirm bg-red-500 hover:bg-red-700 focus:outline-none transition ease-linear duration-200 font-semibold text-white px-4 py-1.5 rounded"
                            onClick={() => handlerDeleteItemCart()}>
                        Delete
                    </button>
                </div>
                
            </Dialog>
        </>
    )
}