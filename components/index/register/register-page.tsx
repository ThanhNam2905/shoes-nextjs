import Link from "next/link";
import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import validate from '../../../utils/validate';
import { postData } from '../../../utils/fetchData';
import { useRouter } from "next/router";
import { DataContext } from "../../../store/GlobalState";
import { message } from 'antd'; // Ant Design
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
            message.error(errorMsg);
        }
        else {
            const res = await postData('auth/register', userData);
            if(res.err) {
                message.error(res.err);
            }
            else {
                message.success(res.msg);
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
                        <div className="mt-5">
                            <h4>Họ và tên <span className="text-red-600 ml-1">*</span></h4>
                            <div className="relative mb-4 w-full h-12 mt-2">
                                <input  type="text" name="username" id="username"
                                        placeholder=" "
                                        value={userData.username} onChange={handlerChangeInput} 
                                        className="form__input absolute top-0 left-0 border-2 focus:border-green-400 border-gray-300 w-full h-full outline-none rounded px-3" 
                                        />
                                <label className="form__label absolute left-3 top-3 text-15 px-2 cursor-text font-semibold text-gray-500 bg-white">Username...</label>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h4>Địa chỉ Email <span className="text-red-600 ml-1">*</span></h4>
                            <div className="relative mb-4 w-full h-12 mt-2">
                                <input  type="email" name="email" id="email"
                                        placeholder=" "
                                        value={userData.email} onChange={handlerChangeInput} 
                                        className="form__input absolute top-0 left-0 border-2 focus:border-green-400 border-gray-300 w-full h-full outline-none rounded px-3" 
                                        />
                                <label className="form__label absolute left-3 top-3 text-15 px-2 cursor-text font-semibold text-gray-500 bg-white">Email...</label>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h4>Số Điện Thoại <span className="text-red-600 ml-1">*</span></h4>
                            <div className="relative mb-4 w-full h-12 mt-2">
                                <input  type="text" name="phone" id="phone"
                                        placeholder=" "
                                        value={userData.phone} onChange={handlerChangeInput} 
                                        className="form__input absolute top-0 left-0 border-2 focus:border-green-400 border-gray-300 w-full h-full outline-none rounded px-3" 
                                        />
                                <label className="form__label absolute left-3 top-3 text-15 px-2 cursor-text font-semibold text-gray-500 bg-white">Number phone...</label>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h4>Mật Khẩu <span className="text-red-600 ml-1">*</span></h4>
                            <div className="relative mb-4 w-full h-12 mt-2">
                                <input  type="password" name="password" id="password"
                                        placeholder=" "
                                        value={userData.password} onChange={handlerChangeInput} 
                                        className="form__input absolute top-0 left-0 border-2 focus:border-green-400 border-gray-300 w-full h-full outline-none rounded px-3" 
                                        />
                                <label className="form__label absolute left-3 top-3 text-15 px-2 cursor-text font-semibold text-gray-500 bg-white">Password...</label>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h4>Nhập lại Mật Khẩu <span className="text-red-600 ml-1">*</span></h4>
                            <div className="relative mb-4 w-full h-12 mt-2">
                                <input  type="password" name="confirm_password" id="confirm_password"
                                        placeholder=" "
                                        value={userData.confirm_password} onChange={handlerChangeInput} 
                                        className="form__input absolute top-0 left-0 border-2 focus:border-green-400 border-gray-300 w-full h-full outline-none rounded px-3" 
                                        />
                                <label className="form__label absolute left-3 top-3 text-15 px-2 cursor-text font-semibold text-gray-500 bg-white">Confirm password...</label>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mb-6 w-full">
                            <input type="submit" value="Đăng ký" className="btn w-full btn-hover-effect-1 text-white tracking-wider py-3 text-18 mt-3 rounded" />
                            <p className="text-gray-500 text-15 mt-4">Nếu bạn đã đăng ký tài khoản, vui lòng đăng nhập <Link href="/login"><a className="text-red-600 hover:underline font-semibold">Tại Đây.</a></Link></p>
                        </div>

                    </form>
                </div>
                <div className="absolute top-1/3 -right-64 transform rotate-45 rounded-3xl bg-purple-600 w-2/6 h-2/4 bg-opacity-30"></div>
            </div>
            
        </>
    )
}