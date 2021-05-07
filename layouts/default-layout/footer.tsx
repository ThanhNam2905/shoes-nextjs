import { GoMail } from "react-icons/go";
import { GrFacebookOption, GrTwitter, GrYoutube, GrGoogle, GrInstagram } from "react-icons/gr";
import { FaCcMastercard, FaCcPaypal, FaCcDiscover, FaCcVisa } from "react-icons/fa";

export function Footer() {
    return (
        <>
            <footer className="w-full">
                <div className="bg-secondary pt-10 sm:pt-12 md:pt-14 lg:pt-28 px-6 sm:px-12 md:px-14 lg:px-20 divide-y divide-secondary-light">
                    <div className="contact">
                        <h1 className="text-18 sm:text-20 md:text-24 lg:text-3xl uppercase font-bold text-center text-white mb-3 lg:mb-4">Keep Connected</h1>
                        <div className="w-20 h-0.5 bg-red-700 mx-auto"></div>
                        <p className="text-secondary-light text-center mt-5 lg:mt-7 text-16 lg:text-18">Get updates by subscribe our weekly newsletter</p>
                        <div className="form__contact-email flex flex-col md:flex-row items-center lg:items-end justify-center md:space-x-8 lg:space-x-10 mt-6 pb-16 lg:pb-32">
                            <div className="flex items-center w-full md:w-96 lg:w-96 border-b-2 border-white pb-1.5">
                                <i className="text-20 md:text-24 lg:text-3xl text-white font-extralight mr-3"><GoMail/></i>
                                <input type="text" className=" focus:outline-none bg-transparent text-14 lg:text-16 text-secondary-light placeholder-secondary-light " placeholder="Your email address"/>
                            </div>
                            <button className="uppercase font-bold text-14 text-white hover:text-gray-900 transition ease-linear duration-200 bg-red-600 px-10 lg:px-12 py-3.5 lg:py-4 mt-6 lg:mt-0 rounded-full focus:outline-none">Subscribe</button>
                        </div>
                    </div>
                    <ul className="social flex items-center justify-center py-7 sm:py-8 md:py-9 lg:py-14 space-x-2 md:space-x-4 lg:space-x-6 text-gray-500">
                        <li className="border lg:border-2 border-secondary-light p-2.5 lg:p-3 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition ease-out duration-200">
                            <a href="#"><GrFacebookOption className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6"/></a>
                        </li>
                        <li className="border lg:border-2 border-secondary-light p-2.5 lg:p-3 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition ease-out duration-200">
                            <a href="#"><GrTwitter className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6"/></a>
                        </li>
                        <li className="border lg:border-2 border-secondary-light p-2.5 lg:p-3 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition ease-out duration-200">
                            <a href="#"><GrYoutube className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6"/></a>
                        </li>
                        <li className="border lg:border-2 border-secondary-light p-2.5 lg:p-3 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition ease-out duration-200">
                            <a href="#"><GrGoogle className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6"/></a>
                        </li>
                        <li className="border lg:border-2 border-secondary-light p-2.5 lg:p-3 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition ease-out duration-200">
                            <a href="#"><GrInstagram className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6"/></a>
                        </li>
                    </ul>
                    <div className="footer flex flex-col md:flex-row items-center justify-between py-8">
                        <div className="flex flex-col md:flex-row items-center">
                            <a href="#">
                                <img src="/assets/img/logo/logo2.png" alt="logo2" className="w-24 lg:w-28 object-contain"/>
                            </a>
                            <p className="ml-0 md:ml-5 lg:ml-9 my-5 md:my-0 text-secondary-light font-medium md:font-normal text-center md:text-left text-14 md:text-16 lg:text-18"> Copyright © 2020 Braga. All Rights Reserved.</p>
                        </div>
                        
                        <ul className="flex items-center space-x-4">
                            <li className="text-gray-400">
                                <a href="#"><FaCcVisa className="w-10 lg:w-12 h-10 lg:h-12"/></a>
                            </li>
                            <li className="text-gray-400">
                                <a href="#"><FaCcMastercard className="w-10 lg:w-12 h-10 lg:h-12"/></a>
                            </li>
                            <li className="text-gray-400">
                                <a href="#"><FaCcDiscover className="w-10 lg:w-12 h-10 lg:h-12"/></a>
                            </li>
                            <li className="text-gray-400">
                                <a href="#"><FaCcPaypal className="w-10 lg:w-12 h-10 lg:h-12"/></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}