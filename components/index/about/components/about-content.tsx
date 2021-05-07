
export default function AboutContent(props) {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-11 px-4 xs:px-7 sm:px-10 lg:px-14 py-10 md:py-16 lg:py-20">
                <div className="flex flex-col justify-center order-2 lg:order-none text-center lg:text-left">
                    <h2 className="font-semibold text-20 md:text-3xl lg:text-4xl">About Our Braga Store</h2>
                    <p className="font-semibold text-15 lg:text-18 my-1 lg:my-4">We believe that every project existing in digital world is a result of an idea and every idea has a cause.</p>
                    <p className="text-14 font-normal leading-7">For this reason, our each design serves an idea. Our strength in design is reflected by our name, our care for details. Our specialist won't be afraid to go extra miles just to approach near perfection. We don't require everything to be perfect, but we need them to be perfectly cared for. That's a reason why we are willing to give contributions at best. Not a single detail is missed out under Billey's professional eyes.The amount of dedication and effort equals to the level of passion and by.</p>
                </div>
                <div className="order-1 lg:order-none">
                    <img src="/assets/img/about/about1.jpg" alt="About 1" className="object-contain"/>
                </div>
            </div>
            <div className="relative w-full">
                <img src="/assets/img/about/about-us-policy-bg.jpg" alt="about-us-policy-bg" className="object-cover w-full h-152 md:h-138 lg:h-80 lg:max-h-80" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 absolute top-0 left-0 p-6 lg:p-14 h-full">
                    <div className="about-content text-center flex flex-col justify-center">
                        <img src="/assets/img/about/About_icon1.png" alt="About_icon1" className="object-contain mx-auto transform transition-transform ease-in-out duration-500"/>
                        <h4 className="text-22 my-2 lg:my-4">Creative Design</h4>
                        <p className="text-16">Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet</p>
                    </div>
                    <div className="about-content text-center flex flex-col justify-center">
                        <img src="/assets/img/about/About_icon2.png" alt="About_icon2" className="object-contain mx-auto transform transition-transform ease-in-out duration-500"/>
                        <h4 className="text-22 my-2 lg:my-4">100% Money Back Guarantee</h4>
                        <p className="text-16">Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet</p>
                    </div>
                    <div className="about-content text-center flex flex-col justify-center">
                        <img src="/assets/img/about/About_icon3.png" alt="About_icon3" className="object-contain mx-auto transform transition-transform ease-in-out duration-500"/>
                        <h4 className="text-22 my-2 lg:my-4">Online Support 24/7</h4>
                        <p className="text-16">Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet</p>
                    </div>
                </div>
            </div>
        </>
    )
}