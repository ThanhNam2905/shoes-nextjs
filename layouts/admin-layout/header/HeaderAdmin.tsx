import { AiOutlineBell, AiOutlineSetting } from "react-icons/ai";
// Ant Design
import { Avatar, Tooltip } from 'antd';
import { useContext } from "react";
import { DataContext } from "../../../store/GlobalState";

export default function HeaderAdmin() {

    const { state } = useContext(DataContext);
    const { auth } = state;

    return (
        <>
            <div className="header-admin__content w-full flex items-center h-full">
                <div className="header-admin__logo w-1/5 h-full flex items-center justify-center pr-5">
                    <img src="https://res.cloudinary.com/fpt-shoftware/image/upload/v1627237997/nextjs-media/admint-lite_bdgn1y.svg" 
                    alt="logo" className="w-14 h-14 object-fit"  />
                    <p className="text-24 mb-0">Dashboard</p>
                </div>
                <div className="header-admin__option w-4/5 h-full px-9 flex items-center justify-end space-x-4">
                    <i className="icon-setting p-2.5 hover:bg-blue-100 hover:text-blue-600 rounded-md transition ease-linear duration-200 cursor-pointer">
                        <AiOutlineSetting className="text-22"/>
                    </i>
                    <i className="icon-notification p-2.5 hover:bg-blue-100 hover:text-blue-600 rounded-md transition ease-linear duration-200 cursor-pointer">
                        <AiOutlineBell className="text-22"/>
                    </i>
                    <div className="avatar-admin">
                        {
                            Object.keys(auth).length > 0 &&
                            <Tooltip placement="bottom" title="Avatar">
                                <Avatar size={45}
                                    src={ <img src={auth.user.avatar} alt={auth.user.avatar}/>}/>       
                            </Tooltip>
                            
                        }
                        
                    </div>
                </div>
            </div>
        </>
    )
}