import { Comment, Avatar, Form, Button, Input } from "antd";

export default function FormComment() {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
        
      };
    return (
        <>
            <div className="group-form-comment">
                <Form form={form} onFinish={onFinish}>
                    
                </Form>
            </div>
        </>
    )
}