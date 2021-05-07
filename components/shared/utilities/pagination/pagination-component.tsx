import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

type PropsType = {
    limit?: number
    page?: number
    total?: number
    firstButtonClass?: string
    lastButtonClass?: string
    prevButtonClass?: string
    nextButtonClass?: string
    pageActiveButtonClass?: string
    dotsButtonClass?: string
    firstButtonContent?: string | JSX.Element
    lastButtonContent?: string | JSX.Element
    prevButtonContent?: string | JSX.Element
    nextButtonContent?: string | JSX.Element
    dotsButtonContent?: string | JSX.Element
}

const DEFAULTBUTTONCLASS = "flex items-center justify-center cursor-pointer focus:outline-none rounded-full p-2 w-10 h-10 font-semibold text-gray-700 bg-gray-200 hover:text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 transition ease-linear duration-200"

export default function PaginationComponent({
    firstButtonClass = `${DEFAULTBUTTONCLASS}`,
    lastButtonClass = `${DEFAULTBUTTONCLASS}`,
    prevButtonClass = `${DEFAULTBUTTONCLASS}`,
    nextButtonClass = `${DEFAULTBUTTONCLASS}`,
    dotsButtonClass = `${DEFAULTBUTTONCLASS}`,
    pageActiveButtonClass = `rounded-full focus:outline-none p-2 w-10 h-10 font-semibold bg-red-600 text-white`,
    firstButtonContent = <FaAngleDoubleLeft/>,
    lastButtonContent = <FaAngleDoubleRight/>,
    prevButtonContent = <GrFormPrevious/>,
    nextButtonContent = <GrFormNext/>,
    dotsButtonContent = "...",

    ...props}: PropsType): JSX.Element {

    
    const [pages, setPages] = useState([1, 2, 3, 4, '...', 5, 6, 7, 8]);
    

    return (
        <> 
            <div className="flex justify-center space-x-3 mb-10">
                <button className={`${firstButtonClass}`}>{firstButtonContent}</button>
                { pages.map((page, index) => 
                    <button key={index} className={`${ page === 1 ? pageActiveButtonClass : DEFAULTBUTTONCLASS}`}>{page}</button>
                )}
                <button className={`${lastButtonClass}`}>{lastButtonContent}</button>
            </div>
        </>
    )
}