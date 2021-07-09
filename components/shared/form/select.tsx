import 'antd/dist/antd.css';
import { Select } from 'antd';

type PropsType = {
    [x: string]: any;
    placeHolder?: string;
    data?: any;
}

export default function SelectBox({ placeHolder, data } : PropsType) {

    const { Option } = Select;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }
    // console.log(data);

    return (
        <>
            <div className="flex flex-col w-full">
                <label className="">
                    <span className="text-red-600">*</span>
                    { placeHolder }
                </label>
                <Select
                    showSearch
                    style={{ width: "100%", marginTop: "10px", marginBottom: "20px"}}
                    placeholder={placeHolder}
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    { data?.length > 0 &&
                        data.map((item, index) => (
                            <Option value={item.id}>{item.name}</Option>
                        ))
                    }
                    
                    
                </Select>
            </div>
        </>
    )
}