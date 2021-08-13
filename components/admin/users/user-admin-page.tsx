// Ant Design
import { Table, Button, Avatar, Switch, Tag, Tooltip, Popconfirm, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// Date-fns
import parseISO from 'date-fns/parseISO';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import viLocale from 'date-fns/locale/vi';

import { useState, useContext, useEffect } from 'react';
import { DataContext } from "../../../store/GlobalState";
import { deleteData, patchData } from '../../../utils/fetchData';
import { deleteItemUser, updateItem } from '../../../store/Actions';

export default function UserAdminPage(props) {

    const { state, dispatch } = useContext(DataContext);
    const { auth, users } = state;

    const [booleanRole, setBooleanRole] = useState(false);

    // Feature Change Role
    const handleChangeRole = (checked) => {
        // console.log(`switch to ${checked}`);
        setBooleanRole(checked);
    }
    const actionEditRole = async (id) => {
       
        let role = booleanRole ? "admin" : "user";
        patchData(`user/${id}`, {role}, auth.token)
            .then(res => {
                if(res.error) {
                    message.error(res.error);
                }
                // dispatch(updateItem(users, id, { ...users, role}, 'ADD_USERS'));
                message.success(res.msg);
            })
    }

    // Antd Component Popconfirm
    const [visible, setVisible] = useState(false);
    const [indexUser, setIndexUser] = useState(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = (key) => {
        setVisible(true);
        setIndexUser(key);
    };
    const handleCancel = () => {
        setVisible(false);
        setIndexUser(null);
    };
    // Feature Delete User
    const handleConfirmDeleteUser = async (id) => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 3000);
        // console.log(id);
        const res = await deleteData(`user/${id}`, auth.token)
        if(res.error) {
            message.error(res.error);
        }
        await dispatch(deleteItemUser(users, id, 'ADD_USERS'));
        message.success(res.msg)
    }

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
            render: (text) => <p className="mb-0 text-center">{text + 1}</p>
        },
        {
            title: 'Username',
            dataIndex: "username",
            key: 'username',
            render: (text) => <p className="mb-0">{text}</p>
        },
        {
            title: 'Email',
            dataIndex: "email",
            key: 'email',
            render: (text) => <p className="mb-0 font-semibold text-blue-500">{text}</p>
        },
        {
            title: 'Avatar',
            dataIndex: "avatar",
            key: 'avatar',
            render: (text) => <Avatar src={text} 
                                    alt={text} 
                                    draggable={false} 
                                    size={{ xs: 24, sm: 26, md: 40, lg: 64, xl: 70 }}/>
        },
        {
            title: 'NumberPhone',
            dataIndex: "phone",
            key: 'phone',
            render: (text) => <p className="mb-0 font-semibold text-center">{text}</p>
        },
        {
            title: 'Datetime',
            dataIndex: "datetime",
            key: 'datetime',
            render: (time) =>
                <Tooltip placement="top" title={time}>
                    <div className="flex justify-center">
                        <Tag color="#16a085">
                            {formatDistanceToNow(parseISO(time), {
                                addSuffix: true,
                                locale: viLocale
                            })}
                        </Tag>
                    </div>  
                </Tooltip>
        },
        {
            title: 'Role',
            dataIndex: "role",
            key: 'role',
            render: (text) => 
                <div className="flex justify-center">
                    <Tag color={`${text === "admin" ? "#2ecc71" : "#3498db"}`}>
                        {text === "admin" ? "Quản trị viên" : "Người dùng"}
                    </Tag>
                </div>
                
        },
        {
            title: 'Phân quyền',
            dataIndex: "role",
            key: 'action',
            render: (text, index) => (
                <div className="flex flex-col items-center space-y-1">
                    <div><Tag color="#2ecc71">Admin</Tag></div>
                    <div>
                        <Switch defaultChecked={text === "admin" ? true : false}
                                onChange={handleChangeRole} 
                                onClick={() => actionEditRole(index.id)}/>
                    </div>
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (index) => 
                <div className="flex justify-center text-red-600">
                    <Popconfirm title="Bạn có muốn xoá tài khoản này hay không？" 
                                visible={index.key === indexUser ? visible : null}
                                okButtonProps={{ loading: confirmLoading }}
                                cancelText="Cancel"
                                onCancel={handleCancel}
                                okText="Delete"
                                onConfirm={() =>handleConfirmDeleteUser(index.id)}>
                                    <DeleteOutlined className="text-18" onClick={() =>showPopconfirm(index.key)}/>
                    </Popconfirm>
                </div>
        },
    ];

    const dataList = [];
    for(let item = 0; item < users.length; item++) {
        dataList.push({
            key: item,
            id: users[item]._id,
            username: users[item].username,
            email: users[item].email,
            avatar: users[item].avatar,
            phone: users[item].phone,
            role: users[item].role,
            datetime: users[item].createdAt,
        })
    }

    return (
        <>
            <div className="group-users pt-4 pb-8 px-7" style={{ minHeight: "80vh"}}>
                <h2 className="text-center text-28 font-medium mb-8">Danh sách user</h2>
                
                <div className="list-users bg-white border border-gray-400 py-8 px-4 rounded-md">
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
                        // loading={ dataList ? false : true}
                        // scroll={{ x: 1400 }} 
                    />
                </div>
            </div>
        </>
    )
}