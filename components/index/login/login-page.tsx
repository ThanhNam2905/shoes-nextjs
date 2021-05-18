import Link from "next/link";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { postData } from "../../../utils/fetchData";
import Cookie from 'js-cookie';
import { DataContext } from "../../../store/GlobalState";
import { useRouter } from "next/router";

export default function LoginPage(props) {

    const initialState = { email: "", password: ""};
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;
    const { state, dispatch } = useContext(DataContext);
    const { auth } = state;
    const { addToast } = useToasts();
    const router = useRouter();

    const [breadcrumbs, setBreadcrumbs] = useState([
        { href: "/home", label: "Trang chủ"},
        { label: "Đăng nhập"}
    ]);

    const handlerChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const handlerSubmit_Login = async (e) => {
        e.preventDefault();
        
        const res = await postData('auth/login', userData);
        
        if(res.err) {
            addToast(res.err, { appearance: "error"});
        }
        else {
            addToast(res.msg, { appearance: "success"});
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
        if(Object.keys(auth).length !== 0) {
            router.push('/cart');
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
                    <form method="POST" onSubmit={handlerSubmit_Login}>
                        <div className="flex flex-col mb-4 w-full mt-10">
                            <label className="text-15 text-left mb-2">Địa chỉ Email <span className="text-red-600">*</span></label>
                            <input type="email" name="email" value={email} onChange={handlerChangeInput} className="border border-gray-200 py-2.5 w-full rounded px-3" placeholder="Địa chỉ Email"/>
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="text-15 text-left mb-2">Mật khẩu <span className="text-red-600">*</span></label>
                            <input type="password" name="password" value={password} onChange={handlerChangeInput} className="border border-gray-200 py-2.5 w-full rounded px-3" placeholder="Mật khẩu"/>
                        </div>
                        <div className="flex flex-col items-center mb-8 w-full">
                            <input type="submit" value="Đăng nhập" className="btn w-full text-white bg-red-600 hover:bg-gray-900 px-5 tracking-wider py-2 mt-2.5 rounded" />
                            <p className="text-gray-500 text-15 mt-4">Bạn chưa có tài khoản, vui lòng đăng ký <Link href="/login"><a className="text-red-600 font-semibold hover:underline">Tại Đây.</a></Link></p>
                            <button className="text-red-600 font-semibold mt-3">Quên mật khẩu?</button>
                        </div>
                    </form>
                </div>
                <div className="absolute top-1/4 -right-48 transform rotate-45 rounded-3xl bg-purple-600 w-1/4 h-3/5 bg-opacity-30"></div>
            </div>
            
        </>
    )
}