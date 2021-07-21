import { data } from '../data/data';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { Form, Input, Button, Radio, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../../store/GlobalState';
import PaypalBtn from './PaypalBtn';
import { postData } from '../../../../utils/fetchData';


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
    const { cart, auth, orders } = state;
    

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
        phone: "",
        payment: 0,
        cart: {},
        totalPrice: 0
    });

    // const [callBack, setCallBack] = useState(false);
    // useEffect(() => {
    //     const cartLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
        
    //     if(cartLocalStorage && cartLocalStorage.length > 0) {     
    //         let newArr = [];
    //         console.log(cartLocalStorage);
            
    //         const updateCart = async() => {
    //             for(const item of cartLocalStorage) {
    //                 const res = await getData(`product/${item._id}`);
    //                 // console.log(res.product);
                    
    //                 const { _id, name, price, images, sizes, inStock, sold } = res.product;
                    
    //                 if(inStock > 0) {
    //                     newArr.push({
    //                         _id, 
    //                         name: item.productName, 
    //                         images: item.productImges, 
    //                         price, 
    //                         sizes, 
    //                         inStock, 
    //                         sold, 
    //                         quantity: item.qty > inStock ? 1 : item.qty
                            
    //                     })
    //                 }
    //             }
    //             dispatch({ type: "ADD_CART", payload: newArr })
    //         }
    //         updateCart();
    //     }
        
    // }, [callBack]);
    
    const checkOutPayment = async (values) => {
        const { city, districts, wards, street, phone, payment } = values;
        const address = `${street}, ${wards}, ${districts}, ${city}`;
        await setCartPayment({
            address: address,
            phone: phone,
            payment: payment,
            cart: cart,
            totalPrice: totalPrice
        });

        postData('order', { address, phone, payment, cart, totalPrice}, auth.token)
        .then(res => {
            if(res.error) {
                message.error(res.error);
            }
            // clear product_items in cart
            dispatch({ type: "ADD_CART", payload: []});

            const newOrder = {
                ...res.newOrder,
                user: auth.user
            }
            
            dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder]})
            
            // show message order success
            const hide = message.success(res.message, 0);
            setTimeout(hide, 4000);
        })  
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
                onFinish={checkOutPayment}
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
                    hasFeedback
                    
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
                    hasFeedback
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
                    hasFeedback
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
                    hasFeedback
                >
                    <Input type="text" min={0} max={10} placeholder="Number Phone"/>
                </Form.Item>

                <Form.Item
                    style={{ width: "100%" }}
                    label="Phương thức thanh toán"
                    name="payment"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng chọn phương thức thanh toán mà bạn muốn !',
                        },
                    ]}
                >   
                    {   payment ? <PaypalBtn    total={totalPrice} 
                                                address={cartPayment.address}
                                                phone={cartPayment.phone}
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