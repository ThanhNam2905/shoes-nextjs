 // Ant Design
 import { Tooltip, Drawer, Input } from 'antd';

export function Footer() {

    const { Search } = Input;


    return (
        <>
            <footer className="w-full py-20">
                <div className="flex items-center py-10 px-80 bg-gray-200">
                    <h2 className="uppercase text-18 whitespace-nowrap mb-0">Đăng ký nhận tin</h2>
                    <Search placeholder="Email của bạn" enterButton="Đăng ký" size="large" className="input-signin-mail" />
                </div>
            </footer>
        </>
    )
}