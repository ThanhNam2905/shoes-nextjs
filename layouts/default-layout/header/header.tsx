import { MenuHeader } from "./component/menu-header";
import { HeaderInfo } from "./component/header-info";
import  TopHeader from "./component/top-header";

export function Header() {

    return (
        <>
            <TopHeader/>
            <div className="flex w-full h-24 px-4 sm:px-6 md:px-7 lg:px-14 items-center justify-between sticky top-0 z-40 bg-white bg-opacity-95 shadow-md"> 
                <MenuHeader/>
                <HeaderInfo/>
            </div>
        </>
    )
}