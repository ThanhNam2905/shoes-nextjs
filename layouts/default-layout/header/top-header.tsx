import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default function TopHeader(props) {
    return (
        <>
            <div className=" hidden md:block bg-gray-200 w-full h-8 px-14 text-14">
                <ul className="flex items-center justify-end space-x-6 pt-1">
                    <li>
                        <a href="#" className="border-r-2 border-gray-300 pr-3">Hotline: <span className="font-semibold hover:text-red-600 hover:underline">1800.0080</span></a>
                    </li>
                
                    <li className="hover:text-red-600 hover:underline">
                        <Link href="/register">
                            <a className="border-r-2 border-gray-300 pr-3 -ml-3">Đăng ký</a> 
                        </Link>
                    </li>
                    <li className="flex items-center space-x-1 hover:text-red-600 hover:underline">
                        <FaUserCircle className="w-3 h-3 -ml-3" />
                        <Link href="/login">
                            <a>Đăng nhập</a>
                        </Link>
                    </li>
                </ul>

            </div>
        </>
    )
}