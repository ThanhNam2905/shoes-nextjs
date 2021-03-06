// Ant Design
import { Form, Input, Button, Checkbox, InputNumber, Select, Radio, Row, Col, Upload, Image, message, notification } from 'antd';
import { CameraOutlined, EditOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

// NextJS
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { getData, putData } from '../../../../utils/fetchData';
import { DataContext } from '../../../../store/GlobalState';
import { imageUploadProduct } from '../../../../utils/imageUploadProduct';

interface Window {
    Image: {
        prototype: HTMLImageElement;
        new (): HTMLImageElement;
    }
}

export default function EditProductPage(props) {

    const router = useRouter();
    const { id } = router.query;
    const { state } = useContext(DataContext);
    const { categories, auth } = state;


    const optionSizes = ["32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48"];
    const [product, setProduct] = useState({
        name: '',
        code: '',
        description: '',
        infoProduct: '',
        category: '',
        productType: '',
        productLine: '',
        sizes: [],
        images: [],
        material: '',
        colors: '',
        gender: '',
        tagProduct: [],
        accessories: '',
        price: 0,
        discount: 0,
        inStock: 0,
    });

    useEffect(() => {
        if(id) {
            getData(`product/${id}`).then(res => {
                setProduct({
                    name: res.product.name,
                    code: res.product.code,
                    description: res.product.description,
                    infoProduct: res.product.infoProduct,
                    category: res.product.category,
                    productType: res.product.productType,
                    productLine: res.product.productLine,
                    sizes: res.product.sizes,
                    images: res.product.images,
                    material: res.product.material,
                    colors: res.product.colors,
                    gender: res.product.gender,
                    tagProduct: res.product.tagProduct,
                    accessories: res.product.accessories,
                    price: res.product.price,
                    discount: res.product.discount,
                    inStock: res.product.inStock,
                });
            })
        }
    }, [id]);

    const { name, code, description, infoProduct, category, productType, productLine, material, colors, gender,
        accessories, sizes, images, tagProduct, discount, price, inStock } = product;

    const [fileListImg, setFileListImg] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(product) {
            form.setFieldsValue({
                name: name,
                code: code,
                description: description,
                infoProduct: infoProduct,
                category: category,
                productType: productType,
                productLine: productLine,
                material: material,
                colors: colors,
                gender: gender,
                accessories: accessories,
                tagProduct: tagProduct,
                sizes: sizes,
                discountProduct: discount,
                priceProduct: price,
                inStockProduct: inStock,
            })
            setFileListImg(images);
            
        }
    }, [product]);

    // Antd Component Form Edit-Product
    const [form] = Form.useForm();
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

    const onPreviewImg = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new window.Image() ;
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    const handleChangeDiscount = async (value) => {
        await form.setFieldsValue({
            discountProduct: value
        })
    }
    const handleChangeInStock = async (value) => {
        await form.setFieldsValue({
            inStockProduct: value
        })
    }
    const handleChangeProductPrice = async (value) => {
        await form.setFieldsValue({
            priceProduct: value
        })
    }

    const handleChangeImage = async (files) => { 
        const { file, fileList } = files;
        if(id) {
            // Delete Image
            if(file && fileList.length > 0 && file.status === "removed") {
                const newListImage = [...fileListImg];
                const index = newListImage.findIndex(img => img.uid === file.uid);
                newListImage.splice(index, 1);
                setFileListImg(newListImage);
            }
            // Add Image
            setFileListImg(fileList);
        }
    };

    // Feature Edit Product
    const onSubmitFormEditProduct = async (values) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 7000);

        const { name, code, productType, productLine, material, infoProduct, gender, description, colors, category, accessories, sizes, tagProduct, priceProduct, discountProduct, inStockProduct } = values;
        
        if(auth.user.role !== 'admin') {
            message.error("Authentication is not valid");
        }

        let media = [];
        const imgNewURL = fileListImg.filter(img => !img.url);
        const imgOldURL = fileListImg.filter(img => img.url);
        if(imgNewURL.length > 0) {
            media = await imageUploadProduct(imgNewURL);
        }

        const res = await putData(`product/${id}`, {
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
            images: [...imgOldURL, ...media]
        }, auth.token);
        if(res.error) {
            notification.error({
                message: "Th??ng b??o",
                description: res.error
            })
        }
        notification.success({
            message: "Th??ng b??o",
            description: res.msg
        })
    }

    return (
        <>
            <div className="group-create-product  pt-4 pb-8 px-10" style={{ minHeight: "80vh" }}>
                <div className="group-form-create-products bg-white border border-gray-400 py-6 px-8 mt-6 rounded-md">
                    <h2 className="text-center text-24 uppercase font-medium mb-6">Edit s???n ph???m</h2>

                    {/* Form Edit Product */}
                    <Form
                        name="create-product"
                        form={form}
                        {...layout}
                        initialValues={{ remember: true }}
                        onFinish={onSubmitFormEditProduct}
                    >
                        <div className="flex space-x-8">
                            <Form.Item
                                style={{ width: "100%" }}
                                label="T??n s???n ph???m"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'T??n s???n ph???m kh??ng ???????c ????? tr???ng!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="text" min={0} />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                label="M?? s???n ph???m"
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'M?? s???n ph???m kh??ng ???????c ????? tr???ng!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="text" min={0} max={200} placeholder="M?? s???n ph???m" />
                            </Form.Item>
                        </div>

                        <div className="flex space-x-8">
                            <Form.Item
                                style={{ width: "100%" }}
                                label="Lo???i s???n ph???m"
                                name="productType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Lo???i s???n ph???m kh??ng ???????c ????? tr???ng!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="text" min={0} max={200} placeholder="Lo???i s???n ph???m" />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                label="D??ng s???n ph???m"
                                name="productLine"
                                rules={[
                                    {
                                        required: true,
                                        message: 'D??ng s???n ph???m kh??ng ???????c ????? tr???ng!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="text" min={0} max={200} placeholder="D??ng s???n ph???m" />
                            </Form.Item>
                        </div>

                        <div className="flex space-x-8">
                            <Form.Item
                                style={{ width: "100%" }}
                                label="Ch???t li???u s???n ph???m"
                                name="material"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Ch???t li???u s???n ph???m kh??ng ???????c ????? tr???ng!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="text" min={0} max={200} placeholder="Ch???t li???u s???n ph???m" />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                label="M??u s???c"
                                name="colors"
                                rules={[
                                    {
                                        required: true,
                                        message: 'M??u s???c s???n ph???m kh??ng ???????c ????? tr???ng!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="text" min={0} max={200} placeholder="M??u s???c" />
                            </Form.Item>
                        </div>

                        <div className="flex space-x-8 items-center">
                            <div className="flex space-x-5 w-1/2">
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="Gi???m gi??"
                                    name="discountProduct"
                                    hasFeedback
                                >
                                    <InputNumber min={0} max={100}
                                        className="input-discount"
                                        formatter={value => `${value}%`}
                                        parser={value => value.replace('%', '')}
                                        onChange={handleChangeDiscount} />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "100%" }}
                                    label="S??? l?????ng trong kho"
                                    name="inStockProduct"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'S??? l?????ng trong kho kh??ng ???????c ????? tr???ng!',
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
                                    label="Gi?? ti???n s???n ph???m"
                                    name="priceProduct"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Gi?? ti???n s???n ph???m kh??ng ???????c ????? tr???ng!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <InputNumber min={0}
                                        max={999999999}
                                        className="input-price-product"
                                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={handleChangeProductPrice} />
                                </Form.Item>
                            </div>
                        </div>
                    
                        <div>
                            <Form.Item
                                style={{ width: "100%" }}
                                label="Ph??? ki???n ??i k??m"
                                name="accessories"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Ph??? ki???n ??i k??m kh??ng ???????c ????? tr???ng!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input type="text" min={0} max={200} placeholder="Ph??? ki???n"/>
                            </Form.Item>
                        </div>

                        <div className="flex space-x-8">
                            <Form.Item
                                style={{ width: "100%" }}
                                label="Danh m???c s???n ph???m"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Danh m???c s???n ph???m kh??ng ???????c ????? tr???ng!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder="Vui l??ng ch???n danh m???c s???n ph???m"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {   categories.length > 0 &&
                                            categories.map(item => (
                                                <Option value={item.name} key={item._id}>{item.name}</Option>
                                            ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                label="Gi???i t??nh"
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Gi???i t??nh kh??ng ???????c ????? tr???ng!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Radio.Group className="flex space-x-1">
                                    <Radio value="Male">Nam</Radio>
                                    <Radio value="Female">N???</Radio>
                                    <Radio value="Unisex">Unisex</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%" }}
                                label="Tag s???n ph???m"
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
                                label="Ch???n Size"
                                name="sizes"
                                rules={[
                                    {
                                        required: true,
                                        message: 'K??ch th?????c s???n ph???m kh??ng ???????c ????? tr???ng!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <Row>
                                        {
                                            optionSizes.length > 0 &&
                                                optionSizes.map((size, index) => (
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
                                label="T???i ???nh l??n"
                                rules={[
                                    {
                                        required: fileListImg.length === 0 ? true: false,
                                        message: '???nh s???n ph???m kh??ng ???????c ????? tr???ng!',
                                    },
                                    {
                                        required: fileListImg.length > 4 ? true : false,
                                        message: 'Ch??? ch???n ???????c t???i ??a 4 ???nh!',
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
                                        fileList={fileListImg}
                                        maxCount={4}
                                        multiple
                                    >
                                        {
                                            fileListImg.length < 4 && 
                                                <Button
                                                type="dashed"
                                                className="btn-upload-img-product"
                                                icon={<CameraOutlined className="text-18" />}>
                                                T???i ???nh l??n
                                            </Button>
                                                
                                        }
                                        
                                    </Upload>
                                </ImgCrop>
                                <p className="text-gray-400 text-14 text-center font-semibold mt-4">(Dung l?????ng t???i ??a c???a ???nh 1MB v?? ?????nh d???ng file: .PNG, .JPG, .JPEG)</p>
                            </Form.Item>
                        </div>

                        <div>
                            <Form.Item
                                style={{ width: "100%" }}
                                label="M?? t??? s???n ph???m"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'M?? t??? s???n ph???m kh??ng ???????c ????? tr???ng!',
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
                                label="Th??ng tin s???n ph???m"
                                name="infoProduct"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Th??ng tin s???n ph???m kh??ng ???????c ????? tr???ng!',
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
                                icon={<EditOutlined className="text-20"/>}
                                loading={loading}
                                htmlType="submit">
                                Edit s???n ph???m
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    )
}