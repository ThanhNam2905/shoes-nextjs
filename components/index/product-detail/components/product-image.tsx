
import { useState } from 'react';
import { Image } from "antd";
import Slider from "react-slick";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

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
    const settings = {
        customPaging: function(i) {
            return (
                <a>
                    <img src={product.images[i].url} alt={product.images[i].url}/>
                </a>
            )
        },
        dots: true,
        dotsClass: "group-array-image",
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        nextArrow: (
            <div className="">
                <i className="btn-next-slider flex items-center justify-center"><AiOutlineRight/></i>
            </div>
          ),
        prevArrow: (
            <div className="">
                <i className="btn-prev-slider flex items-center justify-center"><AiOutlineLeft/></i>
            </div>
        ),
      };

    return (
        <>   
            <div className="group-image-detail overflow-hidden">
                <Slider {...settings}>
                    {
                        product.images.length > 0 &&
                            product.images.map((img, index) =>(
                                <div className="image-array-slider" key={index}>
                                    <Image src={img.url} alt={img.url}/>
                                </div>
                            ))
                    }
                </Slider>
            </div>  
        </>
    )
}