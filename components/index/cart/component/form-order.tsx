import { data } from '../data/data';
import { Select, Form, Input, Button, Radio, message, notification } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../../store/GlobalState';
import { getData, postData } from '../../../../utils/fetchData';
import { useRouter } from 'next/router';

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
    const [callback, setCallback] = useState(false);
    const { state, dispatch } = useContext(DataContext);
    const { cart, auth, orders } = state;
    const router = useRouter();

    const [form] = Form.useForm();
    useEffect(() => {
        form.resetFields(["districts"]);
        form.resetFields(["wards"]);
    }, [city]);

    useEffect(() => {
        form.resetFields(["wards"]);
    }, [districts]);

    const handlerChangeCity = async (value) => {
        await setCity(value);
    }
    
    const handlerChangeDistricts = async (value) => {
        await setDistricts(value)
    }
    const handlerChangeWards = async (value) => {
        await setWards(value)
    }

    const [cartPayment, setCartPayment] = useState({
        address: "",
        name: "",
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
        const { city, districts, wards, street, name, phone, payment } = values;
        const address = `${street}, ${wards}, ${districts}, ${city}`;
        await setCartPayment({
            address: address,
            name: name,
            phone: phone,
            payment: payment,
            cart: cart,
            totalPrice: totalPrice
        });
        let newCart = [];
        for(const item of cart) {
            const res = await getData(`product/${item._id}`);
            if(res.product.inStock - item.qty >= 0) {
                newCart.push(item);
            }
        }
        if(newCart.length < cart.length) {
            setCallback(!callback);
            message.error("S???n ph???m b???n ch???n ???? h???t h??ng ho???c s??? l?????ng kh??ng ?????");
        }

        postData('order', { address, name, phone, payment, cart, totalPrice}, auth.token)
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
            notification.success({
                message: "Th??ng b??o",
                description: res.message,
                duration: 4
            });

            // return router.push(`/order/${res.newOrder._id}`);
        })  
    };

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
                    label="H??? v?? T??n"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng ghi h??? v?? t??n c???a b???n !',
                        },
                    ]}
                    hasFeedback
                >
                    <Input type="text" min={0} max={100000} placeholder="Name"/>
                </Form.Item>

                <Form.Item
                    style={{ width: "100%" }}
                    label="S??? ??i???n Tho???i"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng ghi s??? ??i???n tho???i c???a b???n !',
                        },
                    ]}
                    hasFeedback
                >
                    <Input type="text" min={0} max={10} placeholder="Number Phone"/>
                </Form.Item>

                <Form.Item
                    style={{ width: "100%" }}
                    label="T???nh/Th??nh ph???"
                    name="city"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng ch???n t???nh ho???c th??nh ph??? b???n ??? !',
                        },
                    ]}
                    hasFeedback
                    
                >
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="T???nh/Th??nh Ph???"
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
                    label="Huy???n/Qu???n"
                    name="districts"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng ch???n huy???n ho???c qu???n b???n ??? !',
                        },
                    ]}
                    hasFeedback
                >
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Huy???n/Qu???n"
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
                    label="X??/Ph?????ng"
                    name="wards"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng ch???n x?? ho???c ph?????ng b???n ??? !',
                        },
                    ]}
                    hasFeedback
                >
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="X??/Ph?????ng"
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
                    label="S??? nh??, T??n ???????ng"
                    name="street"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng ghi r?? ?????a ch??? !',
                        },
                    ]}
                >
                    <TextArea 
                        rows={3} 
                        maxLength={300}
                        placeholder="?????a ch??? c??? th??? nh?? s??? nh??, t??n ???????ng, ..."/>
                </Form.Item>

                <Form.Item
                    style={{ width: "100%" }}
                    label="Ph????ng th???c thanh to??n"
                    name="payment"
                    rules={[
                        {
                            required: true,
                            message: 'Vui l??ng ch???n ph????ng th???c thanh to??n m?? b???n mu???n !',
                        },
                    ]}
                >   
                    <Radio.Group onChange={onChange} value={valueRadio}>
                        <Radio value={1}>Thanh to??n khi nh???n h??ng</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item>
                    <Button block
                        type="primary"
                        danger
                        htmlType="submit">
                        ?????t h??ng ngay
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}