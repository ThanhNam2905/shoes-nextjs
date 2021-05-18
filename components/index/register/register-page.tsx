import Link from "next/link";
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import validate from '../../../utils/validate';
import { useToasts } from 'react-toast-notifications';
import { postData } from '../../../utils/fetchData';
import { useRouter } from "next/router";
import { DataContext } from "../../../store/GlobalState";

interface RegisterType {
    username?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirm_password?: string;
}

export default function RegisterPage({
    username = '',
    email = '',
    phone = '',
    password = '',
    confirm_password = ''
    }: RegisterType) {

    const [userData, setUserData] = useState({ username, email, phone, password, confirm_password});
    const { addToast } = useToasts();
    const { state } = useContext(DataContext);
    const { auth } = state;
    const router = useRouter();

    const handlerChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name] : value })
    }

    const handlerSubmit_Register = async (e) => {
        e.preventDefault();

        const { username, email, phone, password, confirm_password } = userData;
        const errorMsg = validate(username, email, phone, password, confirm_password);

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

    useEffect(() => {
        if(Object.keys(auth).length !== 0) {
            router.push('/cart');
        }
    }, [auth]);

    return (
        <>
            <Head>
                <title>Trang Đăng Ký</title>
            </Head>

            <div className="relative w-full py-32 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
                <div className="absolute z-20 top-24 left-1/2 transform -translate-x-1/2 text-24 font-semibold bg-white px-12 py-3 rounded-md shadow-2xl ring-2 ring-gray-100 ring-opacity-10 capitalize">Đăng ký</div>
                <div className="w-1/3 bg-white mx-auto rounded-xl shadow-xl ring-8 ring-gray-100 ring-opacity-10 p-8">
                    <form method="POST" onSubmit={handlerSubmit_Register}>
                        <div className="flex flex-col mb-4 w-full mt-8">
                            <label className="text-15 text-left mb-2">Họ và tên <span className="text-red-600">*</span></label>
                            <input type="text" id="username" name="username" value={userData.username} onChange={handlerChangeInput} className="border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Họ tên hiển thị" />
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="text-15 text-left mb-2">Địa chỉ E-Mail <span className="text-red-600">*</span></label>
                            <input type="email" id="email" name="email" value={userData.email} onChange={handlerChangeInput} className="border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Địa chỉ E-Mail" />
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="text-15 text-left mb-2">Số Điện Thoại <span className="text-red-600">*</span></label>
                            <input type="text" id="phone" name="phone" value={userData.phone} onChange={handlerChangeInput} className="border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Điện Thoại" />
                        </div>

                        <div className="flex flex-col mb-4 w-full">
                            <label className="text-15 text-left mb-2">Mật Khẩu <span className="text-red-600">*</span></label>
                            <input type="password" id="password" name="password" value={userData.password} onChange={handlerChangeInput} className="border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Mật Khẩu" />
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="text-15 text-left mb-2">Nhập lại Mật Khẩu <span className="text-red-600">*</span></label>
                            <input type="password" id="confirm_password" name="confirm_password" value={userData.confirm_password} onChange={handlerChangeInput} className="border border-gray-300 py-2 rounded px-3  focus:ring-1 focus:ring-green-400 focus:border-transparent" placeholder="Nhập lại Mật Khẩu" />
                        </div>

                        <div className="flex flex-col items-center mb-6 w-full">
                            <input type="submit" value="Đăng ký" className="btn w-full text-white bg-red-600 hover:bg-gray-900 px-5 tracking-wider py-2 mt-2.5 rounded" />
                            <p className="text-gray-500 text-15 mt-4">Nếu bạn đã đăng ký tài khoản, vui lòng đăng nhập <Link href="/login"><a className="text-red-600 hover:underline font-semibold">Tại Đây.</a></Link></p>
                        </div>

                    </form>
                </div>
                <div className="absolute top-1/3 -right-64 transform rotate-45 rounded-3xl bg-purple-600 w-2/6 h-2/4 bg-opacity-30"></div>
            </div>
            
        </>
    )
}