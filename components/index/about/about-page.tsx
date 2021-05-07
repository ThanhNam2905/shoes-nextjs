import Link from 'next/link';
import Head from 'next/head';
import AboutContent from "./components/about-content";
import AboutUs from "./components/about-us";
import AboutInfo from "./components/about-info";
import { ScrollToTopBtn } from "../../shared/utilities/scrollToTop/scrollToTop";
import Breadcrumbs from '../../shared/utilities/breadcrumbs/breadcrumbs';
import { useState } from 'react';

export function AboutPage(props) {
    const [breadcrumbs, setBreadcrumbs] = useState([
        { href: "/home", label: "Trang chủ"},
        { label: "Liên hệ"},
    ]);
    return (
        <>
            <Head>
                <title>About Page</title>
            </Head>
            {/* Button ScrollToTop */}
            <ScrollToTopBtn/>

            {/* Breadcrumb */}
            <Breadcrumbs title="Liên hệ" breadcrumbs={breadcrumbs}/>

            {/* About Content */}
            <AboutContent/>
            
            {/* About Us */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 xs:px-6 sm:px-8 md:px-10 lg:px-14 py-14 lg:py-16">
                <AboutUs/>
            </div>

            {/* About Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 px-4 sm:px-8 md:px-10 lg:px-14 py-12 lg:py-16 gap-6 mx-4 border-t border-gray-100">
                <AboutInfo/>
            </div>
        </>
    )
}