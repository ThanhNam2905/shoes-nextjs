import { BsSearch, BsHeart  } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiPlusSm } from "react-icons/hi";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import SwiperCore, { Navigation, Pagination, Lazy, Autoplay, EffectCube, EffectFlip } from 'swiper'; // import Swiper core and required modules
SwiperCore.use([Navigation, Pagination, Lazy, Autoplay, EffectCube, EffectFlip,  ]); // install Swiper modules
import { ScrollToTopBtn } from "../../shared/utilities/scrollToTop/scrollToTop";
import Dialog from "../../shared/utilities/dialog/dialog";
import { useEffect, useState } from "react";
import Head from "next/head";
import { MdClose } from "react-icons/md";

export function HomePage() {

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            openModal();
        }, 1500)
    
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head>
                <title>Home Page</title>
            </Head>

            <Dialog showModal={showModal} 
                    closeModal={closeModal} 
                    icon={<MdClose className="mt-0.5 ml-1"/>}
                    className="w-2/4 animate-slide-up fixed top-36 left-1/4 z-50 bg-white py-20 px-20 text-center">
                <h2 className="uppercase text-3xl font-semibold tracking-wide text-red-600">NEWSLETTER</h2>
                <p className="text-gray-700 text-15 my-10">Enter your email address to subscribe our notification of our new post & features by email.</p>
                <div className="flex items-center justify-center mb-7">
                    <input type="text" className="w-2/5 bg-gray-100 py-2.5 text-15 px-4 rounded-tl-md rounded-bl-md" placeholder="Enter you email address here"/>
                    <button className="bg-gray-900 hover:bg-red-500 focus:outline-none transition ease-linear duration-200 text-white uppercase text-15 px-5 py-2.5 rounded-tr-md rounded-br-md">Subscribe</button>
                </div>
                <div className="flex items-center justify-center space-x-2">
                    <input type="checkbox" name="" id=""/>
                    <span className="text-14"> Don't show this popup again</span>
                </div>
            </Dialog>

            {/* Button ScrollToTop */}
            <ScrollToTopBtn/>

            {/* Home Silder */}
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                centeredSlides={true}
                pagination={{ clickable: true }}
                navigation
                // autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}

                fadeEffect={{ crossFade: true }}
                effect={'cube'}
                grabCursor={true}
                cubeEffect={{ shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.9}}
                >
                    <SwiperSlide className="relative">
                        <img src="/assets/img/slider/slider1.jpg" alt="Slider 1" className="object-cover w-full h-98 md:h-138 lg:h-142 animate-fade"/>
                        <div className="text-gray-800 uppercase absolute top-20 md:top-32 lg:top-40 text-center md:text-left md:left-24 lg:left-32 px-4 md:px-0 animate-slide-up">
                            <p className="text-red-600 text-16 md:text-18 lg:text-20 tracking-wide capitalize">Get 30% Off &#x26; Free Shipping</p> 
                            <p className="font-bold text-26 lg:text-5xl tracking-wider mt-2 mb-2 lg:mb-8">Summer sale</p>
                            <p className="mb-1 text-14 lg:text-16 tracking-wide">An exclusive selection of this season’s trends. </p>
                            <p className="font-bold tracking-wide text-14 lg:text-16">Exclusively online </p>
                            <a href="#" className="btn inline-flex items-center justify-around mt-5 md:mt-7 lg:mt-8 py-2 md:py-3 lg:py-4 px-3 md:px-5 lg:px-6 text-12 lg:text-14 tracking-widest bg-red-600 text-white  border-red-600 hover:border-white hover:bg-white hover:text-gray-800">
                                Shop now
                                <i className="text-16"><HiPlusSm/></i>
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="relative">
                        <img src="/assets/img/slider/slider2.jpg" alt="Slider 2" className="object-cover w-full h-98 md:h-138 lg:h-142 animate-fade"/>
                        <div className="text-gray-800 uppercase absolute top-20 md:top-32 lg:top-40 text-center md:text-left md:left-24 lg:left-32 px-4 md:px-0 animate-slide-up">
                            <p className="text-red-600 text-16 md:text-18 lg:text-20 tracking-wide capitalize">Get 30% Off &#x26; Free Shipping</p> 
                            <p className="font-bold text-26 lg:text-5xl tracking-wider mt-2 mb-2 lg:mb-8">Summer sale</p>
                            <p className="mb-1 text-14 lg:text-16 tracking-wide">An exclusive selection of this season’s trends. </p>
                            <p className="font-bold tracking-wide text-14 lg:text-16">Exclusively online </p>
                            <a href="#" className="btn inline-flex items-center justify-around mt-5 md:mt-7 lg:mt-8 py-2 md:py-3 lg:py-4 px-3 md:px-5 lg:px-6 text-12 lg:text-14 tracking-widest bg-red-600 text-white  border-red-600 hover:border-white hover:bg-white hover:text-gray-800">
                                Shop now
                                <i className="text-16"><HiPlusSm/></i>
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className="relative">
                        <img src="/assets/img/slider/slider3.jpg" alt="Slider 3" className="object-cover w-full h-98 md:h-138 lg:h-142 animate-fade"/>
                        <div className="text-white uppercase absolute top-20 md:top-32 lg:top-40 text-center md:text-left md:left-24 lg:left-32 px-4 md:px-0 animate-slide-up">
                            <p className="text-red-600 text-16 md:text-18 lg:text-20 tracking-wide capitalize">Get 30% Off &#x26; Free Shipping</p> 
                            <p className="font-bold text-26 lg:text-5xl tracking-wider mt-2 mb-2 lg:mb-8">Summer sale</p>
                            <p className="mb-1 text-14 lg:text-16 tracking-wide">An exclusive selection of this season’s trends. </p>
                            <p className="font-bold tracking-wide text-14 lg:text-16">Exclusively online </p>
                            <a href="#" className="btn inline-flex items-center justify-around mt-5 md:mt-7 lg:mt-8 py-2 md:py-3 lg:py-4 px-3 md:px-5 lg:px-6 text-12 lg:text-14 tracking-widest bg-red-600 text-white  border-red-600 hover:border-white hover:bg-white hover:text-gray-800">
                                Shop now
                                <i className="text-16"><HiPlusSm/></i>
                            </a>
                        </div>
                    </SwiperSlide>
            </Swiper> 

            {/* Home Banner */}
            <div className="flex flex-col md:flex-row px-6 md:px-5 lg:px-14 my-16 md:my-20 space-y-6 md:space-y-0">
                <div className="flex-grow overflow-hidden">
                    <a href="#" className="banner relative w-full h-full inline-block transform hover:scale-110 transition ease-out duration-500">
                        <img src="/assets/img/bg/banner1.jpg" alt="banner1"  className="object-contain "/>
                        <div className="banner-test absolute top-24 md:top-1/4 lg:top-1/3 left-11 md:left-16 lg:left-1/4 w-4/6 lg:w-3/6 h-auto bg-white bg-opacity-80 py-4 md:py-6 lg:py-12 text-center opacity-0">
                            <p className="text-18 lg:text-4xl font-semibold text-gray-800 leading-5 md:leading-6 lg:leading-8">Men’s <br/> Collections</p>
                            <a href="#" className="btn inline-block text-12 py-1 md:py-1.5 lg:py-2.5 px-2 my-2 lg:my-9 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white">Shop now</a>
                        </div>
                    </a>
                </div>
                <div className="flex-grow overflow-hidden">
                    <a href="#" className="banner relative w-full h-full inline-block transform hover:scale-110 transition ease-out duration-500">
                        <img src="/assets/img/bg/banner2.jpg" alt="banner2"  className="object-contain "/>
                        <div className="banner-test absolute top-24 md:top-1/4 lg:top-1/3 left-11 md:left-16 lg:left-1/4 w-4/6 lg:w-3/6 h-auto bg-white bg-opacity-80 py-4 md:py-6 lg:py-12 text-center opacity-0">
                            <p className="text-18 lg:text-4xl font-semibold text-gray-800 leading-5 md:leading-6 lg:leading-8">Women’s <br/> Collections</p>
                            <a href="#" className="btn inline-block text-12 py-1 md:py-1.5 lg:py-2.5 px-2 my-2 lg:my-9 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white">Shop now</a>
                        </div>
                    </a>
                    
                </div>
            </div>

            {/* Home Top Categories */}
            <div className="px-4 lg:px-4 xl:px-14">
                <h3 className="uppercase text-gray-900 font-semibold text-3xl text-center mb-3 tracking-wide">TOP CATEGORIES</h3>
                <div className="w-16 h-0.5 bg-red-500 mx-auto"></div>  
                <div className="flex mt-8 mb-8 md:mb-12 lg:mb-24">
                    {/* Card */}
                    <Swiper
                        breakpoints= {{ 
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 0
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            },
                            1280: { 
                                slidesPerView: 4,
                                spaceBetween: 30
                            },
                            1440: {    
                                slidesPerView: 4,
                                spaceBetween: 30
                            },
                            
                        }}        
                        autoplay={{ delay: 3000, disableOnInteraction: false}}
                        loop={true}
                        pagination={{ dynamicBullets: true }}
                        >
                            <SwiperSlide className="flex-grow w-full mb-10">
                                <div className="overflow-hidden">
                                    <img src="/assets/img/s-product/category1.jpg" alt="Category1" className="object-cover w-full transform hover:scale-110 transition ease-linear duration-200"/>
                                </div> 
                                <a href="#" className="text-16 md:text-18 lg:text-2xl uppercase text-gray-800 inline-block my-2 lg:my-2.5 hover:text-red-600 transition ease-linear duration-150">T-shirt</a>
                                <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-14 lg:space-x-20">
                                    <p className="text-14 lg:text-sm text-gray-600">13 Products</p>
                                    <a href="#" className="text-12 lg:text-16 underline text-gray-800 hover:text-red-600 transition ease-linear duration-150">+ Shop Collection</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex-grow  w-full mb-10">
                                <div className="overflow-hidden">
                                    <img src="/assets/img/s-product/category2.jpg" alt="Category2" className="object-cover w-full transform hover:scale-110 transition ease-linear duration-200"/>
                                </div>
                                <a href="#" className="text-16 md:text-18 lg:text-2xl uppercase text-gray-800 inline-block my-2 lg:my-2.5 hover:text-red-600 transition ease-linear duration-150">Blazer</a>
                                <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-14 lg:space-x-20">
                                    <p className="text-14 lg:text-sm text-gray-600">14 Products</p>
                                    <a href="#" className="text-12 lg:text-16 underline text-gray-800 hover:text-red-600 transition ease-linear duration-150">+ Shop Collection</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex-grow w-full mb-10">
                                <div className="overflow-hidden">
                                    <img src="/assets/img/s-product/category3.jpg" alt="Category3" className="object-cover w-full transform hover:scale-110 transition ease-linear duration-200"/>
                                </div>
                                <a href="#" className="text-16 md:text-18 lg:text-2xl uppercase text-gray-800 inline-block my-2 lg:my-2.5 hover:text-red-600 transition ease-linear duration-150">Jackett</a>
                                <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-14 lg:space-x-20">
                                    <p className="text-14 lg:text-sm text-gray-600">11 Products</p>
                                    <a href="#" className="text-12 lg:text-16 underline text-gray-800 hover:text-red-600 transition ease-linear duration-150">+ Shop Collection</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex-grow w-full mb-10">
                                <div className="overflow-hidden">
                                    <img src="/assets/img/s-product/category4.jpg" alt="Category4" className="object-cover w-full transform hover:scale-110 transition ease-linear duration-200"/>
                                </div>
                                <a href="#" className="text-16 md:text-18 lg:text-2xl uppercase text-gray-800 inline-block my-2 lg:my-2.5 hover:text-red-600 transition ease-linear duration-150">Dress</a>
                                <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-14 lg:space-x-20">
                                    <p className="text-14 lg:text-sm text-gray-600">12 Products</p>
                                    <a href="#" className="text-12 lg:text-16 underline text-gray-800 hover:text-red-600 transition ease-linear duration-150">+ Shop Collection</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex-grow w-full mb-10">
                                <div className="overflow-hidden">
                                    <img src="/assets/img/s-product/category5.jpg" alt="Category 5" className="object-contain w-full transform hover:scale-110 transition ease-linear duration-200"/>
                                </div>
                                <a href="#" className="text-16 md:text-18 lg:text-2xl uppercase text-gray-800 inline-block my-2 lg:my-2.5 hover:text-red-600 transition ease-linear duration-150">Adidas</a>
                                <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-14 lg:space-x-20">
                                    <p className="text-14 lg:text-sm text-gray-600">20 Products</p>
                                    <a href="#" className="text-12 lg:text-16 underline text-gray-800 hover:text-red-600 transition ease-linear duration-150">+ Shop Collection</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex-grow w-full mb-10">
                                <div className="overflow-hidden">
                                    <img src="/assets/img/s-product/category6.jpg" alt="Category 6" className="object-contain w-full transform hover:scale-110 transition ease-linear duration-200"/>
                                </div>
                                <a href="#" className="text-16 md:text-18 lg:text-2xl uppercase text-gray-800 inline-block my-2 lg:my-2.5 hover:text-red-600 transition ease-linear duration-150">Puma</a>
                                <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-14 lg:space-x-20">
                                    <p className="text-14 lg:text-sm text-gray-600">25 Products</p>
                                    <a href="#" className="text-12 lg:text-16 underline text-gray-800 hover:text-red-600 transition ease-linear duration-150">+ Shop Collection</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex-grow w-full mb-10">
                                <div className="overflow-hidden">
                                    <img src="/assets/img/s-product/category7.jpg" alt="Category 7" className="object-contain w-full transform hover:scale-110 transition ease-linear duration-200"/>
                                </div>
                                <a href="#" className="text-16 md:text-18 lg:text-2xl uppercase text-gray-800 inline-block my-2 lg:my-2.5 hover:text-red-600 transition ease-linear duration-150">Nike</a>
                                <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-14 lg:space-x-20">
                                    <p className="text-14 lg:text-sm text-gray-600">25 Products</p>
                                    <a href="#" className="text-12 lg:text-16 underline text-gray-800 hover:text-red-600 transition ease-linear duration-150">+ Shop Collection</a>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="flex-grow w-full mb-10">
                                <div className="overflow-hidden">
                                    <img src="/assets/img/s-product/category8.jpg" alt="Category 8" className="object-contain w-full transform hover:scale-110 transition ease-linear duration-200"/>
                                </div>
                                <a href="#" className="text-16 md:text-18 lg:text-2xl uppercase text-gray-800 inline-block my-2 lg:my-2.5 hover:text-red-600 transition ease-linear duration-150">Adidas</a>
                                <div className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-14 lg:space-x-20">
                                    <p className="text-14 lg:text-sm text-gray-600">25 Products</p>
                                    <a href="#" className="text-12 lg:text-16 underline text-gray-800 hover:text-red-600 transition ease-linear duration-150">+ Shop Collection</a>
                                </div>
                            </SwiperSlide>
                    </Swiper> 
                </div>
                
            </div>
            {/* Home Feedback */}
            <div className="px-4 lg:px-14 py-12 md:py-16 lg:py-24 bg-gray-100">
                <h3 className="uppercase text-gray-900 font-semibold text-18 md:text-22 lg:text-3xl text-center mb-3 tracking-wide">TESTIMONIALS</h3>
                <div className="w-16 h-0.5 bg-red-500 mx-auto"></div>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    centeredSlides={true}
                    // navigation
                    autoplay={{ delay: 3000, disableOnInteraction: false}}
                    loop={true}

                    effect={'flip'}
                    grabCursor={true}
                >
                    <SwiperSlide className="flex flex-col items-center ">
                        <img src="/assets/img/about/testimonial1.png" alt="Testimonial 1" className="object-contain w-20 lg:w-24 rounded-full max-w-max my-5 lg:my-8"/>
                        <p className="w-full lg:w-8/12 text-center text-15 lg:text-20 text-gray-800 leading-6 lg:leading-9">These guys have been absolutely outstanding. Perfect Themes and the best of all that you have many options to choose!
                         Best Support team ever! Very fast responding! Thank you very much! I highly recommend this theme and these people!</p>
                        <p className="uppercase text-red-600 text-16 font-bold mt-4">John Sullivan</p>
                        <p className="uppercase text-12 mb-2">Customer</p>
                    </SwiperSlide>
                    <SwiperSlide className="flex flex-col items-center justify-center">
                        <img src="/assets/img/about/testimonial2.png" alt="Testimonial 2" className="object-contain w-20 lg:w-24 rounded-full max-w-max my-5 lg:my-8"/>
                        <p className="w-full lg:w-8/12 text-center text-15 lg:text-20 text-gray-800 leading-6 lg:leading-9">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error in, mollitia nulla officiis excepturi repudiandae
                         beatae optio, sequi maxime assumenda ipsum exercitationem nostrum ducimus facilis, nesciunt aliquam dicta totam.</p>
                        <p className="uppercase text-red-600 text-16 font-bold mt-4">Kathy Young</p>
                        <p className="uppercase text-12 mb-2">CEO of SunPark</p>
                    </SwiperSlide>
                    <SwiperSlide className="flex flex-col items-center justify-center">
                        <img src="/assets/img/about/testimonial3.png" alt="Testimonial 3" className="object-contain w-20 lg:w-24 rounded-full max-w-max my-5 lg:my-8"/>
                        <p className="w-full lg:w-8/12 text-center text-15 lg:text-20 text-gray-800 leading-6 lg:leading-9">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est aliquam dicta explicabo ipsa quae laboriosam animi 
                        impedit a aliquid, amet sint temporibus tempore tenetur aspernatur. Placeat deleniti beatae saepe cupiditate!</p>
                        <p className="uppercase text-red-600 text-16 font-bold mt-4">Jenifer Brown</p>
                        <p className="uppercase text-12 mb-2">Manager of AZ</p>
                    </SwiperSlide>
            </Swiper> 
            </div>
            {/* Home Features Product */}
            <div className="px-14 py-24 text-center">
                <h3 className="uppercase text-gray-900 font-semibold text-3xl text-center mb-3 tracking-wide">FEATURED PRODUCTS</h3>
                <div className="w-16 h-0.5 bg-red-500 mx-auto"></div>
                <a href="#" className="inline-block my-5 uppercase tracking-wider font-bold text-12 text-gray-800 border-b border-gray-400 hover:text-red-600 hover:border-red-600 transition ease-linear duration-150"> Shop all Collection</a>
                <div className="grid grid-cols-5 gap-7">
                    {/* Cards Item */}
                    <div className="flex-grow relative product__card transition-all ease-linear duration-200 transform hover:-translate-y-2">
                        <img src="/assets/img/product/product1.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                        <img src="/assets/img/product/product2.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                        <span className="tag-sale top-4 right-4">Sale</span>
                        <div className="product__icon absolute top-20 left-24 flex-col hidden">
                            <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                            </a>
                            <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                            </a>
                            <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                            </a>
                        </div>
                        <div className="product__info">
                            <a href="#">
                                <h4 className="text-gray-700 text-left my-4">Duis pulvinar obortis eleifend elementum</h4>
                            </a>
                            <p className="text-left text-gray-700">
                                <span className="line-through mr-4">$84.00</span>
                                <span>$79.00</span>
                            </p>
                        </div>
                        <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                            Add to cart
                            <i className="ml-4"><HiPlusSm/></i>
                        </button>   
                    </div>

                    <div className="flex-grow relative product__card transition-all ease-linear duration-200 transform hover:-translate-y-2">
                        <img src="/assets/img/product/product5.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                        <img src="/assets/img/product/product6.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                        <span className="tag-sale top-4 right-4">Sale</span>
                        <div className="product__icon absolute top-20 left-24 flex-col hidden">
                            <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                            </a>
                            <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                            </a>
                            <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                            </a>
                        </div>
                        <div className="product__info">
                            <a href="#">
                                <h4 className="text-gray-700 text-left my-4">Epicuri per lobortis eleifend eget laoreet</h4>
                            </a>
                            <p className="text-left text-gray-700">
                                <span className="line-through mr-4">$94.00</span>
                                <span>$89.00</span>
                            </p>
                        </div>
                        <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                            Add to cart
                            <i className="ml-4"><HiPlusSm/></i>
                        </button>   
                    </div>

                    <div className="flex-grow relative product__card transition-all ease-linear duration-200 transform hover:-translate-y-2">
                        <img src="/assets/img/product/product9.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                        <img src="/assets/img/product/product11.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                        <span className="tag-sale top-4 right-4">Sale</span>
                        <div className="product__icon absolute top-20 left-24 flex-col hidden">
                            <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                            </a>
                            <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                            </a>
                            <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                            </a>
                        </div>
                        <div className="product__info">
                            <a href="#">
                                <h4 className="text-gray-700 text-left my-4">Kaoreet lobortis sagittis laoreet metus is</h4>
                            </a>
                            <p className="text-left text-gray-700">
                                <span className="line-through mr-4">$90.00</span>
                                <span>$76.00</span>
                            </p>
                        </div>
                        <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                            Add to cart
                            <i className="ml-4"><HiPlusSm/></i>
                        </button>   
                    </div>
                    
                    <div className="flex-grow relative product__card transition-all ease-linear duration-200 transform hover:-translate-y-2">
                        <img src="/assets/img/product/product13.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                        <img src="/assets/img/product/product14.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                        <span className="tag-sale top-4 right-4">Sale</span>
                        <div className="product__icon absolute top-20 left-24 flex-col hidden">
                            <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                            </a>
                            <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                            </a>
                            <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                            </a>
                        </div>
                        <div className="product__info">
                            <a href="#">
                                <h4 className="text-gray-700 text-left my-4">Ornare sed consequat nisl eget mi porttitor</h4>
                            </a>
                            <p className="text-left text-gray-700">
                                <span className="line-through mr-4">$90.00</span>
                                <span>$76.00</span>
                            </p>
                        </div>
                        <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                            Add to cart
                            <i className="ml-4"><HiPlusSm/></i>
                        </button>   
                    </div>

                    <div className="flex-grow relative product__card transition-all ease-linear duration-200 transform hover:-translate-y-2">
                        <img src="/assets/img/product/product3.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                        <img src="/assets/img/product/product15.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                        <span className="tag-sale top-4 right-4">Sale</span>
                        <div className="product__icon absolute top-20 left-24 flex-col hidden">
                            <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                            </a>
                            <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                            </a>
                            <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                            </a>
                        </div>
                        <div className="product__info">
                            <a href="#">
                                <h4 className="text-gray-700 text-left my-4">Aliquam lobortis pellentesque nisi lectus</h4>
                            </a>
                            <p className="text-left text-gray-700">
                                <span className="line-through mr-4">$90.00</span>
                                <span>$76.00</span>
                            </p>
                        </div>
                        <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                            Add to cart
                            <i className="ml-4"><HiPlusSm/></i>
                        </button>   
                    </div>
                    {/* Cards Item */}
                    <div className="flex-grow relative product__card transition-all ease-linear duration-200 transform hover:-translate-y-2">
                        <img src="/assets/img/product/product8.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                        <img src="/assets/img/product/product4.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                        <span className="tag-sale top-4 right-4">Sale</span>
                        <div className="product__icon absolute top-20 left-24 flex-col hidden">
                            <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                            </a>
                            <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                            </a>
                            <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                            </a>
                        </div>
                        <div className="product__info">
                            <a href="#">
                                <h4 className="text-gray-700 text-left my-4">Aliquam lobortis pellentesque nisi lectus</h4>
                            </a>
                            <p className="text-left text-gray-700">
                                <span className="line-through mr-4">$90.00</span>
                                <span>$76.00</span>
                            </p>
                        </div>
                        <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                            Add to cart
                            <i className="ml-4"><HiPlusSm/></i>
                        </button>   
                    </div>

                    <div className="flex-grow relative product__card transition-all ease-linear duration-200 transform hover:-translate-y-2">
                        <img src="/assets/img/product/product7.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                        <img src="/assets/img/product/product2.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                        <span className="tag-sale top-4 right-4">Sale</span>
                        <div className="product__icon absolute top-20 left-24 flex-col hidden">
                            <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                            </a>
                            <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                            </a>
                            <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                            </a>
                        </div>
                        <div className="product__info">
                            <a href="#">
                                <h4 className="text-gray-700 text-left my-4">Aliquam lobortis pellentesque nisi lectus</h4>
                            </a>
                            <p className="text-left text-gray-700">
                                <span className="line-through mr-4">$90.00</span>
                                <span>$76.00</span>
                            </p>
                        </div>
                        <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                            Add to cart
                            <i className="ml-4"><HiPlusSm/></i>
                        </button>   
                    </div>
                    
                    <div className="flex-grow relative product__card transition-all ease-linear duration-200 transform hover:-translate-y-2">
                        <img src="/assets/img/product/product12.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                        <img src="/assets/img/product/product11.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                        <span className="tag-sale top-4 right-4">Sale</span>
                        <div className="product__icon absolute top-20 left-24 flex-col hidden">
                            <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                            </a>
                            <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                            </a>
                            <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                            </a>
                        </div>
                        <div className="product__info">
                            <a href="#">
                                <h4 className="text-gray-700 text-left my-4">Aliquam lobortis pellentesque nisi lectus</h4>
                            </a>
                            <p className="text-left text-gray-700">
                                <span className="line-through mr-4">$90.00</span>
                                <span>$76.00</span>
                            </p>
                        </div>
                        <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                            Add to cart
                            <i className="ml-4"><HiPlusSm/></i>
                        </button>   
                    </div>
                
                    <div className="flex-grow relative product__card transition-all ease-linear duration-200 transform hover:-translate-y-2">
                        <img src="/assets/img/product/product4.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                        <img src="/assets/img/product/product3.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                        <span className="tag-sale top-4 right-4">Sale</span>
                        <div className="product__icon absolute top-20 left-24 flex-col hidden">
                            <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                            </a>
                            <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                            </a>
                            <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                            </a>
                        </div>
                        <div className="product__info">
                            <a href="#">
                                <h4 className="text-gray-700 text-left my-4">Aliquam lobortis pellentesque nisi lectus</h4>
                            </a>
                            <p className="text-left text-gray-700">
                                <span className="line-through mr-4">$90.00</span>
                                <span>$76.00</span>
                            </p>
                        </div>
                        <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                            Add to cart
                            <i className="ml-4"><HiPlusSm/></i>
                        </button>   
                    </div>

                    <div className="flex-grow relative product__card transition-all ease-linear duration-200 transform hover:-translate-y-2">
                        <img src="/assets/img/product/product15.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                        <img src="/assets/img/product/product14.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                        <span className="tag-sale top-4 right-4">Sale</span>
                        <div className="product__icon absolute top-20 left-24 flex-col hidden">
                            <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                            </a>
                            <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                            </a>
                            <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                            </a>
                        </div>
                        <div className="product__info">
                            <a href="#">
                                <h4 className="text-gray-700 text-left my-4">Aliquam lobortis pellentesque nisi lectus</h4>
                            </a>
                            <p className="text-left text-gray-700">
                                <span className="line-through mr-4">$90.00</span>
                                <span>$76.00</span>
                            </p>
                        </div>
                        <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                            Add to cart
                            <i className="ml-4"><HiPlusSm/></i>
                        </button>   
                    </div>
                </div>
                <button className="btn btn--load-more hover:bg-red-600 hover:text-white">Load More</button>
            </div>

            {/* Home Collections */}
            <div>
                <div className="flex flex-col md:flex-row space-y-6 md:space-y-0">
                    <a href="#" className="flex-grow relative overflow-hidden">
                        <img src="/assets/img/bg/banner3.jpg" alt="Banner3" className="object-contain transform hover:scale-110 transition ease-out duration-300"/>
                        <div className="absolute top-0 lg:top-1/3 left-0 lg:left-12">
                            <h3 className="text-20 md:text-28 lg:text-5xl text-white font-normal">S/S-20 <br/> Collections</h3>
                            <button className="btn border-white text-white text-14 tracking-widest py-2.5 mt-3 lg:mt-7 hover:bg-white hover:text-gray-800">Shop now</button>
                        </div>
                    </a>
                    <a href="#" className="flex-grow relative overflow-hidden">
                        <img src="/assets/img/bg/banner4.jpg" alt="Banner4" className="object-contain transform hover:scale-110 transition ease-out duration-300"/>
                        <div className="absolute top-1/3 left-12">
                            <h3 className="text-5xl text-white font-normal">A/W-20 <br/> Collections</h3>
                            <button className="btn border-white text-white text-14 tracking-widest py-2.5 mt-7 hover:bg-white hover:text-gray-800">Shop now</button>
                        </div>
                    </a>
                    
                </div>
                <div className="w-full relative overflow-hidden">
                    <a href="#" >
                        <img src="/assets/img/bg/banner5.jpg" alt="Banner5" className="object-contain transform hover:scale-110 transition ease-out duration-300"/>
                    </a>
                    <div className="absolute top-1/3 right-44 text-gray-900">
                        <h4 className="text-red-500 text-3xl">Minimalist Spring Collection</h4>
                        <h2 className="uppercase text-6xl font-bold mt-3 mb-8">UP TO 40% OFF</h2>
                        <p className="tracking-wider">AN EXCLUSIVE SELECTION OF THIS SEASON’S TRENDS.</p>
                        <p className="tracking-wider font-bold mt-1">EXCLUSIVELY ONLINE!</p>
                        <a href="#" className="btn inline-flex items-center mt-6 py-3 text-14 tracking-widest bg-white border-white hover:bg-red-600 hover:text-white">
                            Shop now
                            <i className="ml-16"><HiPlusSm/></i>
                        </a>
                    </div>
                </div>
            </div>
            
            {/* Home Our Category */}
            <div className="px-14 py-24">
                <h3 className="uppercase text-gray-900 font-semibold text-3xl text-center mb-3 tracking-wide">OUR CATEGORIES</h3>
                <div className="w-16 h-0.5 bg-red-500 mx-auto"></div>
                <div className="flex items-center justify-center space-x-3 text-gray-900 my-6">
                    <button className="tag-category bg-red-600 text-white">
                        <i className="-ml-1 mt-0.5 mr-1"><HiPlusSm/></i>
                        Tennis
                    </button>
                    <button className="tag-category hover:bg-red-600 hover:text-white">
                        <i className="-ml-1 mt-0.5 mr-1"><HiPlusSm/></i>
                        Fitness
                    </button>
                    <button className="tag-category hover:bg-red-600 hover:text-white">
                        <i className="-ml-1 mt-0.5 mr-1"><HiPlusSm/></i>
                        Football
                    </button>
                </div>
                <div className="flex">
                    {/* Cards Item */}
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={5}                     
                        autoplay={{ delay: 3000, disableOnInteraction: false}}
                        loop={true}
                        pagination={{ dynamicBullets: true }}
                        >
                            <SwiperSlide className="product__card flex-grow relative mb-10 transition-all ease-linear duration-200 transform hover:-translate-y-2">
                                <img src="/assets/img/product/product3.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                                <img src="/assets/img/product/product4.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                                <span className="tag-sale top-4 right-4">Sale</span>
                                <div className="product__icon absolute top-20 left-24 flex-col hidden">
                                    <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                                    </a>
                                </div>
                                <div className="product__info">
                                    <a href="#">
                                        <h4 className="text-gray-700 text-left my-4">Duis pulvinar obortis eleifend elementum</h4>
                                    </a>
                                    <p className="text-left text-gray-700">
                                        <span className="line-through mr-4">$84.00</span>
                                        <span>$79.00</span>
                                    </p>
                                </div>
                                <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                                    Add to cart
                                    <i className="ml-4"><HiPlusSm/></i>
                                </button>   
                            </SwiperSlide>
                            <SwiperSlide className="product__card flex-grow relative mb-10 transition-all ease-linear duration-200 transform hover:-translate-y-2">
                                <img src="/assets/img/product/product5.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                                <img src="/assets/img/product/product6.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                                <span className="tag-sale top-4 right-4">Sale</span>
                                <div className="product__icon absolute top-20 left-24 flex-col hidden">
                                    <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                                    </a>
                                </div>
                                <div className="product__info">
                                    <a href="#">
                                        <h4 className="text-gray-700 text-left my-4">Epicuri per lobortis eleifend eget laoreet</h4>
                                    </a>
                                    <p className="text-left text-gray-700">
                                        <span className="line-through mr-4">$94.00</span>
                                        <span>$89.00</span>
                                    </p>
                                </div>
                                <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                                    Add to cart
                                    <i className="ml-4"><HiPlusSm/></i>
                                </button> 
                            </SwiperSlide>
                            <SwiperSlide className="product__card flex-grow relative mb-10 transition-all ease-linear duration-200 transform hover:-translate-y-2">
                                <img src="/assets/img/product/product7.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                                <img src="/assets/img/product/product8.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                                <span className="tag-sale top-4 right-4">Sale</span>
                                <div className="product__icon absolute top-20 left-24 flex-col hidden">
                                    <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                                    </a>
                                </div>
                                <div className="product__info">
                                    <a href="#">
                                        <h4 className="text-gray-700 text-left my-4">Kaoreet lobortis sagittis laoreet metus is</h4>
                                    </a>
                                    <p className="text-left text-gray-700">
                                        <span className="line-through mr-4">$90.00</span>
                                        <span>$76.00</span>
                                    </p>
                                </div>
                                <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                                    Add to cart
                                    <i className="ml-4"><HiPlusSm/></i>
                                </button>
                            </SwiperSlide>
                            <SwiperSlide className="product__card flex-grow relative mb-10 transition-all ease-linear duration-200 transform hover:-translate-y-2">
                                <img src="/assets/img/product/product21.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                                <img src="/assets/img/product/product22.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                                <span className="tag-sale top-4 right-4">Sale</span>
                                <div className="product__icon absolute top-20 left-24 flex-col hidden">
                                    <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                                    </a>
                                </div>
                                <div className="product__info">
                                    <a href="#">
                                        <h4 className="text-gray-700 text-left my-4">Ornare sed consequat nisl eget mi porttitor</h4>
                                    </a>
                                    <p className="text-left text-gray-700">
                                        <span className="line-through mr-4">$90.00</span>
                                        <span>$76.00</span>
                                    </p>
                                </div>
                                <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                                    Add to cart
                                    <i className="ml-4"><HiPlusSm/></i>
                                </button>   
                            </SwiperSlide>
                            <SwiperSlide className="product__card flex-grow relative mb-10 transition-all ease-linear duration-200 transform hover:-translate-y-2">
                                <img src="/assets/img/product/product4.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                                <img src="/assets/img/product/product3.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                                <span className="tag-sale top-4 right-4">Sale</span>
                                <div className="product__icon absolute top-20 left-24 flex-col hidden">
                                    <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                                    </a>
                                </div>
                                <div className="product__info">
                                    <a href="#">
                                        <h4 className="text-gray-700 text-left my-4">Ornare sed consequat nisl eget mi porttitor</h4>
                                    </a>
                                    <p className="text-left text-gray-700">
                                        <span className="line-through mr-4">$90.00</span>
                                        <span>$76.00</span>
                                    </p>
                                </div>
                                <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                                    Add to cart
                                    <i className="ml-4"><HiPlusSm/></i>
                                </button>
                            </SwiperSlide>
                            <SwiperSlide className="product__card flex-grow relative mb-10 transition-all ease-linear duration-200 transform hover:-translate-y-2">
                                <img src="/assets/img/product/product25.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                                <img src="/assets/img/product/product26.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                                <span className="tag-sale top-4 right-4">Sale</span>
                                <div className="product__icon absolute top-20 left-24 flex-col hidden">
                                    <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                                    </a>
                                </div>
                                <div className="product__info">
                                    <a href="#">
                                        <h4 className="text-gray-700 text-left my-4">Ornare sed consequat nisl eget mi porttitor</h4>
                                    </a>
                                    <p className="text-left text-gray-700">
                                        <span className="line-through mr-4">$90.00</span>
                                        <span>$76.00</span>
                                    </p>
                                </div>
                                <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                                    Add to cart
                                    <i className="ml-4"><HiPlusSm/></i>
                                </button>
                            </SwiperSlide>
                            <SwiperSlide className="product__card flex-grow relative mb-10 transition-all ease-linear duration-200 transform hover:-translate-y-2">
                                <img src="/assets/img/product/product33.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                                <img src="/assets/img/product/product34.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                                <span className="tag-sale top-4 right-4">Sale</span>
                                <div className="product__icon absolute top-20 left-24 flex-col hidden">
                                    <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                                    </a>
                                </div>
                                <div className="product__info">
                                    <a href="#">
                                        <h4 className="text-gray-700 text-left my-4">Ornare sed consequat nisl eget mi porttitor</h4>
                                    </a>
                                    <p className="text-left text-gray-700">
                                        <span className="line-through mr-4">$90.00</span>
                                        <span>$76.00</span>
                                    </p>
                                </div>
                                <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                                    Add to cart
                                    <i className="ml-4"><HiPlusSm/></i>
                                </button>
                            </SwiperSlide>
                            <SwiperSlide className="product__card flex-grow relative mb-10 transition-all ease-linear duration-200 transform hover:-translate-y-2">
                                <img src="/assets/img/product/product31.jpg" alt="Product-Main" className="object-contain product__img-main transition-all ease-linear duration-700"/>
                                <img src="/assets/img/product/product32.jpg" alt="Product-Extra" className="object-contain product__img-extra hidden transition-all ease-linear duration-700"/>
                                <span className="tag-sale top-4 right-4">Sale</span>
                                <div className="product__icon absolute top-20 left-24 flex-col hidden">
                                    <a href="#" data-original-title="Quick view" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsSearch/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Wishlist" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><BsHeart/></i>
                                    </a>
                                    <a href="#" data-original-title="Add to Cart" className="ml-3 items-center">
                                        <i data-original-title className="inline-block text-xl font-extralight bg-white p-2.5 rounded-full text-gray-700 hover:text-red-600"><AiOutlineShoppingCart/></i>
                                    </a>
                                </div>
                                <div className="product__info">
                                    <a href="#">
                                        <h4 className="text-gray-700 text-left my-4">Ornare sed consequat nisl eget mi porttitor</h4>
                                    </a>
                                    <p className="text-left text-gray-700">
                                        <span className="line-through mr-4">$90.00</span>
                                        <span>$76.00</span>
                                    </p>
                                </div>
                                <button className="btn__add-to-cart btn mt-10 mb-3 items-center justify-around mx-auto w-11/12 bg-red-600 text-white py-3.5 text-14 hover:bg-gray-900 hidden transition ease-linear duration-200">
                                    Add to cart
                                    <i className="ml-4"><HiPlusSm/></i>
                                </button>
                            </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            {/* Home Services */}
            <div className="px-14">
                <div className="flex items-center justify-between border border-gray-200 rounded-md px-8 py-14">
                    <div className="flex items-center">
                        <img src="/assets/img/about/shipping1.png" alt="Shipping 1"/>
                        <div className="ml-3">
                            <h5 className="font-bold tracking-wider uppercase">FREE DELIVERY</h5>
                            <p className="text-gray-600">Free shipping on all order</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img src="/assets/img/about/shipping2.png" alt="Shipping 2"/>
                        <div className="ml-3">
                            <h5 className="font-bold tracking-wider uppercase">ONLINE SUPPORT 24/7</h5>
                            <p className="text-gray-600">Support online 24 hours a day</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img src="/assets/img/about/shipping3.png" alt="Shipping 3"/>
                        <div className="ml-3">
                            <h5 className="font-bold tracking-wider uppercase">MONEY RETURN</h5>
                            <p className="text-gray-600">Back guarantee under 7 days</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img src="/assets/img/about/shipping4.png" alt="Shipping 4"/>
                        <div className="ml-3">
                            <h5 className="font-bold tracking-wider uppercase">MEMBER DISCOUNT</h5>
                            <p className="text-gray-600">Onevery order over $120.00</p>
                        </div>
                    </div>
                </div>
                <ul className="flex items-center justify-between px-8 py-24">
                    <li>
                        <a href="#">
                            <img src="/assets/img/brand/brand1.jpg" alt="Brand 1" className="object-contain"/>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/assets/img/brand/brand2.jpg" alt="Brand 2" className="object-contain"/>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/assets/img/brand/brand3.jpg" alt="Brand 3" className="object-contain"/>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/assets/img/brand/brand4.jpg" alt="Brand 4" className="object-contain"/>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/assets/img/brand/brand5.jpg" alt="Brand 5" className="object-contain"/>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <img src="/assets/img/brand/brand6.jpg" alt="Brand 6" className="object-contain"/>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}