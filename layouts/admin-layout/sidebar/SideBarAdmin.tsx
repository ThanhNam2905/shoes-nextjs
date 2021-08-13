// Ant Design
import { Collapse, message } from 'antd'; 
import { CaretDownOutlined, HomeOutlined, AppstoreOutlined, IdcardOutlined,
    LogoutOutlined, FilePptOutlined, UnorderedListOutlined, FileAddOutlined, 
    ShoppingCartOutlined, UsergroupAddOutlined, ShopOutlined
} from '@ant-design/icons';
const { Panel } = Collapse;
import Cookie from 'js-cookie';
import Link from "next/link";
import { useContext } from 'react';
import { DataContext } from '../../../store/GlobalState';
import { useRouter } from 'next/router';


export default function SideBarAdmin(props) {

    const { state, dispatch } = useContext(DataContext);
    const { auth } = state;
    const router = useRouter();

    const key = 'updatable';
    const handlerLogout = () => {
        Cookie.remove('refreshtoken', { path: 'api/auth/accessToken'});
        localStorage.removeItem("auth-login");
        dispatch({ type: "AUTH", payload: {}});

        message.loading({ content: 'Loading...', key});
        setTimeout(() => {
            message.success({
                content: "Đăng xuất tài khoản thành công", key, duration: 3,
                style: {
                    marginBottom: "10vh"
                }
            })
        }, 1000);
        router.replace('/login');
    }

    return (
        <>
            <div className="siderbar-admin__content px-2 py-6">
                <Collapse 
                    expandIconPosition="right" 
                    ghost 
                    accordion
                    expandIcon={({ isActive}) => (<CaretDownOutlined width={10} rotate={ isActive ? 180 : 0}/>)}
                    >
                        
                        <Panel  header= {<div className="ant-collapse-custom flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                            <i className="inline-block -mt-1.5"><HomeOutlined className="text-18"/></i>
                                            <p className="mb-0 text-16">Dashboard Admin</p>
                                        </div>} 
                                key="1"
                                className="panel-item__customize">
                                    
                                    <Link href="/admin">
                                        <a className="text-16 text-gray-600 mb-4 ml-10 flex items-center">
                                            <AppstoreOutlined className="mt-0.5"/>
                                            <span className="ml-1.5">Home</span>
                                        </a>
                                    </Link>
                                    <Link href="/admin/profile">
                                        <a className="text-16 text-gray-600 mb-4 ml-10 flex items-center">
                                            <IdcardOutlined className="mt-0.5"/>
                                            <span className="ml-1.5">Profile</span>
                                        </a>
                                    </Link>
                                    <a className="text-16 text-gray-600 ml-10 flex items-center cursor-pointer"
                                        onClick={() => handlerLogout()}>
                                        <LogoutOutlined className="mt-0.5"/>
                                        <span className="ml-1.5">Logout</span>
                                    </a>
                        </Panel>
                        <Panel  header= {<div className="ant-collapse-custom flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                            <i className="inline-block -mt-1.5"><FilePptOutlined className=" text-18"/></i>
                                            <p className=" mb-0 text-16">Quản lý sản phẩm</p>
                                        </div>} 
                                key="2"
                                className="panel-item__customize">
                                    <Link href="/admin/products">
                                        <a className="text-16 text-gray-600 mb-5 ml-10 flex items-center">
                                            <UnorderedListOutlined className="mt-0.5"/>
                                            <span className="ml-1.5">Danh sách sản phẩm</span>
                                        </a>
                                    </Link>
                                    
                                    <Link href="/admin/products/create-product">
                                        <a className="text-16 text-gray-600 mb-0 ml-10 flex items-center">
                                            <FileAddOutlined className="mt-0.5"/>
                                            <span className="ml-1.5">Thêm mới sản phẩm</span>
                                        </a>
                                    </Link>
                                    
                        </Panel>
                        <Panel  header= {<div className="ant-collapse-custom flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                            <i className="inline-block -mt-1.5"><ShoppingCartOutlined className="text-18 "/></i>
                                            <p className="mb-0 text-16">Quản lý đơn hàng</p>
                                        </div>} 
                                key="3"
                                className="panel-item__customize">
                                    <Link href="/admin/orders">
                                        <a className="text-16 text-gray-600 mb-4 ml-10 flex items-center">
                                            <UnorderedListOutlined className="mt-0.5"/>
                                            <span className="ml-1.5">Danh sách đơn hàng</span>
                                        </a>
                                    </Link>
                                    
                        </Panel>
                        <Panel  header= {<div className="ant-collapse-custom flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                            <i className="inline-block -mt-1.5"><ShopOutlined className="text-18 "/></i>
                                            <p className="mb-0 text-16">Quản lý danh mục</p>
                                        </div>} 
                                key="4"
                                className="panel-item__customize">
                                    <Link href="/admin/categories">
                                        <a className="text-16 text-gray-600 ml-10 flex items-center">
                                            <UnorderedListOutlined className="mt-0.5"/>
                                            <span className="ml-1.5">Danh mục sản phẩm</span>
                                        </a>
                                    </Link> 
                        </Panel>
                        <Panel  header= {<div className="ant-collapse-custom flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                            <i className="inline-block -mt-1.5"><UsergroupAddOutlined className="text-18 "/></i>
                                            <p className="mb-0 text-16">Quản lý tài khoản</p>
                                        </div>} 
                                key="5"
                                className="panel-item__customize">
                                    <Link href="/admin/users">
                                        <a className="text-16 text-gray-600 ml-10 flex items-center">
                                            <UnorderedListOutlined className="mt-0.5"/>
                                            <span className="ml-1.5">Danh sách tài khoản</span>
                                        </a>
                                    </Link> 
                        </Panel>
                </Collapse>
            </div>
        </>
    )
}