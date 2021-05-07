import Link from 'next/link';
import { HiChevronDown } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { GoThreeBars } from "react-icons/go";
import { useRouter } from 'next/router';



export function MenuHeader(props) {

    // useEffect(() => {
    //     const btnBarsMenuMobile = document.querySelector(".mobile-menu-btn--bars");
    //     const btnCloseMenuMobile = document.querySelector(".mobile-menu-btn--close");
    //     const navMenuMobile = document.querySelector(".mobile-menu-nav");

    //     btnBarsMenuMobile.addEventListener("click", () => {
    //         navMenuMobile.classList.remove("hidden");
    //         navMenuMobile.classList.add("fixed");
    //     });
    // }, []);

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
        { label: "Trang chủ", path: '/home', icon: '', dropdown: false  },
        { label: "Sản phẩm", path: '/product',icon: <HiChevronDown/>, dropdown: true },
        { label: "Khuyến mãi", path: '/contact', icon: '', dropdown: false  },
        { label: "Liên hệ", path: '/about', icon: '', dropdown: false  },
    ]

    // const dropdownMenu = [
    //     { label: "Nike", path: '/product' },
    //     { label: "Vans", path: '/product' },
    //     { label: "COnverse", path: '/product' },
    //     { label: "Nike", path: '/product' },
    // ]

    return (
        <> 
            {/* Navbar Desktop PC */}
            <nav className="flex items-center">
                <a href="#">
                    <img src="/assets/img/logo/logo.png" alt="Logo" className="w-20 lg:w-32 object-contain"/>
                </a>
                
                <ul className="hidden lg:flex ml-24 space-x-8">
                    {/* {
                        menus.map((menu, index) => (
                            <li key={index} className="uppercase font-bold text-gray-700 text-16">
                                <Link href={menu.path}>
                                    <a className={`hover:text-red-600 flex items-center ${router.pathname === menu.path ? "text-red-600" : ""}`}>
                                        <span>{menu.label}</span>
                                        <i className="text-18 mt-1">{menu.icon}</i>
                                    </a>
                                </Link>
                            </li>
                        ))
                    } */}
                    <li className="uppercase font-bold text-gray-700 text-16">
                        <Link href="/home">
                            <a className={`${router.pathname === '/home' ? "text-red-600" :""}`}>Trang Chủ</a> 
                        </Link>
                    </li>
                    <li className="dropdown-menu uppercase font-bold text-gray-700 text-16 relative">
                        <Link href="/product">
                            <a className={`hover:text-red-600 flex items-center ${router.pathname === '/product' || router.pathname === '/product/[id]' ? "text-red-600" : ""}`}> 
                                Sản phẩm
                                <HiChevronDown className="text-18 mt-1"/>
                            </a>   
                        </Link>
                        <div className="bg-transparent w-16 h-4 absolute -left-2"></div>
                        <div className="dropdown-block hidden opacity-20 justify-between w-112 absolute top-9 -left-24 z-20 px-6 py-8 bg-white bg-opacity-80 shadow-md rounded-sm border-t-2 border-gray-100">
                            <ul className="font-normal">
                                <Link href="/product">
                                    <a className="text-15 mb-2.5 inline-block hover:text-red-600 hover:underline">Nike</a>    
                                </Link>
                                <li className="mb-1">
                                    <a href="#" className="capitalize text-14 hover:text-red-600 hover:underline">Nike SB Dunk</a>
                                </li>
                                <li className="mb-1">
                                    <a href="#" className="capitalize text-14 hover:text-red-600 hover:underline">Nike Air Jordan</a>
                                </li>
                                <li className="mb-1">
                                    <a href="#" className="capitalize text-14 hover:text-red-600 hover:underline">Nike Blazer Mid</a>
                                </li>
                            </ul>
                            <ul className="font-normal">
                                <a href="#" className="text-15 mb-2.5 inline-block hover:text-red-600 hover:underline">Vans</a>
                                <li className="mb-1">
                                    <a href="#" className="capitalize text-14 hover:text-red-600 hover:underline">All Vans</a>
                                </li>
                                <li className="mb-1">
                                    <a href="#" className="capitalize text-14 hover:text-red-600 hover:underline">Vans Classic</a>
                                </li>
                                <li className="mb-1">
                                    <a href="#" className="capitalize text-14 hover:text-red-600 hover:underline">Vans Old Skool</a>
                                </li>  
                            </ul>
                            <ul className="font-normal">
                                <a href="#" className="text-15 mb-2.5 inline-block hover:text-red-600 hover:underline">Sale</a>
                                <li className="mb-1">
                                    <a href="#" className="capitalize text-14 hover:text-red-600 hover:underline">Sale Sneaker</a>
                                </li> 
                                <li className="mb-1">
                                    <a href="#" className="capitalize text-14 hover:text-red-600 hover:underline">Sale Clothing</a>
                                </li>
                                <li className="mb-1">
                                    <a href="#" className="capitalize text-14 hover:text-red-600 hover:underline">All Sale</a>
                                </li> 
                            </ul>
                        </div>
                    </li>
                    
                    <li className="uppercase font-bold text-gray-700 text-16">
                        <Link href="/contact">
                            <a className={`hover:text-red-600 ${router.pathname === '/contact' ? "text-red-600" : ""}`}>Khuyến mãi</a> 
                        </Link>
                    </li>
                    <li className="uppercase font-bold text-gray-700 text-16">
                        <Link href="/about">
                            <a className={`hover:text-red-600 ${router.pathname === '/about' ? "text-red-600" : ""}`}>Liên Hệ</a> 
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
                                    <HiChevronDown className="text-18 mt-1"/> 
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