import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import validate from '../../../utils/validate';
import { useToasts } from 'react-toast-notifications';
import { postData } from '../../../utils/fetchData/userData';
import Breadcrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";

interface RegisterType {
    username?: string;
    email?: string;
    phone?: number;
    address?: string;
    password?: string;
    confirm_password?: string;
}

export default function RegisterPage({
    username = '',
    email = '',
    phone,
    address = '',
    password = '',
    confirm_password = ''
    }: RegisterType) {

    const [userData, setUserData] = useState({ username, email, phone, address, password, confirm_password});

    const handlerChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name] : value })
    }

    const { addToast } = useToasts();

    const handlerSubmit_Register = async (e) => {
        e.preventDefault();
        // console.log(userData);
        const { username, email, phone, address, password, confirm_password } = userData;
        const errorMsg = validate(username, email, phone, address, password, confirm_password);

        if(errorMsg) {
            addToast(errorMsg, { appearance: "error" });
        }
        else {
            const res = await postData('auth/register', userData);
            if(res.err) {
                addToast(res.err, { appearance: "error" });
            }
            else {
                addToast(res.msg, { appearance: "success"});
            }
        }
    }

    const [breadcrumbs, setBreadcrumbs] = useState([
        { href: "/home", label: "Trang chủ"},
        { label: "Đăng ký"}
    ]);

    return (
        <>
            <Head>
                <title>SignUp Page</title>
            </Head>

            {/* Breadcrumb */}
            <Breadcrumbs title="Đăng Ký" breadcrumbs={breadcrumbs}/>
            
            <div className="w-3/5 mx-auto my-16">
                <h3 className="text-26 mb-6 capitalize">Đăng ký</h3>
                <div className="border-2 border-gray-400 p-6">
                    <form method="POST" className="" onSubmit={handlerSubmit_Register}>
                        <h4 className="text-18 border-b-2 border-gray-400 pb-2 mb-6">Thông tin cá nhân</h4>
                        <div className="flex items-center mb-4">
                            <label className="w-1/5 text-16">Họ Tên: </label>
                            <input type="text" id="username" name="username" value={userData.username} onChange={handlerChangeInput} className="w-4/5 border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Họ tên hiển thị" />
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/5 text-16">Địa chỉ E-Mail: </label>
                            <input type="email" id="email" name="email" value={userData.email} onChange={handlerChangeInput} className="w-4/5 border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Địa chỉ E-Mail" />
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/5 text-16">Điện Thoại: </label>
                            <input type="text" id="phone" name="phone" value={userData.phone} onChange={handlerChangeInput} className="w-4/5 border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Điện Thoại" />
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/5 text-16">Địa chỉ nhận hàng: </label>
                            <input type="text" id="address" name="address" value={userData.address} onChange={handlerChangeInput} className="w-4/5 border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Địa chỉ nhận hàng" />
                        </div>

                        <h4 className="text-18 border-b-2 border-gray-400 pb-2 mb-6">Mật khẩu</h4>

                        <div className="flex items-center mb-4">
                            <label className="w-1/5 text-16">Mật Khẩu: </label>
                            <input type="password" id="password" name="password" value={userData.password} onChange={handlerChangeInput} className="w-4/5 border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Mật Khẩu" />
                        </div>
                        <div className="flex items-center mb-4">
                            <label className="w-1/5 text-16">Nhập lại Mật Khẩu:</label>
                            <input type="password" id="confirm_password" name="confirm_password" value={userData.confirm_password} onChange={handlerChangeInput} className="w-4/5 border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Nhập lại Mật Khẩu" />
                        </div>

                        <div className="flex items-center justify-between">
                            <p>Nếu bạn đã đăng ký tài khoản, vui lòng đăng nhập <Link href="/login"><a className="text-red-600 hover:underline">Tại Đây.</a></Link></p>
                            
                            <div className="flex items-center">
                                <input type="submit" value="Đăng ký" className="btn text-white bg-red-600 hover:bg-gray-900 px-5 tracking-wider py-2 mt-2.5 ml-3" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}