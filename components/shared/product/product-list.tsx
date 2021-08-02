import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import SwiperCore, { Navigation, Pagination } from 'swiper'; // import Swiper core and required modules
SwiperCore.use([Navigation, Pagination]); // install Swiper modules

type PropsType = {
    title: string
}

export default function ProductList({ title }: PropsType) {
    return (
        <>
<div className="my-10 px-16 pt-10 pb-16 bg-gray-50">
                <h3 className="font-semibold text-2xl uppercase text-center">{title}</h3>
                <div className="w-40 h-1 mx-auto mt-2 mb-10 bg-red-600"></div>
                <Swiper
                    className="px-20"
                    spaceBetween={40}
                    slidesPerView={4}
                    navigation
                    loop={false}
                >
                    <SwiperSlide className="text-14 relative border border-gray-300 hover:border-red-400 rounded-md overflow-hidden">
                        <a href="#">
                            <div className="tag-sale absolute z-10 top-2 right-2">Sale</div>
                            <div className="overflow-hidden">
                                <img src="https://res.cloudinary.com/fpt-shoftware/image/upload/v1626968889/nextjs-media/vans-navy-1_m9qilv.jpg" alt="" className="object-cover w-full h-80 max-h-80 transform hover:scale-110 transition ease-linear duration-200" />
                            </div>
                            <div className="px-4 pb-4">
                                <h4 className="mt-3 mb-1 text-20">Nike Air Jordan 1</h4>
                                <p className="tag-product text-12">Sneaker</p>
                                <p className="mt-1">Sale Price: <span className="text-red-500 text-16 font-medium">5.000.000 đ</span></p>
                                <p>Retail Price: <span className="line-through text-16">6.000.000 đ</span></p>
                            </div>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide className="text-14 relative border border-gray-300 hover:border-red-400 rounded-md overflow-hidden">
                        <a href="#">
                            <div className="tag-sale absolute z-10 top-2 right-2">Sale</div>
                            <div className="overflow-hidden">
                                <img src="https://res.cloudinary.com/fpt-shoftware/image/upload/v1627105898/nextjs-media/vans-white-1-650x650_sach4r.jpg" alt="" className="object-cover w-full h-80 max-h-80 transform hover:scale-110 transition ease-linear duration-200" />
                            </div>
                            <div className="px-4 pb-4">
                                <h4 className="mt-3 mb-1 text-20">Nike Air Jordan 1</h4>
                                <p className="tag-product text-12">Sneaker</p>
                                <p className="mt-1">Sale Price: <span className="text-red-500 text-16 font-medium">5.000.000 đ</span></p>
                                <p>Retail Price: <span className="line-through text-16">6.000.000 đ</span></p>
                            </div>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide className="text-14 relative border border-gray-300 hover:border-red-400 rounded-md overflow-hidden">
                        <a href="#">
                            <div className="tag-sale absolute z-10 top-2 right-2">Sale</div>
                            <div className="overflow-hidden">
                                <img src="https://res.cloudinary.com/fpt-shoftware/image/upload/v1627028030/nextjs-media/vans-bw-1_xlxqx6.jpg" alt="" className="object-cover w-full h-80 max-h-80 transform hover:scale-110 transition ease-linear duration-200" />
                            </div>
                            <div className="px-4 pb-4">
                                <h4 className="mt-3 mb-1 text-20">Nike Air Jordan 1</h4>
                                <p className="tag-product text-12">Sneaker</p>
                                <p className="mt-1">Sale Price: <span className="text-red-500 text-16 font-medium">5.000.000 đ</span></p>
                                <p>Retail Price: <span className="line-through text-16">6.000.000 đ</span></p>
                            </div>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide className="text-14 relative border border-gray-300 hover:border-red-400 rounded-md overflow-hidden">
                        <a href="#">
                            <div className="tag-sale absolute z-10 top-2 right-2">Sale</div>
                            <div className="overflow-hidden">
                                <img src="https://res.cloudinary.com/fpt-shoftware/image/upload/v1627028122/nextjs-media/vans-checkbroad-1_syjvj4.jpg" alt="" className="object-cover w-full h-80 max-h-80 transform hover:scale-110 transition ease-linear duration-200" />
                            </div>
                            <div className="px-4 pb-4">
                                <h4 className="mt-3 mb-1 text-20">Nike Air Jordan 1</h4>
                                <p className="tag-product text-12">Sneaker</p>
                                <p className="mt-1">Sale Price: <span className="text-red-500 text-16 font-medium">5.000.000 đ</span></p>
                                <p>Retail Price: <span className="line-through text-16">6.000.000 đ</span></p>
                            </div>
                        </a>
                    </SwiperSlide>
                    <SwiperSlide className="text-14 relative border border-gray-300 hover:border-red-400 rounded-md overflow-hidden">
                        <a href="#">
                            <div className="tag-sale absolute z-10 top-2 right-2">Sale</div>
                            <div className="overflow-hidden">
                                <img src="/assets/img/product/nike-sneaker15.jpg" alt="" className="object-cover w-full h-80 max-h-80 transform hover:scale-110 transition ease-linear duration-200" />
                            </div>
                            <div className="px-4 pb-4">
                                <h4 className="mt-3 mb-1 text-20">Nike Air Jordan 1</h4>
                                <p className="tag-product text-12">Sneaker</p>
                                <p className="mt-1">Sale Price: <span className="text-red-500 text-16 font-medium">5.000.000 đ</span></p>
                                <p>Retail Price: <span className="line-through text-16">6.000.000 đ</span></p>
                            </div>
                        </a>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}