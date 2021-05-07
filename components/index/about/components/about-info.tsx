import { BsFillCaretDownFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import SwiperCore, { Navigation, Pagination, Autoplay, EffectFlip } from 'swiper'; // import Swiper core and required modules
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFlip ]); // install Swiper modules

export default function AboutInfo(props) {
    return (
        <>
            <div>
                <h3 className="text-20 lg:text-24 tracking-wide lg:tracking-wider text-center mb-3">What Can We Do For You ?</h3>
                <div className="flex items-center justify-between mb-7 lg:mb-10">
                    <p className="text-14 lg:text-16 lg:font-light">Fast Free Delivery</p>
                    <BsFillCaretDownFill className="mt-1" />
                </div>
                <div className="flex items-center justify-between mb-7 lg:mb-10">
                    <p className="text-14 lg:text-16 lg:font-light">More Than 30 Years In The Business</p>
                    <BsFillCaretDownFill className="mt-1" />
                </div>
                <div className="flex items-center justify-between mb-7 lg:mb-10">
                    <p className="text-14 lg:text-16 lg:font-light">100% Organic Foods</p>
                    <BsFillCaretDownFill className="mt-1" />
                </div>
                <div className="flex items-center justify-between mb-7 lg:mb-10">
                    <p className="text-14 lg:text-16 lg:font-light">Best Shopping Strategies</p>
                    <BsFillCaretDownFill className="mt-1" />
                </div>
            </div>
            <div>
                <h3 className="text-20 lg:text-24 tracking-wide lg:tracking-wider text-center">What Our Customers Says ?</h3>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    centeredSlides={true}
                    navigation={false}
                    pagination={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}

                    effect={'flip'}
                    grabCursor={true}
                >
                    <SwiperSlide className="flex flex-col items-center justify-center mb-7 lg:mb-10">
                        <img src="/assets/img/about/testimonial1.png" alt="Testimonial 1" className="object-contain w-24 rounded-full max-w-max my-4 md:my-6 lg:my-8" />
                        <p className="w-8/12 text-center text-16 md:text-18 lg:text-20 text-gray-800 leading-6 md:leading-7 lg:leading-9">These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose!
                            Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!</p>
                        <p className="uppercase text-red-600 text-16 font-bold mt-4">John Sullivan</p>
                        <p className="uppercase text-12 mb-2">Customer</p>
                    </SwiperSlide>
                    <SwiperSlide className="flex flex-col items-center justify-center mb-7 lg:mb-10">
                        <img src="/assets/img/about/testimonial2.png" alt="Testimonial 2" className="object-contain w-24 rounded-full max-w-max my-4 md:my-6 lg:my-8" />
                        <p className="w-8/12 text-center text-16 md:text-18 lg:text-20 text-gray-800 leading-6 md:leading-7 lg:leading-9">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error in, mollitia nulla officiis excepturi repudiandae
                            beatae optio, sequi maxime assumenda ipsum exercitationem nostrum ducimus facilis, nesciunt aliquam dicta totam.</p>
                        <p className="uppercase text-red-600 text-16 font-bold mt-4">Kathy Young</p>
                        <p className="uppercase text-12 mb-2">CEO of SunPark</p>
                    </SwiperSlide>
                    <SwiperSlide className="flex flex-col items-center justify-center mb-7 lg:mb-10">
                        <img src="/assets/img/about/testimonial3.png" alt="Testimonial 3" className="object-contain w-24 rounded-full max-w-max my-4 md:my-6 lg:my-8" />
                        <p className="w-8/12 text-center text-16 md:text-18 lg:text-20 text-gray-800 leading-6 md:leading-7 lg:leading-9">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est aliquam dicta explicabo ipsa quae laboriosam animi
                            impedit a aliquid, amet sint temporibus tempore tenetur aspernatur. Placeat deleniti beatae saepe cupiditate!</p>
                        <p className="uppercase text-red-600 text-16 font-bold mt-4">Jenifer Brown</p>
                        <p className="uppercase text-12 mb-2">Manager of AZ</p>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    )
}