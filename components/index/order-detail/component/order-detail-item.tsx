
type PropsType = {
    [x: string]: any;
    data: any;
}

export default function OrderDetailItem({ data }: PropsType) {
    return (
        <div className="order-item grid grid-cols-8 gap-10 py-6 border-b border-gray-200 text-16 font-semibold text-gray-600">
            <div className="col-span-4">
                <div className="flex">
                    <img src={data.productImage.url} alt={data.productImage.url} className="w-24 h-24 object-cover rounded-md"/>
                    <p className="w-3/4 ml-5  hover:underline">{data.productName}</p>
                </div>
            </div> 
            <div className="col-span-1 text-center">
                <p>Kích thước</p>
                <p>{data.size}</p>
            </div>
            <div className="col-span-2 text-center">
                <p>Giá tiền</p>
                <p className="text-red-500">{ new Intl.NumberFormat("de-DE").format(data.productPrice)} đ</p>
            </div>
            <div className="col-span-1 text-center">
                <p>Số lượng</p>
                <p>{data.qty}</p>
            </div>
        </div>
    )
}