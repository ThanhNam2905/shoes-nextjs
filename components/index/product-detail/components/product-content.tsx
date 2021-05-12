

type ProductType = {
    product: any
}

export default function ProductContent({ product }: ProductType) {
    return (
        <>
            <div className="flex items-center bg-gray-200 h-12  border-b border-gray-300">
                <p className="px-3 h-full flex items-center bg-red-600 text-white border-r border-gray-300 cursor-pointer">Thông tin sản phẩm</p>
                <p className="px-3 h-full flex items-center border-r border-gray-300 hover:bg-red-600 hover:text-white transition ease-linear duration-150 rounded-tl rounded-tr cursor-pointer">Bình luận</p>
            </div>
            <div className="grid grid-cols-2 gap-10 px-6">
                <div>
                    <h3 className="border-b-2 border-gray-700 uppercase font-semibold text-center text-20 pt-4 pb-2">THÔNG TIN CHI TIẾT SẢN PHẨM</h3>
                    <div className="grid grid-cols-2 border-b border-gray-300 py-3 text-15">
                        <h5 className="col-span-1 font-semibold">Thương hiệu</h5>
                        <p className="col-span-1">{product.category}</p>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-300 py-3 text-15">
                        <h5 className="col-span-1 font-semibold">Tên sản phẩm</h5>
                        <p className="col-span-1">{product.name}</p>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-300 py-3 text-15">
                        <h5 className="col-span-1 font-semibold">Mã sản phẩm</h5>
                        <p className="col-span-1">{product.code}</p>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-300 py-3 text-15">
                        <h5 className="col-span-1 font-semibold">Dòng sản phẩm</h5>
                        <p className="col-span-1">{product.productLine}</p>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-300 py-3 text-15">
                        <h5 className="col-span-1 font-semibold">Phụ kiện đi kèm</h5>
                        <p className="col-span-1">{product.accessories}</p>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-300 py-3 text-15">
                        <h5 className="col-span-2 font-semibold">VẬN CHUYỂN MIỄN PHÍ ĐẾN TOÀN QUỐC</h5>
                    </div>
                </div>
                <div>
                    <h3 className="border-b-2 border-gray-700 uppercase font-semibold text-center text-20 pt-4 pb-2">ĐẶT TÍNH CHI TIẾT SẢN PHẨM</h3>
                    <div className="grid grid-cols-2 border-b border-gray-300 py-3 text-15">
                        <h5 className="col-span-1 font-semibold">Giới tính</h5>
                        <p className="col-span-1">{product.gender}</p>
                    </div>
                    <div className="grid grid-cols-2 border-b border-gray-300 py-3 text-15">
                        <h5 className="col-span-1 font-semibold">Chất liệu</h5>
                        <p className="col-span-1">{product.material}</p>
                    </div>

                </div>
            </div>
            <div className="px-6 mt-10 mb-20">
                <p className="leading-8 text-18 mb-8">{product.infoProduct}</p>
                <img src={`${product.images[0]}`} alt={product.images[0]} className="object-contain object-center w-full h-138" />
            </div>
        
        </> 
    )
}