import Link from 'next/link';
import { useContext, useState } from "react";
import { DataContext } from "../../../../store/GlobalState";

 // Ant Design
import { Tooltip, Drawer, Input } from 'antd';
import { ShoppingCartOutlined, BellOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";

export function HeaderInfo(props) {

    const { state } = useContext(DataContext);
    const { cart } = state;

    // Antd Component Drawer
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    // Antd Search
    const { Search } = Input;

    return (
        <>
            <div>
                <ul className="flex items-center lg:space-x-6 mb-0">
                    <li className="flex items-center space-x-1.5 md:space-x-2.5 lg:space-x-7">
                        <Tooltip placement="bottom" title="Tìm kiếm">
                            <i className="icon__search text-gray-600" onClick={showDrawer}>
                                <SearchOutlined className="cursor-pointer text-18 md:text-22 lg:text-3xl hover:text-red-600 transition ease-linear duration-200"/>
                            </i>
                        </Tooltip>
                        

                        <Link href="/cart">
                            <i className="icon__add-to-cart flex items-center relative cursor-pointer text-gray-600 transition ease-in duration-500">
                                <Tooltip placement="bottom" title="Giỏ hàng">
                                    <ShoppingCartOutlined className="z-10 text-18 md:text-22 lg:text-4xl hover:text-red-600 transition ease-linear duration-200"/>
                                    <span className="absolute z-20 -top-2 -right-2 px-1.5 text-white text-14 bg-red-600 rounded-full">{cart.length}</span>
                                </Tooltip>
                            </i>
                        </Link>
                        
                        <i className="icon__notification text-gray-600">
                            <Tooltip placement="bottom" title="Thông báo">
                                <BellOutlined className="cursor-pointer text-18 md:text-22 lg:text-3xl hover:text-red-600 transition ease-linear duration-200"/>
                            </Tooltip>
                        </i>
                    </li>
                </ul>
                <Drawer
                    placement="top"
                    closable={true}
                    closeIcon={<CloseOutlined  className="text-28 focus:outline-none hover:text-red-600 transition ease-linear duration-200 mr-4 my-2"/>}
                    onClose={onClose}
                    visible={visible}
                    height={170}
                >
                    <div className="flex items-end w-full h-full px-20">
                        <Search placeholder="Tìm kiếm sản phẩm" enterButton="Tìm kiếm" size="large" className="input-search-product" />
                    </div>
                </Drawer>
            </div>
        </>
    )
}