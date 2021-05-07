import { BsSearch } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import Link from 'next/link';
import { useContext } from "react";
import { DataContext } from "../../../store/GlobalState";

export function HeaderUser(props) {

    const INPUTSEARCHCLASS = `hidden lg:block w-80 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 py-1.5 px-3 text-14 text-black placeholder-black rounded-md`;
    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;

    return (
        <>
            <div>
                <ul className="flex items-center lg:space-x-6">
                    
                    <input type="text" placeholder="Search product here ..." className={` ${INPUTSEARCHCLASS}`} />

                    <li className="flex items-center space-x-1.5 md:space-x-2.5 lg:space-x-7">
                        <i className="icon__search">
                            <BsSearch className="cursor-pointer w-5 lg:w-6 h-5 lg:h-6 text-gray-500 hover:text-red-600 transition ease-linear duration-200"/>
                        </i>

                        <Link href="/cart">
                            <i className="icon__add-to-cart flex items-center relative cursor-pointer transition ease-in duration-500">
                                <FiShoppingBag className="z-10 w-6 md:w-7 lg:w-8 h-6 md:h-7 lg:h-8 text-gray-500 hover:text-red-600 transition ease-linear duration-200"/>
                                <span className="absolute z-20 -top-2 -right-1.5 px-1.5 text-white text-14 bg-red-600 rounded-full">{ cart.length }</span>
                                <div className="alt--cart hidden absolute -bottom-6 left-2 text-14 border border-gray-700 px-1 rounded">Cart</div>
                            </i>
                        </Link>
                        

                        <i className="icon__notification">
                            <FaRegBell className="cursor-pointer w-5 lg:w-6 h-5 lg:h-6 text-gray-500 hover:text-red-600 transition ease-linear duration-200"/>
                        </i>
                        
                       
                    </li>
                    
                </ul>
            </div>
        </>
    )
}