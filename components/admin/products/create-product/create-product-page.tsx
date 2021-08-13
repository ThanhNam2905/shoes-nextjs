import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../../store/GlobalState";
import { imageUploadProduct } from '../../../../utils/imageUploadProduct';

// Ant Design
import { Form, Input, Button, Checkbox, InputNumber, Select, Radio, Row, Col, Upload, message, notification } from 'antd';
import ImgCrop from 'antd-img-crop';
import { CameraOutlined, PlusOutlined } from '@ant-design/icons';
import { postData } from "../../../../utils/fetchData";

export default function CreateProductPage(props) {

    const listSizes = ["32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47"];
    const initialState = {
        name: '',
        code: '',
        description: '',
        infoProduct: '',
        category: '',
        productType: '',
        productLine: '',
        sizes: [],
        material: '',
        colors: '',
        gender: '',
        tagProduct: [],
        accessories: '',
        price: 0,
        discount: 0,
        inStock: 0,
        
    }
    const [product, setProduct] = useState(initialState);
    const {  price, discount, inStock } = product;

    const { state, dispatch } = useContext(DataContext);
    const { categories, auth } = state;

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Antd Component Form Create-Product
    const { Option } = Select;
    const { TextArea } = Input;
    const layout = {
        labelCol: {
            span: 24,
        },
        wrapperCol: {
            span: 24,
        },
    };
    const [form] = Form.useForm();
    form.setFieldsValue({
        discountProduct: discount,
        priceProduct: price,
        inStockProduct: inStock
    })

    const handleChangeImage = async ({ fileList: newFileList }) => {        
        newFileList.forEach(file => {
            if(file.size > 1024 * 1024) {
                message.error("Kích thước hình ảnh lớn nhất là 1mb");
            }
            if(file.type !== "image/jpeg" && file.type !== "image/png"  && file.type !== "image/jpg") {
                message.error("Định dạng tệp hình ảnh không chính xác.");
            }
        })
        await setImages(newFileList);
    };
    
    // Feature Create a new Product
    const onSubmitFormAddProduct = async (values) => {
        // console.log(values);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 14000);

        const { name, code, productType, productLine, material, infoProduct, gender, description, colors, category, accessories, sizes, tagProduct, priceProduct, discountProduct, inStockProduct} = values;
        
        if(auth.user.role !== 'admin') {
            message.error("Authnentication is not valid")
        }

        let media = [];
        const imgNewURL = images.filter(img => !img.url);
        const imgOldURL = images.filter(img => img.url);

        if(imgNewURL.length > 0) {
            media = await imageUploadProduct(imgNewURL);
        }
        
        const res = await postData('product', {
            ...product, 
            name: name,
            code: code,
            productType: productType,
            productLine: productLine,
            material: material,
            infoProduct: infoProduct,
            gender: gender,
            description: description,
            colors: colors,
            category: category,
            accessories: accessories,
            sizes: sizes,
            tagProduct: tagProduct,
            discount: discountProduct,
            price: priceProduct,
            inStock: inStockProduct,
            images: [...imgOldURL, ...media]}, auth.token);
        if(res.error) {
            notification.error({
                message: "Thông báo",
                description: res.error
            })
        }
        else {
            notification.success({
                message: "Thông báo",
                description: res.msg
            })
        }
        form.resetFields(["name"]); form.resetFields(["code"]); form.resetFields(["productType"]); form.resetFields(["productLine"])
        form.resetFields(["material"]); form.resetFields(["infoProduct"]); form.resetFields(["gender"]); form.resetFields(["description"])
        form.resetFields(["colors"]); form.resetFields(["category"]); form.resetFields(["accessories"]); form.resetFields(["sizes"])
        form.resetFields(["tagProduct"]);
        setImages([]);
    };

    const handleChangeDiscount = async (value) => {
        await setProduct({...product, discount: value})
    }
    const handleChangeInStock = async (value) => {
        await setProduct({...product, inStock: value})
    }
    const handleChangeProductPrice = async (value) => {
        await setProduct({...product, price: value})
    }

    const onPreviewImg = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };


    return (
        <>
            <div className="group-create-product  pt-4 pb-8 px-10" style={{ minHeight: "80vh" }}>
                <div className="group-form-create-products bg-white border border-gray-400 py-6 px-8 mt-6 rounded-md">
                    <h2 className="text-center text-24 uppercase font-medium mb-6">Thêm mới sản phẩm</h2>
                    
                    <Form
                        name="create-product"
                        form={form}
                        {...layout}
                        initialValues={{ remember: true }}
                        onFinish={onSubmitFormAddProduct}
                        >
                            <div className="flex space-x-8">
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Tên sản phẩm"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Tên sản phẩm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input type="text" min={0} max={200} placeholder="Tên sản phẩm"/>
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Mã sản phẩm"
                                    name="code"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mã sản phẩm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input type="text" min={0} max={200} placeholder="Mã sản phẩm"/>
                                </Form.Item>
                            </div>
                            <div className="flex space-x-8">
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Loại sản phẩm"
                                    name="productType"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Loại sản phẩm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input type="text" min={0} max={200} placeholder="Loại sản phẩm"/>
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Dòng sản phẩm"
                                    name="productLine"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Dòng sản phẩm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input type="text" min={0} max={200} placeholder="Dòng sản phẩm"/>
                                </Form.Item>
                            </div>
                            <div className="flex space-x-8">
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Chất liệu sản phẩm"
                                    name="material"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Chất liệu sản phẩm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input type="text" min={0} max={200} placeholder="Chất liệu sản phẩm"/>
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Màu sắc"
                                    name="colors"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Màu sắc sản phẩm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input type="text" min={0} max={200} placeholder="Màu sắc"/>
                                </Form.Item>
                            </div>
                            
                            <div className="flex space-x-8 items-center">
                                <div className="flex space-x-5 w-1/2">
                                    <Form.Item
                                        style={{ width: "100%" }}
                                        label="Giảm giá"
                                        name="discountProduct"
                                        hasFeedback
                                    >
                                        <InputNumber min={0} max={100} 
                                                    className="input-discount"
                                                    formatter={value => `${value}%`}
                                                    parser={value => value.replace('%', '')} 
                                                    onChange={handleChangeDiscount}/>
                                    </Form.Item>
                                    <Form.Item
                                        style={{ width: "100%" }}
                                        label="Số lượng trong kho"
                                        name="inStockProduct"
                                        rules={[
                                            {
                                                required: inStock === 0 ? true : false,
                                                message: 'Số lượng trong kho không được để trống!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <InputNumber min={0}
                                                    className="input-inStock"
                                                    onChange={handleChangeInStock}
                                                    />
                                    </Form.Item>
                                </div>
                                <div className="item-price-product w-1/2">
                                    <Form.Item
                                        style={{ width: "100%" }}
                                        label="Giá tiền sản phẩm"
                                        name="priceProduct"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Giá tiền sản phẩm không được để trống!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <InputNumber min={0}
                                                    max={999999999}
                                                    className="input-price-product"
                                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')} 
                                                    onChange={handleChangeProductPrice}/>
                                    </Form.Item>
                                </div>
                            </div>
                            
                            <div>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Phụ kiện đi kèm"
                                    name="accessories"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Phụ kiện đi kèm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input type="text" min={0} max={200} placeholder="Phụ kiện"/>
                                </Form.Item>
                            </div>
                            
                            <div className="flex space-x-8">
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Danh mục sản phẩm"
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Danh mục sản phẩm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Select
                                        showSearch
                                        style={{ width: "100%" }}
                                        placeholder="Vui lòng chọn danh mục sản phẩm"
                                        optionFilterProp="children"
                                        
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        { categories.length > 0 &&
                                            categories.map(category => (
                                                <Option value={category.name} key={category._id}>{category.name}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Giới tính"
                                    name="gender"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Giới tính không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Radio.Group className="flex space-x-1">
                                        <Radio value="Male">Nam</Radio>
                                        <Radio value="Female">Nữ</Radio>
                                        <Radio value="Unisex">Unisex</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Tag sản phẩm"
                                    name="tagProduct"
                                    hasFeedback
                                >
                                    <Checkbox.Group className="flex space-x-3">
                                        <Checkbox value="New">New</Checkbox>
                                        <Checkbox value="Sale">Sale</Checkbox>
                                    </Checkbox.Group>
                                </Form.Item> 
                            </div>

                            <div className="group-checkbox-size">
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Chọn Size"
                                    name="sizes"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Kích thước sản phẩm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Checkbox.Group style={{ width: '100%' }}>
                                        <Row>
                                            {
                                                listSizes.length > 0 &&
                                                    listSizes.map((size, index) => (
                                                        <Col span={6} key={index}>
                                                            <Checkbox value={size}>{size}</Checkbox>
                                                        </Col>
                                                    ))
                                            }
                                        </Row>
                                    </Checkbox.Group>
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Tải ảnh lên"
                                    rules={[
                                        {
                                            required: images.length === 0 ? true: false,
                                            message: 'Ảnh sản phẩm không được để trống!',
                                        },
                                        {
                                            required: images.length > 4 ? true : false,
                                            message: 'Chỉ chọn được tối đa 4 ảnh!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <ImgCrop rotate>
                                        <Upload
                                            listType="picture-card"
                                            accept=".jpg, .png, .jpeg"
                                            onChange={handleChangeImage}
                                            onPreview={onPreviewImg}
                                        >
                                            {
                                                images.length < 4 && 
                                                    <Button
                                                        type="dashed"
                                                        className="btn-upload-img-product"
                                                        icon={<CameraOutlined className="text-18" />}>
                                                        Tải ảnh lên
                                                    </Button>
                                            }
                                        </Upload>
                                    </ImgCrop>
                                    <p className="text-gray-400 text-14 text-center font-semibold mt-4">(Dung lượng tối đa của ảnh 1MB và định dạng file: .PNG, .JPG, .JPEG)</p>
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Mô tả sản phẩm"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Mô tả sản phẩm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <TextArea showCount rows={4} maxLength={1000000}/>
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Thông tin sản phẩm"
                                    name="infoProduct"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Thông tin sản phẩm không được để trống!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <TextArea rows={8}/>
                                </Form.Item>
                            </div>
                        
                            <Form.Item>
                                <Button block
                                    className="btn-create-product"
                                    type="primary"
                                    icon={<PlusOutlined className="text-20"/>}
                                    loading={loading}
                                    htmlType="submit">
                                    Thêm sản phẩm
                                </Button>
                            </Form.Item>
                    </Form>
                </div>
                
            </div>
        </>
    )
}