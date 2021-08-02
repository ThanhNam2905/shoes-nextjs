import { Table, Button, Tooltip, Drawer, Tag, message } from 'antd';
import { useState, useContext } from 'react';
import { DataContext } from '../../../store/GlobalState';
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import { patchData } from '../../../utils/fetchData';
import { updateItem } from '../../../store/Actions';

export default function OrderAdminPage(props) {

    const { state, dispatch } = useContext(DataContext);
    const { orders, auth } = state;

    // Ant Design Table
    const [visible, setVisible] = useState(false);
    const [indexCart, setIndexCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onClose = () => {
        setVisible(false);
        setIndexCart(null);
    };
    const showDrawer = (key) => {
        setVisible(true);
        setIndexCart(key);
    };
    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSelectedRowKeys([]);
        }, 1000);
    }
    const hasSelected = selectedRowKeys.length > 0;
    const onSelectChange = (selectedRowKeys) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }

    const renderCustomCell = (array, index) => {
        return (
            <>
                <Tooltip placement="bottom" title="Xem chi tiết">
                    <p className="mb-0 flex items-center font-semibold cursor-pointer hover:text-blue-600" onClick={() => showDrawer(index.key)}>
                        {array.length}<ShoppingCartOutlined className="text-16 ml-0.5" />
                    </p>
                </Tooltip>
                <Drawer
                    title="Chi tiết giỏ hàng"
                    width={800}
                    closeIcon={<CloseOutlined className="mb-2 inline-block"/>}
                    placement="right"
                    closable={true}
                    onClose={onClose}
                    visible={index.key==indexCart ? visible:null}
                >
                    <div className="group-cart-item">
                        <div>
                            {   array.length > 0 &&
                                array.map((item, index) => (
                                    <div className="cart-item mt-4 grid grid-cols-10 gap-5 pr-2 border-b-2 border-gray-200" key={index}>
                                        <div className="col-span-2">
                                            <img src={item.productImage.url} alt={item.productImage.url} className="object-cover w-10/12 max-w-10/12 h-5/6" />
                                        </div>
                                        <div className="col-span-4">
                                            <h5 className="text-16 font-medium">
                                                <p className="hover:text-red-600 hover:underline capitalize text-gray-800 mb-0">{item.productName}</p>
                                            </h5>
                                            <p className="text-16 my-2">Size: {item.size}</p>
                                            <p className="text-16 ">Price: <span className="text-red-600">{new Intl.NumberFormat().format(item.productPrice)} ₫</span></p>
                                        </div>
                                        <div className="col-span-2 text-16 text-center">
                                            <p className="mb-2 font-semibold">Số lượng</p>
                                            <p className="text-center">{item.qty}</p>
                                        </div>
                                        <div className="col-span-2 text-16 text-right">
                                            <p className="mb-2 font-semibold">Total Price</p>
                                            <p className="text-red-600">{new Intl.NumberFormat().format(item.qty * item.productPrice)} ₫</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Drawer>
            </>
        )
    }

    

    const handleDelivered = (order) => {
        console.log(order);
        patchData(`order/delivered/${order.key}`, null, auth.token)
        .then(res => {
            if(res.error) {
                message.error(res.error);
            }
            console.log(res);
            const { paid, dateOfPayment, payment, delivered } = res.result;
            dispatch(updateItem(orders, order.key, {
                ...order, paid, dateOfPayment, payment, delivered
            }, 'ADD_ORDERS'));
            message.success(res.msg)
        })
    }

    const columns = [
        {
            title: 'Email',
            dataIndex: ['user', 'email'],
            key: 'mail',
            render: (text) => <p className="mb-0">{text}</p>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <p className="text-blue-600 font-semibold whitespace-nowrap mb-0">{text}</p>
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Payment',
            dataIndex: 'payment',
            key: 'payment',

        },
        {
            title: 'TotalPrice',
            dataIndex: 'totalPrice',
            key: "totalPrice",
            render: text => <p className="text-red-600 mb-0 flex items-center">{new Intl.NumberFormat().format(text)} <span>đ</span></p>
        },
        {
            title: 'Cart',
            dataIndex: 'cart',
            key: "cart",
            render: (cart, index) => renderCustomCell(cart, index)
        },
        {
            title: 'Delivered',
            dataIndex: 'delivered',
            key: "delivered",
            render: (text, index) => (
                <button onClick={() =>handleDelivered(index)} 
                        disabled={text ? true : false}
                        className={`whitespace-nowrap text-white py-1 px-2 rounded-md focus:outline-none ${text ? "bg-green-400 hover:bg-green-500" : "bg-yellow-400 hover:bg-yellow-500"}`}>
                            {text ? "Đã giao hàng" : "Chưa giao hàng" }
                </button>
                
            )
        },
        {
            title: 'Paid',
            dataIndex: 'paid',
            key: "paid",
            render: (text) => (
                <Tag color={`${text ? "green" : "orange"}`}>{text ? "Đã thanh toán" : "Chưa thanh toán"}</Tag>
            )
        },
        {
            title: 'StatusPayment',
            dataIndex: 'statusPayment',
            key: "statusPayment"
        },
    ];

    

    const dataList = [];

    for (const item of orders) {
        dataList.push({
            key: item._id,
            name: item.name,
            user: item.user,
            address: item.address,
            phone: item.phone,
            payment: item.payment === 1 ? "Thanh toán khi nhận hàng" : "",
            totalPrice: item.totalPrice,
            cart: item.cart,
            delivered: item.delivered,
            paid: item.paid,
            statusPayment: item.statusPayment ? "Đã hoàn thành" : "Đang chờ xác nhận"
        })
    }

    return (
        <>
            <div className="group-order pt-4 pb-8 px-7" style={{ minHeight: "80vh" }}>
                <h2 className="text-center text-28 font-medium mb-8">Danh sách đơn hàng</h2>

                <div className="list-orders bg-white border border-gray-400 py-8 px-4 rounded-md">
                    <div className="mb-4">
                        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                            Bỏ chọn
                        </Button>
                        <span style={{ marginLeft: 8 }}>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={dataList}
                        scroll={{ x: 1400 }} 
                    />
                </div>
            </div>
        </>
    )
}