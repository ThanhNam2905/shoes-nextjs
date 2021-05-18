import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, Fragment } from "react";
import { DataContext } from "../../../store/GlobalState";
import { BiChevronDown } from "react-icons/bi";
import { Menu, Transition } from '@headlessui/react';
import Cookie from 'js-cookie';
import { useToasts } from 'react-toast-notifications';

export default function TopHeader(props) {

    const router = useRouter();

    const { state, dispatch } = useContext(DataContext);
    const { auth } = state;
    const { addToast } = useToasts();

    const handlerLogout = () => {
      Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' });
      localStorage.removeItem('auth-login');
      dispatch({ type: 'AUTH', payload: {}});
      addToast("Đăng xuất thành công", { appearance: "success"});
    }
    
    return (
        <>
            <div className=" hidden md:block bg-gray-200 w-full h-11 px-14 text-14">
                <ul className="flex items-center justify-end space-x-6 h-full">
                    <li>
                        <a href="#" className="border-r-2 border-gray-300 pr-3">Hotline: <span className="font-semibold hover:text-red-600 hover:underline">1800.0080</span></a>
                    </li>

                    {   Object.keys(auth).length > 0 ? (
                      <Menu as="div" className="relative inline-block">
                        <div>
                          <Menu.Button className="flex items-center justify-center py-2 text-sm font-semibold rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                            <img src={auth.user.avatar} alt={auth.user.avatar}  className="w-7 object-contain mr-1"/>
                            <span>{ auth.user.username }</span>
                            <BiChevronDown
                              className="w-5 h-5 -mr-2 text-violet-200 hover:text-violet-100"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute z-100 text-14 font-semibold -right-1 whitespace-nowrap px-3 py-2 -mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-2 ring-blue-500 ring-opacity-5 focus:outline-none">
                            <div className="py-3">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                  className={`${active && 'bg-blue-200'} py-1.5 px-2 rounded`}
                                  href="/account-settings"
                                >
                                  Thông tin tài khoản
                                </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-3">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                  className={`${active && 'bg-blue-200'} py-1.5 px-2 rounded`}
                                  href="/account-settings"
                                >
                                  Lịch sử đơn hàng
                                </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-3">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                  className={`${active && 'bg-blue-200'} py-1.5 px-2 rounded`}
                                  href="/account-settings"
                                >
                                  Thông báo
                                </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-3">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={`${active && 'bg-blue-200'} py-1.5 px-2 rounded`}
                                    onClick={() => handlerLogout()}
                                  >
                                    Đăng xuất
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                              
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      ) : (
                        <>
                          <li className="hover:text-red-600 hover:underline">
                            <Link href="/register">
                                <a className={`border-r-2 border-gray-300 pr-3 -ml-3 ${router.pathname === '/register' ? "text-red-600" : ""}`}>
                                    <span>Đăng ký</span>
                                </a> 
                            </Link>
                          </li>
                          <li className="flex items-center space-x-1 hover:text-red-600 hover:underline">
                              <Link href="/login">
                                  <a className={`flex items-center space-x-1 ${router.pathname === '/login' ? "text-red-600" : ""}`}>
                                      <FaUserCircle className="w-3 h-3 -ml-3" />
                                      <span>Đăng nhập</span>
                                  </a>
                              </Link>
                          </li>
                        </>
                      )
                    }  
                </ul>

            </div>
        </>
    )
}