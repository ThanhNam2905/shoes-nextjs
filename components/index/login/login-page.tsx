import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { postData } from "../../../utils/fetchData/userData";
import validate from "../../../utils/validate";
import Cookie from 'js-cookie';
import Breadcrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";

interface LoginType {
    email?: string;
    password?: string;
}

export default function LoginPage({
    email =  '', 
    password = ''}
    : LoginType) {

    const [userData, setUserData] = useState({email, password});

    const handlerChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }

    const { addToast } = useToasts();

    const handlerSubmit_Login = (e) => {
        e.preventDefault();
        // console.log(userData);
        const { email, password } = userData;
        
        // const res = postData('auth/login', userData);
        // console.log(res);
        
        // if(res.err) {
        //     addToast(res.err, { appearance: "error"});
        // }
        // else {
        //     addToast(res.msg, { appearance: "success"});
        // }

        // Cookie.set('refreshtoken', res.refresh_token, {
        //     path: 'api/auth/accessToken',
        //     expires: 7
        // })
    }

    const [breadcrumbs, setBreadcrumbs] = useState([
        { href: "/home", label: "Trang chủ"},
        { label: "Đăng nhập"}
    ]);

    return (
        <>
            <Head>
                <title>SignIn Page</title>
            </Head>
            {/* Breadcrumb */}
            <Breadcrumbs title="Đăng nhập" breadcrumbs={breadcrumbs}/>

            {/* Login Content */}
            <div className="grid grid-cols-2 gap-6 px-14 py-20">
                <div className="">
                    <h3 className="text-26 mb-6 capitalize">Khách hàng mới</h3>
                    <div className="border-2 border-gray-100 p-5 h-80 max-h-80">
                        <p className="text-18 mb-2 leading-7">Bằng cách tạo tài khoản bạn có thể mua sắm nhanh hơn, cập nhật trạng thái đơn hàng, theo dõi đơn hàng và đặc biệt là được hưởng nhiều khuyến mãi!</p>
                        <Link href="/register">
                            <a className="btn btn--login hover:bg-gray-900 hover:border-gray-900 mt-4">Đăng ký</a>
                        </Link> 
                    </div> 
                </div>
                <div >
                    <h3 className="text-26 mb-6 capitalize">Đăng nhập</h3>
                    <div className="border-2 border-gray-100 p-5 h-80 max-h-80">
                        <form method="POST" className="" onSubmit={handlerSubmit_Login}>
                            <div>
                                <label className="block text-18 mb-2">Địa chỉ Email *</label>
                                <input type="email" name="email" value={userData.email} onChange={handlerChangeInput} className="border border-gray-200 py-2.5 w-full rounded px-3 mb-4" placeholder="Địa chỉ Email"/>
                            </div>
                            <div>
                                <label className="block text-18 mb-2">Mật khẩu *</label>
                                <input type="password" name="password" value={userData.password} onChange={handlerChangeInput} className="border border-gray-200 py-2.5 w-full rounded px-3 mb-4" placeholder="Mật khẩu"/>
                            </div>
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-red-600 hover:underline">Quên mật khẩu?</a>
                                <div className="flex items-center">
                                    <input type="checkbox" name="checked" id="" className="mt-0.5 mr-1.5"/>
                                    <p className="hover:text-red-600">Ghi nhớ đăng nhập</p>
                                    <input type="submit" value="Login" className="btn btn--signup hover:bg-gray-900 hover:border-gray-900 mt-2.5 ml-3" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}