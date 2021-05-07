import { MenuHeader } from "./menu-header";
import { HeaderUser } from "./header-user";
import TopHeader from "./top-header";

export function Header() {

    return (
        <>
            <TopHeader/>
            <div className="flex w-full h-24 px-4 sm:px-6 md:px-7 lg:px-14 items-center justify-between sticky top-0 z-40 bg-white bg-opacity-95 shadow-md"> 
                <MenuHeader/>
                <HeaderUser/>
            </div>
        </>
    )
}