
import { MdAttachMoney } from "react-icons/md";

type PropsType = {
    [x: string]: any;
    totalPrice: number;
}

export default function CartPayment({ totalPrice }: PropsType) {
    
    return (
        <>
            <div className="w-3/12 border border-gray-800 py-7 px-7 rounded-sm">
                <div className="divide-y-2 divide-gray-200">
                    <h5 className="text-24 pb-4 flex items-center font-medium">
                        <MdAttachMoney />
                        Tổng giỏ hàng
                    </h5>
                    <div className="flex items-center justify-between">
                        <p className="uppercase py-5 ">Tạm tính</p>
                        <p>{new Intl.NumberFormat('de-DE').format(totalPrice)} ₫</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="uppercase py-5">Tổng</p>
                        <p>{new Intl.NumberFormat('de-DE').format(totalPrice)} ₫</p>
                    </div>
                </div>
                <button className="bg-red-500 hover:bg-red-400 transition ease-in duration-150 py-3 mt-5 w-full text-white">Tiến hành thanh toán</button>
            </div>
        </>
    )
}