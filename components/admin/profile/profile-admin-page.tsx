
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../store/GlobalState';
// Ant Design
import { Tooltip, Input, Button, message, Image, Upload } from 'antd'; 
import ImgCrop from 'antd-img-crop';
import { UserOutlined, EditOutlined, MailOutlined, PhoneOutlined, CameraOutlined } from '@ant-design/icons';
import { patchData } from '../../../utils/fetchData';
import FormUpdatePassword from '../../../layouts/default-layout/header/component/FormUpdatePassword';
import { imageUploadAvatar } from '../../../utils/imageUploadAvatar';


export default function ProfileAdminPage(props) {

    const { state, dispatch } = useContext(DataContext);
    const { auth } = state;

    // Modal Antd and Message Antd
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showOpenModal = () => {
        setIsModalVisible(true);
    };

    const [visible, setVisible] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);
    const [loading, setLoading] = useState(false);
    const initialState = {
        avatar: "",
        username: ""
    }
    const [data, setData] = useState(initialState);
    const { avatar, username } = data;

    useEffect(() => {
        if(auth.user) {
            setData({ ...data, username: auth.user.username });
        }
    }, [auth.user]);

    // Feature Update Username
    const handleChangeInputName = async (event) => {
        const { name, value } = event.target;
        await setData({ ...data, [name]: value })
        await setDisableBtn(false);
    }

    const handleUpdateUsername = async() => {
        if(username !== auth.user.username) {
            await updateUsername();
        }
        setVisible(false);
        setDisableBtn(true);
    }
    
    const updateUsername = () => {
        patchData('user/updateUsername', { username }, auth.token)
        .then(res => {
            if(res.error) {
                message.error(res.error);
            }
            dispatch({ type: "AUTH", payload: {
                token: auth.token,
                user: res.user
            }})
            message.success(res.msg);
        })
    }

    // Feature Upload Avatar
    const beforeUpload = async (file) => {
        const isJpgOrPngOrJpeg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPngOrJpeg) {
            message.error('Bạn chỉ có thể tải lên tệp JPG/PNG hoặc JPEG!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Hình ảnh phải nhỏ hơn 2MB!');
        }

        if (isLt2M && isJpgOrPngOrJpeg) {
            setTimeout(() => {
                setLoading(true)
            }, 1000);     
            await setData({ ...data, avatar: file})
        }
    
        return isJpgOrPngOrJpeg && isLt2M;
    }
    const handleUpdateAvatar = () => {
        if(avatar) {
            updateAvatar();
        }
    }

    const updateAvatar = async () => {
        let media;
        if(avatar) {
            media = await imageUploadAvatar(avatar);
        }
        patchData('user/uploadAvatar', { avatar: avatar? media[0].url : auth.user.avatar }, auth.token)
        .then(res => {
            if(res.error) {
                message.error(res.error);
            }
            dispatch({ type: "AUTH", payload: {
                token: auth.token,
                user: res.user
            }})
            message.success(res.msg)
        })
        setLoading(false);
    }

    return (
        <>
            <div className="group-profile bg-gray-100 pt-6 px-6" style={{ minHeight: "80vh"}}>
                <h2 className="text-center text-28 font-medium mb-8">Profile Admin</h2>
                {
                    Object.keys(auth).length > 0 &&
                    <div className="grid grid-cols-2 gap-8">
                        <div className="profile-info col-span-1 border border-gray-300 bg-white mx-16 py-10 p-9 rounded-md">
                            <div className="group-username grid grid-cols-8 justify-between border-b border-gray-200 pb-5">
                                { 
                                    visible ? (
                                        <>
                                            <i className="col-span-1"><UserOutlined className="text-20 "/></i>
                                            <div className="col-span-7">
                                                <Input value={username}
                                                    name="username"
                                                    onChange={handleChangeInputName} />
                                            </div>
                                            <div className="col-span-8 text-right mt-3 space-x-4">
                                                <Button onClick={() => setVisible(false)}>Huỷ bỏ</Button>
                                                <Button type="primary"
                                                    disabled={disableBtn ? true : false}
                                                    onClick={handleUpdateUsername}>Cập nhật
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <i className="col-span-1"><UserOutlined className="text-18" /></i>
                                            <span className="col-span-6 text-16 font-semibold mt-0.5 -ml-4">{username}</span>
                                            <i className="col-span-1 flex justify-end" onClick={() => setVisible(true)}>
                                                <Tooltip placement="bottomRight" title="Edit Name">
                                                    <EditOutlined className="text-22 cursor-pointer" />
                                                </Tooltip>
                                            </i>
                                        </>
                                    )
                                }
                            </div>
                            
                            <div className="group-email grid grid-cols-8 mt-4 border-b border-gray-200 pb-5">
                                <i className="col-span-1"><MailOutlined className="text-18" /></i>
                                <span className="col-span-7 text-16 font-semibold mt-0.5 -ml-4">{auth.user.email}</span>
                            </div>
                            <div className="group-phone grid grid-cols-8 mt-4 border-b border-gray-200 pb-5">
                                <i className="col-span-1"><PhoneOutlined className="text-18" /></i>
                                <span className="col-span-7 text-16 font-semibold mt-0.5 -ml-4">{auth.user.phone}</span>
                            </div>
                            <div className="group-password w-full mt-10">
                                <Button className="w-full"
                                    type="primary"
                                    onClick={showOpenModal}>
                                    Đổi mật khẩu
                                </Button>
                                <FormUpdatePassword auth={auth} 
                                                    data={data}
                                                    setData={setData}
                                                    isModalVisible={isModalVisible}
                                                    setIsModalVisible={setIsModalVisible}/>
                            </div>
                        </div>
                        <div className="profile-avatar col-span-1 w-full flex flex-col items-center">
                            <Image
                                className="img-avatar__customize"
                                width={240}
                                height={240}
                                src={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar} 
                                alt={avatar ? URL.createObjectURL(avatar) : auth.user?.avatar}/>
                            <ImgCrop
                                modalOk="Cập nhật"
                                modalCancel="Huỷ bỏ"
                                modalTitle="Cập nhật ảnh đại diện"
                                rotate>
                                <Upload
                                    accept=".jpg, .png, .jpeg"
                                    listType="picture-card"
                                    fileList={[]}
                                    name="avatar"
                                    beforeUpload={beforeUpload}
                                    onChange={handleUpdateAvatar}
                                    >
                                    <Button
                                        type="dashed"
                                        className="mt-6 ml-3"
                                        icon={<CameraOutlined className=" text-18" />}
                                        loading={loading}
                                        >
                                        Cập nhật ảnh đại diện
                                    </Button> 
                                </Upload>
                            </ImgCrop>
                            
                            <p className="text-gray-400 font-semibold mt-4">(Dung lượng tối đa của ảnh 1MB và định dạng file: .PNG, .JPG, .JPEG)</p>
                            
                        </div>
                        
                    </div>
                }
            </div>
        </>
    )
}