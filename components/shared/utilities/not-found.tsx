import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";

type PropsType = {
    [x: string]: any;
    text: string;
    icon?: JSX.Element;
    href?: string;
    textHref?: string;
}

export default function NotFound({ text, icon, href, textHref }: PropsType) {
    return (
        <>
            <div className="w-full flex flex-col text-center items-center py-12 text-16 font-semibold">
                { icon && <i className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-full">{icon}</i> }
                <span className="text-18 my-8">{text || "Không tìm thấy"}</span>
                { href && (
                    <Link href={href}>
                        <a className="btn btn--back flex items-center justify-center"> 
                            <i className="mr-1 mt-0.5"><HiArrowNarrowLeft/></i>
                            Quay trở lại {textHref}
                        </a> 
                    </Link>
                )}
            </div>
        </>
    )
}