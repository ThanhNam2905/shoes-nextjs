// Atn Design
import { Modal, Button, Input, Table, message, Popconfirm, Tooltip, Tag, notification } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
// Date-fns
import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import viLocale from 'date-fns/locale/vi';

import { useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../../../store/GlobalState';
import { deleteData, postData, putData } from '../../../utils/fetchData';
import { deleteItemCategory, updateItem } from '../../../store/Actions';

export default function CategoriesAdminPage(props) {

    const [name, setName] = useState('');
    const [visibleColumnName, setVisibleColumnName] = useState(null);
    const [disableBtn, setDisableBtn] = useState(true);
    const { state, dispatch } = useContext(DataContext);
    const { categories, auth } = state;

    // Antd Component Popconfirm
    const [visible, setVisible] = useState(false);
    const [indexCategory, setIndexCategory] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = (key) => {
        setVisible(true);
        setIndexCategory(key);
    };
    const handleCancelDeleteCategory = () => {
        setVisible(false);
        setIndexCategory(null);
    };
    

    // Antd Component Modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleCancel = async () => {
        await setIsModalVisible(false);
        // await setCategory({...category, name: '', unsignedName: ''});
    };

    // Antd Component Table
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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

    // formatDate
    const formatDate = (datetime) => {
        const date = new Date(datetime);
        const year = new Intl.DateTimeFormat('vi', { year: 'numeric' }).format(date);
        const month = new Intl.DateTimeFormat('vi', { month: 'long' }).format(date);
        const day = new Intl.DateTimeFormat('vi', { day: '2-digit' }).format(date);
        const weekday = new Intl.DateTimeFormat('vi', { weekday: 'long' }).format(date);
        const hours = date.getHours();
        const minutes = date.getMinutes();

        const result = `${hours} giờ ${minutes} phút - ${weekday}, Ngày ${day}, ${month}, ${year} `;
        return (
            <>
                <span className="text-white">vào lúc {result}</span>
            </>
        )
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: "key",
            key: 'key',
            align: 'center' as 'center',
            width: 80,
            render: (text) => <p className="mb-0 text-center">{text + 1}</p>
        },
        {
            title: 'Category Name',
            dataIndex: "name",
            key: 'name',
            render: (text, index) => (
                
                    visibleColumnName === index.id ? (
                        <div>
                            <Input  defaultValue={text}
                                    onChange={handleChangeInputName}/>
                            
                        </div>
                    ): (
                        <p className="mb-0">{text}</p>
                    )
                
            )
        },
        {
            title: "Datetime",
            align: 'center' as 'center',
            dataIndex: "datetime",
            width: 140,
            key: "datetime",
            render: (time) => (
                <Tooltip placement="top" title={formatDate(time)}>
                    <div className="flex justify-center">
                        <Tag color="#16a085">
                            {formatDistanceToNow(parseISO(time), {
                                addSuffix: true,
                                locale: viLocale
                            })}
                        </Tag>
                    </div>  
                </Tooltip>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center' as 'center',
            width: visibleColumnName !== null ? 240 : 120,
            render: (index) => (
                <div className="flex justify-around">
                    {
                        visibleColumnName === index.id ? (
                            <div className="flex space-x-3">
                                <Button onClick={handleCancelUpdateCategory}>Huỷ bỏ</Button>
                                <Button type="primary"
                                    disabled={disableBtn}
                                    onClick={() =>handleUpdateCategory(index.id)}>Cập nhật
                                </Button>
                            </div>
                        ) : (
                            <i className="text-blue-600 cursor-pointer" onClick={() => setVisibleColumnName(index.id)}>
                                <EditOutlined className="text-18"/>
                            </i>
                        )
                    }
            
                    <i className="text-red-600 ml-2">
                        <Popconfirm title="Bạn có muốn xoá tài khoản này hay không？" 
                                    placement="topRight"
                                    visible={index.key === indexCategory ? visible : null}
                                    okButtonProps={{ loading: confirmLoading }}
                                    cancelText="Cancel"
                                    onCancel={handleCancelDeleteCategory}
                                    okText="Delete"
                                    onConfirm={() =>handleConfirmDeleteCategory(index.id)}>
                                        <DeleteOutlined className="text-18 " onClick={() =>showPopconfirm(index.key)}/>
                        </Popconfirm>
                    </i>
                </div>
            )
        },
    ];

    const dataList = [];
    for(let item = 0; item < categories.length; item++) {
        dataList.push({
            key: item,
            id: categories[item]._id,
            name: categories[item].name,
            datetime: categories[item].createdAt,
        })
    }

    // Feature Create Category
    const createCategory = async () => {
        setIsModalVisible(false);
        if(auth.user.role !== "admin") {
            message.error("Authentication is not valid!");
        }
        if(!name) {
            message.error("Vui lòng  điền thông tin đầy đủ!");
        }

        const res = await postData('category', {name}, auth.token);
        console.log(res);
        if(res.error) {
            message.error(res.error);
        }
        else {
            dispatch({ type: "ADD_CATEGORIES", payload: [...categories, res.newCategories]});
            notification.success({
                message: "Thông báo",
                description: res.msg
            })
            setName('');
        }
    };

    // Feature Update Category
    const handleCancelUpdateCategory = () => {
        setVisibleColumnName(null);
        setDisableBtn(true);
    }
    const handleChangeInputName = async(event) => {
        const { value } = event.target;
        await setName(value);
        await setDisableBtn(false);
    }
    const handleUpdateCategory = async (id) => {
        const res = await putData(`category/${id}`, {name}, auth.token);
        if(res.error) {
            message.error(res.error);
        }
        else {
            dispatch(updateItem(categories, id, res.category, 'ADD_CATEGORIES'));
            setVisibleColumnName(null);
            notification.success({
                message: "Thông báo",
                description: res.msg
            })
        }
    }

    // Feature Delete Category
    const handleConfirmDeleteCategory = async(id) => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        const res = await deleteData(`category/${id}`, auth.token)
        if(res.error) {
            message.error(res.error);
        }
        else {
            await dispatch(deleteItemCategory(categories, id, 'ADD_CATEGORIES'));
            notification.success({
                message: "Thông báo",
                description: res.msg
            })  
        }
    }

    return (
        <>
            <div className="group-categories pt-4 pb-8 px-10" style={{ minHeight: "80vh" }}>
                <h2 className="text-center text-28 font-medium mb-8">Danh sách danh mục sản phẩm</h2>

                <div className="group-add-category">
                    <Button type="primary" onClick={showModal} className="btn-add__category">
                        <PlusOutlined className="text-16"/>
                        <span>Thêm danh mục</span>
                    </Button>
                    <Modal 
                        title="Thêm danh mục sản phẩm" 
                        visible={isModalVisible}
                        okText="Xác nhận"
                        onOk={createCategory} 
                        cancelText="Huỷ bỏ"
                        onCancel={handleCancel}>
                            <div className="mb-6">
                                <p className="mb-2">Tên danh mục:</p>
                                <Input 
                                    placeholder="Category Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}/>
                            </div>

                    </Modal>
                </div>

                {/* Get List Categories */}
                <div className="group-list-categories bg-white border border-gray-400 py-8 px-4 mt-6 rounded-md">
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
                        bordered={true} 
                    />
                </div>
            </div>
        </>
    )
}