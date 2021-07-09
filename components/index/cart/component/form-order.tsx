import { data } from '../data/data';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { Form, Input, Button, Radio, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../../store/GlobalState';
import PaypalBtn from './PaypalBtn';

type PropsType = {
    [x: string]: any;
    totalPrice: number;
}

export default function FormOrder({ totalPrice }: PropsType) {

    // Form Payment
    const layout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    };
    const { Option } = Select;
    const { TextArea } = Input;
    const [valueRadio, setValueRadio] = useState(1);
    const onChange = e => {
        // console.log('radio checked', e.target.value);
        setValueRadio(e.target.value);
    };

    const [city, setCity] = useState("");
    const [districts, setDistricts] = useState("");
    const [wards, setWards] = useState("");

    const { state, dispatch } = useContext(DataContext);
    const { cart } = state;
    

    const handlerChangeCity = async (value) => {
        await setCity(value);
    }
    
    const handlerChangeDistricts = async (value) => {
        await setDistricts(value)
    }
    const handlerChangeWards = async (value) => {
        await setWards(value)
    }

    const [payment, setPayment] = useState(false);
    const [cartPayment, setCartPayment] = useState({
        address: "",
        numberPhone: "",
        payment: 0,
        cart: {},
        total: 0
    });
    
    const checkOutCart = (values) => {
        console.log('Success:', values.city);
        const { city, districts, wards, street, phone, payment_checkout } = values;
        setCartPayment({
            address: `${street}, ${wards}, ${districts}, ${city}`,
            numberPhone: phone,
            payment: payment_checkout,
            cart: cart,
            total: totalPrice
        });
        const hide = message.loading("Bạn đã đặt hàng thành công", 0);
        setTimeout(hide, 4000);
    };
    console.log(cartPayment);
    

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields(["districts"]);
        form.resetFields(["wards"]);
    }, [city]);

    useEffect(() => {
        form.resetFields(["wards"]);
    }, [districts]);

    return (
        <>
            <Form
                form={form}
                {...layout}
                name="locations"
                initialValues={{
                    remember: true,
                }}
                onFinish={checkOutCart}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    style={{ width: "100%" }}
                    label="Tỉnh/Thành phố"
                    name="city"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn tỉnh hoặc thành phố bạn ở !',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Tỉnh/Thành Phố"
                        optionFilterProp="children"
                        onChange={handlerChangeCity}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        { data.length > 0 &&
                            data.map((item, index) => (
                                <Option value={item.name} key={index}>{item.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{ width: "100%" }}
                    label="Huyện/Quận"
                    name="districts"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn huyện hoặc quận bạn ở !',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Huyện/Quận"
                        optionFilterProp="children"
                        onChange={handlerChangeDistricts}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        { data.length > 0 &&
                            data.map(item => (
                                item.name === city && 
                                    item.huyen.map(huyen => (
                                        <Option value={huyen.name} key={huyen.id}>{huyen.name}</Option>
                                    ))   
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{ width: "100%" }}
                    label="Xã/Phường"
                    name="wards"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn xã hoặc phường bạn ở !',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Xã/Phường"
                        optionFilterProp="children"
                        onChange={handlerChangeWards}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        { data.length > 0 && 
                            data.map(item => (
                                item.name === city &&
                                    item.huyen.map(huyen => (
                                        huyen.name === districts && 
                                            huyen.xa.map(ward => (
                                                <Option value={ward.name} key={ward.id}>{ward.name}</Option>
                                            ))
                                    ))
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    style={{ width: "100%" }}
                    label="Số nhà, Tên đường"
                    name="street"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng ghi rõ địa chỉ !',
                        },
                    ]}
                >
                    <TextArea 
                        rows={3} 
                        maxLength={300}
                        placeholder="Địa chỉ cụ thể như số nhà, tên đường, ..."/>
                </Form.Item>

                <Form.Item
                    style={{ width: "100%" }}
                    label="Số Điện Thoại"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng ghi số điện thoại của bạn !',
                        },
                    ]}
                >
                    <Input type="text" min={0} max={10} placeholder="Number Phone"/>
                </Form.Item>

                <Form.Item
                    style={{ width: "100%" }}
                    label="Phương thức thanh toán"
                    name="payment_checkout"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn phương thức thanh toán mà bạn muốn !',
                        },
                    ]}
                >   
                    {   payment ? <PaypalBtn    total={totalPrice} 
                                                address={cartPayment.address}
                                                numberPhone={cartPayment.numberPhone}
                                                cart={cartPayment.cart}
                                                state={state}
                                                dispatch={dispatch}/> 
                            :   (
                            <Radio.Group onChange={onChange} value={valueRadio}>
                                <Radio value={1}>Thanh toán khi nhận hàng</Radio>
                                <Radio value={2} onClick={() => setPayment(true)}>Thanh toán qua Ví Paypal</Radio>
                            </Radio.Group>
                        )
                    }
                    
                </Form.Item>

                <Form.Item>
                    <Button block
                        type="primary"
                        danger
                        htmlType="submit">
                        Đặt hàng ngay
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}