import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Button, Modal, Input, Space, message, Form } from 'antd';
import { useState } from "react";
import { patchData } from "../../../../utils/fetchData";
import validate from '../../../../utils/validate'; // Validate Form

type PropsType = {
    [x: string]: any;
    auth: any;
    data: any;
    setData: any;
    isModalVisible: boolean;
    setIsModalVisible: (value: boolean) => void;
}

export default function FormUpdatePassword({  
    auth, 
    data, setData,
    isModalVisible, setIsModalVisible
}: PropsType) {
    
    const handleChangeInputPassword = async (event) => {
        const { name, value } = event.target;
        await setData({ ...data, [name]: value })
    }
    const [form] = Form.useForm(); 

    // Feature ResetPassword Profile
    const handleResetPassword = (value) => {
        console.log(value);
        
        if (value) {
            const password = value.password.trim();
            // console.log(password);
            
            patchData('user/resetPassword', { password }, auth.token)
            .then(res => {
                if (res.error) {
                message.error(res.error)
                }
                message.success(res.msg)
            })
            setIsModalVisible(false);
            form.resetFields(["password"]);
            form.resetFields(["confirm_password"]);
        }
    };
    
    return (
        <>
            
            <Modal 
                title="Đổi mật khẩu"
                visible={isModalVisible}
                centered
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Form form={form} onFinish={handleResetPassword}>
                        <Button name="cancelForm" onClick={() => setIsModalVisible(false)}>Huỷ bỏ</Button>
                        <Button type="primary"
                                name="submitForm"
                                htmlType="submit">
                            Lưu mật khẩu
                        </Button>
                    </Form>
                ]}
                >
                    <Form form={form}>
                        <Form.Item
                            name="password"
                            // label="New Password"
                            rules={[
                                {
                                    min: 8,
                                    message: "Vui lòng nhập mật khẩu chứa ít nhất 8 kí tự"
                                },
                                {
                                    required: true,
                                    type: "string",
                                    message: "Vui lòng nhập mật khẩu của bạn !"
                                },
                            ]}
                            hasFeedback  
                        >
                            <Input.Password
                                placeholder="Mật khẩu mới"
                                size="large"
                                iconRender={visible => (visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />)}
                                onChange={handleChangeInputPassword}/>
                        </Form.Item>
                        <Form.Item
                            name="confirm_password"
                            // label="Confirm Password"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    type: "string",
                                    message: "Vui lòng xác nhận mật khẩu của bạn!"
                                },
                                ({ getFieldValue}) => ({
                                    validator(_, value) {
                                        if(!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error ("Hai mật khẩu bạn đã nhập không khớp!"));
                                    },
                                })
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="Nhập lại mật khẩu"
                                size="large"
                                iconRender={visible => (visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />)}
                                onChange={handleChangeInputPassword}
                            />
                        </Form.Item>
                    </Form>
            </Modal>
        </>
    )
}