// Ant Design
import { Button, Table, Tag, Image, Popconfirm, Tooltip, message, notification } from 'antd';
import { DeleteOutlined, EditOutlined, SmallDashOutlined } from '@ant-design/icons';

import { useState, useContext } from 'react';
import Link from 'next/link';
import { deleteData } from '../../../utils/fetchData';
import { DataContext } from '../../../store/GlobalState';
import { deleteItemProduct } from '../../../store/Actions';

type PropsType = {
    [x: string]: any;
    products: any;
}

export default function ProductAdminPage({ products }: PropsType) {

    const { state, dispatch } = useContext(DataContext);
    const { auth } = state;

    // Antd Component Table, Image
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(null);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSelectedRowKeys([]);
        }, 1000);
    }
    const onSelectChange = (selectedRowKeys) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    }
    const hasSelected = selectedRowKeys.length > 0;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }

    // Antd Component Popconfirm
    const [visibleProduct, setVisibleProduct] = useState(false);
    const [indexProduct, setIndexProduct] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = (key) => {
        setVisibleProduct(true);
        setIndexProduct(key);
    };
    const handleCancel = () => {
        setVisibleProduct(false);
        setIndexProduct(null);
    };
    // Feature Delete Product
    const handleConfirmDeleteUser = async (id) => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisibleProduct(false);
            setConfirmLoading(false);
        }, 2000);
    
        const res = await deleteData(`product/${id}`, auth.token);
        if(res.error) {
            message.error(res.error);
        }
        else {
            await dispatch(deleteItemProduct(products, id, 'DELETE_PRODUCT'));
            notification.success({
                message: "Thông báo",
                description: res.msg
            })
        }
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: "key",
            key: 'key',
            align: 'center' as 'center',
            width: 20,
            render: (text) => <p className="mb-0 text-center">{text + 1}</p>
        },
        {
            title: 'Name Product',
            dataIndex: "name",
            key: 'name',
            align: 'center' as 'center',
            width: 60,
            render: (text) => <Tag color="blue">{text}</Tag>
        },
        {
            title: 'Code Product',
            dataIndex: "code",
            key: 'code',
            align: 'center' as 'center',
            width: 100,
            render: (text) => <p className="font-semibold text-15">#{text}</p>
        },
        {
            title: 'Image',
            dataIndex: "images",
            key: 'images',
            align: 'center' as 'center',
            width: 100,
            render: (images, index) => (
                <>
                    <Image
                        preview={{ visible: visible === index.key ? true : null }}
                        width={100}
                        src={images[0].url}
                        onClick={() => setVisible(index.key)}
                    />
                    <div style={{ display: 'none' }}>
                        <Image.PreviewGroup preview={{ visible : visible === index.key ? true : null, onVisibleChange: vis => setVisible(vis) }}>
                            {
                                images.length > 0 && 
                                    images.map((img, index) =>(
                                        <Image src={img.url} key={index}/>
                                    ))
                            }
                        </Image.PreviewGroup>
                    </div>
                    
                </>
            )
        },
        {
            title: 'Category',
            dataIndex: "category",
            key: 'category',
            align: 'center' as 'center',
            width: 20,
            render: (text) => <Tag color="#e74c3c">{text}</Tag>
        },
        {
            title: 'ProductType',
            dataIndex: "productType",
            key: 'productType',
            align: 'center' as 'center',
            width: 30,
            render: (text) => <Tag color="#3498db">{text}</Tag>
        },
        {
            title: 'Price',
            dataIndex: "price",
            key: 'price',
            align: 'center' as 'center',
            width: 40,
            render: (text, index) => (
                <>
                    <p className="font-semibold text-red-600 text-15">
                        {new Intl.NumberFormat().format(((100 - index.discount)/100)*text)} 
                        <span>đ</span>
                    </p>
                    {
                        index.tagProduct.length > 0 && index.tagProduct.map((item, index) => (
                            item === "Sale" &&
                                <Tag color="#f39c12" key={index}>{item}</Tag>
                        )) 
                    }
                </>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center' as 'center',
            width: 100,
            render: (index) => 
                <div className="flex items-center justify-center space-x-4 text-red-600">
                    <Link href={`/admin/products/edit-product/${index.id}`}>
                            <Tooltip placement="bottom" title="Edit Product">
                                <i className="text-blue-600 cursor-pointer mb-1">
                                    <EditOutlined className="text-18"/>
                                </i>
                            </Tooltip>
                        </Link>
                    
                    
                    <Tooltip placement="bottom" title="Detail Product">
                        <i className="text-blue-600 cursor-pointer mb-1">
                            <SmallDashOutlined className="text-18"/>
                        </i>
                    </Tooltip>

                    <Popconfirm title="Bạn có muốn xoá tài khoản này hay không？" 
                                visible={index.key === indexProduct ? visibleProduct : null}
                                okButtonProps={{ loading: confirmLoading }}
                                cancelText="Cancel"
                                onCancel={handleCancel}
                                okText="Delete"
                                onConfirm={() =>handleConfirmDeleteUser(index.id)}>
                                    <Tooltip placement="bottom" title="Delete">
                                        <DeleteOutlined className="text-18" onClick={() =>showPopconfirm(index.key)}/>
                                    </Tooltip>
                    </Popconfirm>             
                </div>
        },
        
    ];

    const dataList = [];
    for(let item = 0; item < products.length; item ++) {
        dataList.push({
            key: item,
            id: products[item]._id,
            name: products[item].name,
            code: products[item].code,
            description: products[item].description,
            infoProduct: products[item].infoProduct,
            category: products[item].category,
            productType: products[item].productType,
            productLine: products[item].productLine,
            images: products[item].images,
            sizes: products[item].sizes,
            material: products[item].material,
            colors: products[item].colors,
            gender: products[item].gender,
            tagProduct: products[item].tagProduct,
            accessories: products[item].accessories,
            numberReview: products[item].numberReview,
            rating: products[item].rating,
            checked: products[item].checked,
            price: products[item].price,
            discount: products[item].discount,
            inStock: products[item].inStock,
            sold: products[item].sold,
            created_at: products[item].created_at,
        })
    }

    return (
        <>
            <div className="group-products pt-4 pb-8 px-10" style={{ minHeight: "80vh" }}>
                <h2 className="text-center text-28 font-medium mb-8">Danh sách sản phẩm</h2>

                {/* Get List Products */}
                <div className="group-list-products bg-white border border-gray-400 py-8 px-4 mt-6 rounded-md">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                                Bỏ chọn
                            </Button>
                            <span style={{ marginLeft: 8 }}>
                                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                            </span>
                        </div>
                        <p className="mb-0 text-18 font-semibold">
                            Có tất cả <span className="text-blue-600">{products.length}</span> sản phẩm
                        </p>
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={dataList}
                        bordered={true} 
                        scroll={{x: 1000}}
                    />
                </div>
            </div>
        </>
    )
}