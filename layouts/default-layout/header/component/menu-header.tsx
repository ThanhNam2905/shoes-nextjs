import Link from 'next/link';
import { HiChevronDown } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { GoThreeBars } from "react-icons/go";
import { useRouter } from 'next/router';

export function MenuHeader(props) {

    const handlerClickMenuBars = () => {
        const navMenuMobile = document.querySelector(".mobile-menu-nav");
        navMenuMobile.classList.remove("hidden", "animate-slide-right");
        navMenuMobile.classList.add("fixed", "animate-slide-left");
    }
    const handlerCloseMenuMobile = () => {
        const navMenuMobile = document.querySelector(".mobile-menu-nav");
        navMenuMobile.classList.remove("fixed", "animate-slide-left");
        navMenuMobile.classList.add("hidden", "animate-slide-right");
    }

    const router = useRouter();
    const menus = [
        { label: "Trang chủ", path: '/home'},
        { label: "Sản phẩm", path: '/product' },
        { label: "Khuyến mãi", path: '/contact'},
        { label: "Liên hệ", path: '/about'},
    ]

    return (
        <> 
            {/* Navbar Desktop PC */}
            <nav className="flex items-center">
                <a href="#">
                    <img src="/assets/img/logo/logo.png" alt="Logo" className="w-20 lg:w-32 object-contain"/>
                </a>
                
                <ul className="hidden lg:flex ml-24 space-x-8 mb-0">
                    <li className="uppercase font-bold text-gray-800 text-16">
                        <Link href="/home">
                            <a className={`${router.pathname === '/home' ? "text-red-600" :"text-gray-800"}`}>Trang Chủ</a> 
                        </Link>
                    </li>
                    <li className="dropdown-menu uppercase font-bold text-gray-700 text-16 relative">
                        <Link href="/product">
                            <a className={`hover:text-red-600 flex items-center ${router.pathname === '/product' || router.pathname === '/product/[id]' ? "text-red-600" : "text-gray-800"}`}> 
                                Sản phẩm
                            </a>   
                        </Link>
                    </li>
                    
                    <li className="uppercase font-bold text-gray-700 text-16">
                        <Link href="/contact">
                            <a className={`hover:text-red-600 ${router.pathname === '/contact' ? "text-red-600" : "text-gray-800"}`}>Liên hệ</a> 
                        </Link>
                    </li>
                    
                </ul>    
            </nav>

            {/* Navbar Mobile */}
            <button onClick={() => handlerClickMenuBars()} className="mobile-menu-btn--bars block lg:hidden focus:outline-none order-first">
                <GoThreeBars className="w-8 h-8 p-0.5 border border-black rounded-md"/>
            </button>
            <nav className="mobile-menu-nav hidden top-0  bg-gray-200 w-11/12 max-w-full h-screen max-h-screen">
                    <button onClick={() => handlerCloseMenuMobile()} className="mobile-menu-btn--close border-2 border-gray-300 p-1 rounded-full absolute top-3 right-3 hover:bg-red-600 hover:border-red-600 focus:outline-none">
                        <IoClose className="text-black text-20 hover:text-white "/>
                    </button>

                    <ul className="pt-20 px-4 divide-y divide-gray-300">
                        <li className="py-3 text-gray-700 text-16 ">
                            <Link href="/home">
                                <a className="text-red-600">Trang Chủ</a> 
                            </Link>
                        </li>
                        <li className="py-3 text-gray-700 text-16">
                            <Link href="/contact">
                                <a className="hover:text-red-600 flex items-center justify-between">Sản phẩm
                                </a>
                            </Link>
                        </li>
                        <li className="py-3 text-gray-700 text-16">
                            <Link href="/contact">
                                <a className="hover:text-red-600">Giới thiệu</a> 
                            </Link>
                        </li>
                        <li className="py-3 text-gray-700 text-16">
                            <Link href="/contact">
                                <a className="hover:text-red-600">Liên Hệ</a> 
                            </Link>
                        </li>
                        <li className="py-3 text-gray-700 text-16">
                            <Link href="/about">
                                <a className="hover:text-red-600">About Us</a> 
                            </Link>
                        </li>
                    </ul>
                </nav>
            
        </>
    )
}