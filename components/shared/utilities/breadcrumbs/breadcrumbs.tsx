import Link from 'next/link'
import { ReactPropTypes } from 'react';



type PropsType = {
    title?: string;
    breadcrumbs?: {
        href?: string;  
        label: string;
    }[];
}

export default function Breadcrumbs({ breadcrumbs, title }: PropsType) {
    return (
        <>
            { title ? (
                <div className="bg-gray-50 py-9 md:py-10 text-center tracking-wider">
                    <h1 className="capitalize text-18 md:text-5xl font-normal">{title}</h1>
                </div>
                ) : ""
            }

            {/* Breadcrumb */}
            <div className="px-14 py-4 text-left tracking-wider">
                <ul className="flex font-normal text-16 mt-1">
                    {breadcrumbs?.length > 0 && 
                        breadcrumbs.map((breadcrumb, index) => (
                            <li key={index}>
                                { breadcrumb.href ? (
                                    <>
                                        <Link href={breadcrumb.href}>
                                            <a className="hover:text-red-600">{breadcrumb.label}</a>
                                        </Link>
                                        <span className="px-1">/</span>
                                    </>
                                    ) : (
                                        <a className="text-red-600">
                                            <span>{breadcrumb.label}</span>
                                        </a>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}