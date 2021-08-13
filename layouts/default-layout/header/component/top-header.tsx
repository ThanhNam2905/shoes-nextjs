//NextJS
import { useRouter } from 'next/router';
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../../../store/GlobalState";// Global State
import Cookie from 'js-cookie'; // Cookie

// Andt Design
import 'antd/dist/antd.css';
import { Button, message } from 'antd';
import { 
  EditOutlined, UserOutlined, CloseCircleOutlined, MailOutlined,
  ShoppingCartOutlined, BellOutlined, LogoutOutlined
} from '@ant-design/icons';

import Dialog from "../../../../components/shared/utilities/dialog/dialog";
import FormUpdatePassword from "./FormUpdatePassword";
import FormUpdateInfo from "./FormUpdateInfo";

export default function TopHeader(props) {

  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  // Modal Antd and Message Antd
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showOpenModal = () => {
      setIsModalVisible(true);
  };

  // Dialog Component
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
  }
  const dialogRef = useRef(null);
  const [refReady, setRefReady] = useState(false)

  useEffect(() => {
    setRefReady(true)
  }, []);
  const handlerCloseDialog = () => {
    if (dialogRef.current.classList.contains("animate-slide-up")) {
      dialogRef.current.classList.remove("animate-slide-up");
      dialogRef.current.classList.add("animate-slide-down");
    }
    setTimeout(() => {
      closeModal();
    }, 500);
  }
  
  // Feature Logout User
  const key = 'updatable';
  const handlerLogout = () => {
    Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' });
    localStorage.removeItem('auth-login');
    dispatch({ type: 'AUTH', payload: {} });

    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({
        content: "Đăng xuất tài khoản thành công", key, duration: 3,
        style: {
          marginBottom: "10vh"
        }
      });
    }, 1000);

    router.replace('/login');
  }

  // Feature Update Username Profile
  const initialState = {
    avatar: "",
    username: "",
  }
  // console.log(auth.user);
  
  const [data, setData] = useState(initialState);
  const { avatar, username } = data;

  useEffect(() => {
    if (auth.user) {
      setData({ ...data, username: auth.user.username })
    }
  }, [auth.user]);

  return (
    <>
      <div className=" hidden md:block bg-gray-200 w-full h-11 px-14 text-14">
        <ul className="flex items-center justify-end space-x-6 h-full">
          <li>
            <span className="text-gray-800 hover: border-r-2 border-gray-300 pr-5">Hotline: <span className="font-semibold hover:underline hover:text-blue-500">1800.0080</span></span>
          </li>
          {Object.keys(auth).length > 0 ? (
            <>
              <li className="flex items-center">
                <img src={ auth.user.avatar } alt={ auth.user.avatar } className="w-8 object-contain mr-2 rounded-full" />
                <p className="mb-0 font-semibold cursor-pointer hover:text-blue-500 hover:underline" onClick={openModal}>
                  {username}
                </p>
              </li>
              {refReady &&
                <Dialog showModal={showModal}
                  closeModal={handlerCloseDialog}
                  className="w-108 animate-slide-up h-full fixed top-0 right-0 z-50 bg-white"
                  target={dialogRef}>
                  <div className="flex items-center justify-between py-0 px-6 border-b border-gray-200 mb-2">
                    <p className="text-gray-900 text-16 mt-2 font-semibold">Thông tin tài khoản</p>
                    <i className="text-2xl cursor-pointer hover:text-red-600" onClick={() => handlerCloseDialog()}><CloseCircleOutlined /></i>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    
                      {/* Component Update Info (username and avatar) */}
                      <FormUpdateInfo avatar={data.avatar}
                                      username={data.username}
                                      auth={auth}
                                      dispatch={dispatch}
                                      data={data}
                                      setData={setData}/>
                    

                    <div className="grid grid-cols-8 w-full px-8 mt-5">
                      <i className="col-span-1"><MailOutlined className="text-20 mt-0.5" /></i>
                      <span className="col-span-7 text-16 font-semibold">{auth.user?.email}</span>
                    </div>

                    <div className="grid grid-cols-8 w-full px-8 mt-5">
                      <i className="col-span-1"><ShoppingCartOutlined className="text-20 mt-0.5" /></i>
                      <Link href="/order">
                        <a className="col-span-7 text-16 font-semibold text-gray-900 hover:underline" onClick={() => handlerCloseDialog()}>Lịch sử đơn hàng</a>
                      </Link>  
                    </div>

                    <div className="grid grid-cols-8 w-full px-8 mt-5">
                      <i className="col-span-1"><BellOutlined className="text-20 mt-0.5" /></i>
                      <span className="col-span-7 text-16 font-semibold">Thông báo</span>
                    </div>

                    <div className="grid grid-cols-8 w-full px-8 mt-5 text-red-600 hover:underline">
                      <i className="col-span-1"><LogoutOutlined className="text-20 mt-0.5" /></i>
                      <span className="col-span-7 text-16 font-semibold cursor-pointer" onClick={() => handlerLogout()}>Đăng xuất</span>
                    </div>
                    <div className="w-full px-8 mt-5">
                      <Button className="w-full"
                          type="primary"
                          onClick={showOpenModal}>
                          Đổi mật khẩu
                      </Button>
                      {/* Component UpdatePassword */}
                      <FormUpdatePassword  
                          auth={auth}
                          data={data}
                          setData={setData}
                          isModalVisible={isModalVisible}
                          setIsModalVisible={setIsModalVisible}/>
                    </div>
                  </div>
                </Dialog>
              }
            </>
          ) : (
            <>
              <li className="hover:text-red-600 hover:underline">
                <Link href="/register">
                  <a className={`flex items-center space-x-1 border-r-2 border-gray-300 pr-3 -ml-3 text-gray-900 ${router.pathname === '/register' ? "text-red-600" : ""}`}>
                    <EditOutlined className="text-16" />
                    <span className="font-semibold">Đăng ký</span>
                  </a>
                </Link>
              </li>
              <li className="flex items-center space-x-1 hover:text-red-600 hover:underline">
                <Link href="/login">
                  <a className={`flex items-center space-x-1 text-gray-900 ${router.pathname === '/login' ? "text-red-600" : ""}`}>
                    <UserOutlined className="text-16 -ml-3" />
                    <span className="font-semibold">Đăng nhập</span>
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