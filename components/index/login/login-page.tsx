import Link from "next/link";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { postData } from "../../../utils/fetchData";
import Cookie from 'js-cookie';
import { DataContext } from "../../../store/GlobalState";
import { useRouter } from "next/router";
//Ant Design
import { message } from 'antd';

export default function LoginPage(props) {

    const initialState = { email: "", password: ""};
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;
    const { state, dispatch } = useContext(DataContext);
    const { auth } = state;
    const router = useRouter();

    const handlerChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handlerSubmit_Login = async (e) => {
        e.preventDefault();
        const res = await postData('auth/login', userData);
        if(res.err) {
            message.error(res.err);
        }
        else {
            message.success(res.msg)
        }

        dispatch({ type: 'AUTH', payload: {
            token: res.access_token,
            user: res.user
        }})

        Cookie.set('refreshtoken', res.refresh_token, {
            path: 'api/auth/accessToken',
            expires: 7
        })
        localStorage.setItem('auth-login', new Boolean(true).toString());
    }

    useEffect(() => {
        router.prefetch("/cart");
        router.prefetch("/admin");
    }, []);

    useEffect(() => {
        if(Object.keys(auth).length !== 0 && auth.user.role === "user") {
            router.push('/cart');
        }
        else if(Object.keys(auth).length !== 0 && auth.user.role === "admin") {
            router.push('/admin');
        }
    }, [auth]);

    return (
        <>
            <Head>
                <title>Trang Đăng Nhập</title>
            </Head>
            
            {/* Login Content */}
            <div className="relative w-full py-32 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
                <div className="absolute z-20 top-24 left-1/2 transform -translate-x-1/2 text-24 font-semibold bg-white px-12 py-3 rounded-md shadow-2xl ring-2 ring-gray-100 ring-opacity-10 capitalize">Đăng nhập</div>
                <div className="w-1/3 bg-white mx-auto rounded-xl shadow-xl ring-8 ring-gray-100 ring-opacity-10 p-8">
                    <form method="POST" onSubmit={handlerSubmit_Login} >
                        <div className="mt-8">
                            <h4>Địa chỉ Email <span className="text-red-600 ml-1">*</span> </h4>
                            <div className="relative mb-4 w-full h-12 mt-2">
                                <input  type="email" name="email"
                                        placeholder=" "
                                        value={email} onChange={handlerChangeInput} 
                                        className="form__input absolute top-0 left-0 border-2 focus:border-green-400 border-gray-300 w-full h-full outline-none rounded px-3" 
                                        />
                                <label className="form__label absolute left-3 top-3 text-15 px-2 cursor-text font-semibold text-gray-500 bg-white">Email</label>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4>Mật khẩu <span className="text-red-600 ml-1">*</span> </h4>
                            <div className="relative mb-4 w-full h-12 mt-2">
                                <input  type="password" name="password"
                                        placeholder=" "
                                        value={password} onChange={handlerChangeInput} 
                                        className="form__input absolute top-0 left-0 border-2 focus:border-green-400 border-gray-300 w-full h-full outline-none rounded px-3" 
                                        />
                                <label className="form__label absolute left-3 top-3 text-15 px-2 cursor-text font-semibold text-gray-500 bg-white">Password</label>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-center mb-8 w-full">
                            <input type="submit" value="Đăng nhập" className="btn btn-hover-effect-1 text-18 text-white tracking-wider py-3 mt-5 rounded" />
                            <p className="text-gray-500 text-15 mt-4">Bạn chưa có tài khoản, vui lòng đăng ký <Link href="/register"><a className="text-red-600 font-semibold hover:underline">Tại Đây.</a></Link></p>
                            <button className="text-red-600 font-semibold">Quên mật khẩu?</button>
                        </div>
                    </form>
                </div>
                <div className="absolute top-1/4 -right-48 transform rotate-45 rounded-3xl bg-purple-600 w-1/4 h-3/5 bg-opacity-30"></div>
            </div>
            
        </>
    )
}