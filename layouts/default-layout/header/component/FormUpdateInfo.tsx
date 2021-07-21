import { AiOutlineUser, AiOutlineEdit, AiOutlineCamera } from "react-icons/ai"; // React icon
import { useEffect, useState } from "react";
import { Button, Input, message, Image, Upload } from 'antd'; // Andt Design
import ImgCrop from 'antd-img-crop';
import { patchData } from "../../../../utils/fetchData";
import { imageUpload } from "../../../../utils/imageUpload";

type PropsType = {
    [x: string]: any;
    avatar: string;
    username: string;
    auth: any;
    dispatch: any;
    data: any;
    setData: any;
}

export default function FormUpdateInfo({ avatar, username, auth, dispatch, data, setData }: PropsType) {

    const [visible, setVisible] = useState(false);
    const [disableBtn, setDisableBtn] = useState(true);

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

    // Feature Upload Images User
    const [loading, setLoading] = useState(false);
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
            media = await imageUpload(avatar);
        }
        // console.log(media);
        
        patchData('user/uploadAvatar', { avatar: avatar ? media[0].url : auth.user.avatar }, auth.token)
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
        setLoading(false);
    }


    return (
        <>
            <div className="group-avatar">
                <Image
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
                        onChange={handleUpdateAvatar}>
                        <Button
                            type="dashed"
                            icon={<AiOutlineCamera className=" text-18" />}
                            loading={loading}
                            >
                            Tải ảnh lên
                        </Button>
                    </Upload>
                </ImgCrop>
            </div>

            <div className="group-username grid grid-cols-8 w-full px-8 mt-5">
                {
                    visible ? (
                        <>
                            <i className="col-span-1"><AiOutlineUser className="text-20 mt-0.5" /></i>
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
                            <i className="col-span-1"><AiOutlineUser className="text-20 mt-0.5" /></i>
                            <span className="col-span-6 text-16 font-normal">{username}</span>
                            <i className="col-span-1 flex justify-end" onClick={() => setVisible(true)}>
                                <AiOutlineEdit className="text-22 cursor-pointer" />
                            </i>
                        </>
                    )
                }
            </div>
            
        </>
    )
}