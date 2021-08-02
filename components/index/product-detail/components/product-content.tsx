import { Tabs } from 'antd';
import FormComment from './Comment/form-comment';

type ProductType = {
    product: any
}

export default function ProductContent({ product }: ProductType) {

    const { TabPane } = Tabs;
    function callback(key) {
        console.log(key);
    }
    return (
        <>
            <Tabs onChange={callback} defaultActiveKey="1" type="card" className="tab-info-product">
                <TabPane tab="Thông tin sản phẩm" key="1">
                    <div className="grid grid-cols-2 gap-10 px-6">
                        <div>
                            <h3 className="border-b-2 border-gray-700 uppercase font-semibold text-center text-20 pt-4 pb-2 text-red-600">THÔNG TIN SẢN PHẨM</h3>
                            <div className="flex items-center justify-between border-b border-gray-300 py-2 text-15">
                                <h5 className="mb-1 w-1/2 font-semibold">Thương hiệu</h5>
                                <p className="mb-1 w-1/2">{product.category}</p>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-300 py-2 text-15">
                                <h5 className="mb-1 w-1/2 font-semibold">Tên sản phẩm</h5>
                                <p className="mb-1 w-1/2">{product.name}</p>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-300 py-2 text-15">
                                <h5 className="mb-1 w-1/2 font-semibold">Mã sản phẩm</h5>
                                <p className="mb-1 w-1/2">{product.code}</p>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-300 py-2 text-15">
                                <h5 className="mb-1 w-1/2 font-semibold">Loại sản phẩm</h5>
                                <p className="mb-1 w-1/2">{product.productType}</p>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-300 py-2 text-15">
                                <h5 className="mb-1 w-1/2 font-semibold">Dòng sản phẩm</h5>
                                <p className="mb-1 w-1/2">{product.productLine}</p>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-300 py-2 text-15">
                                <h5 className="mb-1 w-1/2 font-semibold">Phụ kiện đi kèm</h5>
                                <p className="mb-1 w-1/2">{product.accessories}</p>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-300 py-2 text-15">
                                <h5 className="mb-1 font-semibold">VẬN CHUYỂN MIỄN PHÍ ĐẾN TOÀN QUỐC</h5>
                            </div>
                        </div>
                        <div>
                            <h3 className="border-b-2 border-gray-700 uppercase font-semibold text-center text-20 pt-4 pb-2 text-red-600">ĐẶT TÍNH SẢN PHẨM</h3>
                            <div className="flex items-center justify-between border-b border-gray-300 py-2 text-15">
                                <h5 className="mb-1 w-1/2 font-semibold">Giới tính</h5>
                                <p className="mb-1 w-1/2">{product.gender}</p>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-300 py-2 text-15">
                                <h5 className="mb-1 w-1/2 font-semibold">Chất liệu</h5>
                                <p className="mb-1 w-1/2">{product.material}</p>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-300 py-2 text-15">
                                <h5 className="mb-1 w-1/2 font-semibold">Màu sắc</h5>
                                <p className="mb-1 w-1/2">{product.colors}</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-6 mt-10 mb-20">
                        <p className="leading-8 text-18 mb-8">{product.infoProduct}</p>
                        <img src={`${product.images[0].url}`} alt={product.images[0].url} className="object-contain object-center w-full h-138" />
                    </div>
                </TabPane>
                <TabPane tab="Bình luận và đánh giá" key="2">
                    <div className="px-10">
                        <h3 className="font-semibold text-16 mt-2">Đưa ra đánh giá của bạn</h3>
                        <FormComment/>
                    </div>
                    
                </TabPane>
                
            </Tabs>,

            
        
        </> 
    )
}