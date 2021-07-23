import { IoCloseCircleOutline } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { MdAttachMoney } from "react-icons/md";
import { DataContext } from "../../../../store/GlobalState";
import Dialog from "../../../shared/utilities/dialog/dialog";
import { useRouter } from 'next/router';
import FormOrder from "./form-order";


type PropsType = {
    [x: string]: any;
    totalPrice: number;
}

export default function CartPayment({ totalPrice }: PropsType) {

    const { state } = useContext(DataContext);
    const { auth } = state;

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    }
    const closeModal = () => {
        setShowModal(false);
    }

    const router = useRouter();
    const handlerCheckout = () => {
        if (auth.user) {
            openModal();
        }
        else {
            router.replace('/login');
        }

    }

    const dialogRef = useRef(null);
    const [refReady, setRefReady] = useState(false)

    useEffect(() => {
        setRefReady(true)
    }, []);
    const handlerCloseDialog = () => {
        if (dialogRef.current.classList.contains("animate-slide-up")) {
            dialogRef.current.classList.remove("animate-slide-up");
            dialogRef.current.classList.add("animate-slide-down");
        }
        setTimeout(() => {
            closeModal();
        }, 500);
    }

    return (
        <>
            <div className="w-3/12 bg-blue-100 border-2 border-gray-400 py-8 px-7 rounded-sm">
                <div className="divide-y-2 divide-gray-400">
                    <h5 className="text-24 pb-4 flex items-center font-medium">
                        <MdAttachMoney />
                        Tổng giỏ hàng
                    </h5>
                    <div className="flex items-center justify-between">
                        <p className="uppercase py-5 ">Tạm tính</p>
                        <p className="font-semibold text-18">{new Intl.NumberFormat().format(totalPrice)} ₫</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="uppercase py-5">Tổng tiền</p>
                        <p className="font-semibold  text-18">{new Intl.NumberFormat().format(totalPrice)} ₫</p>
                    </div>
                </div>

                <button className="flex w-full justify-center rounded bg-red-500 hover:bg-red-400 transition ease-in duration-150 py-3 mt-5 text-white focus:outline-none"
                    onClick={() => handlerCheckout()}>Tiến hành thanh toán
                </button>

                {refReady &&
                    <Dialog showModal={showModal}
                        closeModal={handlerCloseDialog}
                        className="w-1/3 animate-slide-up h-full overflow-y-scroll fixed top-0 right-0 z-50 bg-white rounded"
                        target={dialogRef}
                    >
                        <div className="flex items-center justify-between py-2 px-6 border-b border-gray-200 mb-2">
                            <p className="text-gray-900 text-16 mt-2 font-semibold">Thông tin đặt hàng</p>
                            <i className="text-2xl cursor-pointer hover:text-red-600" onClick={() => handlerCloseDialog()}><IoCloseCircleOutline /></i>
                        </div>

                        <div className="w-full px-5">
                            <FormOrder totalPrice={totalPrice}/>
                        </div>

                    </Dialog>
                }

            </div>
        </>
    )
}