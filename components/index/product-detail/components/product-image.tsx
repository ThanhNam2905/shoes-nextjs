import ReactImageMagnify from 'react-image-magnify';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper React components
import 'swiper/swiper-bundle.min.css'; // Import Swiper styles
import SwiperCore, { Navigation, Pagination } from 'swiper'; // import Swiper core and required modules
SwiperCore.use([Navigation, Pagination]); // install Swiper modules
import { useState } from 'react';
type PropsType = {
    product: any
}

export default function ProductImage({ product }: PropsType) {

    const [changeImage, setChangeImage] = useState(0);
    const handlerClickImages = (index) => {
        setChangeImage(index || "/assets/img/default.png");
    }
    const isActive = (index) => {
        if(changeImage == index) {
            return " border border-yellow-600 p-0.5 opacity-100";
        }
    }

    return (
        <>     
            {/* <ReactImageMagnify {...{
                smallImage: {
                    alt: product.images[changeImage],
                    isFluidWidth: true,
                    src: product.images[changeImage]
                },
                largeImage: {
                    src: "/assets/img/product/nike-sneaker8L.jpg",
                    width: 1200,
                    height: 1200
                }
            }}
            /> */}

            <div className="aspect-w-16 aspect-h-9 h-138 ">
                <img src={`${product.images[changeImage]}`} alt={product.images[changeImage]} className="object-contain w-full max-w-full" />
            </div>
            <Swiper
                className="my-4"
                spaceBetween={20}
                slidesPerView={3}
                navigation
                loop={false}
            >
                {product.images?.length > 0 &&
                    product.images.map((img, index) => (
                        <SwiperSlide key={index} className="h-56">
                            <img src={img} alt={product.images[changeImage]} 
                                onClick={() => handlerClickImages(index)} 
                                className={`object-fill  h-36 max-h-36 w-full max-w-full cursor-pointer opacity-60 ${isActive(index)}`} />
                        </SwiperSlide>
                    )) 
                }
            </Swiper>
        </>
    )
}