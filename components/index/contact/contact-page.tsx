import Head from "next/head";
import { useState } from "react";
import Breadcrumbs from "../../shared/utilities/breadcrumbs/breadcrumbs";
import { ScrollToTopBtn } from "../../shared/utilities/scrollToTop/scrollToTop";
import ContactForm from "./components/contact-form";
import ContactInfo from "./components/contact-info";

export default function ContactPage(props) {

    const [breadcrumbs, setBreadcrumbs] = useState([
        { href: "/home", label: "Trang chủ"},
        { label: "Khuyến mãi"}
    ]);

    return (
        <>
            <Head>
                <title>Sale Page</title>
            </Head>

            {/* Button ScrollToTop */}
            <ScrollToTopBtn/>

            {/* Breadcrumb */}
            <Breadcrumbs title="Sale" breadcrumbs={breadcrumbs}/>

            {/* Contact Map*/}

            {/* Contact Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 px-4 sm:px-9 md:px-5 lg:px-14 py-11 sm:py-12 md:py-14 lg:py-20">
                {/* Contact Info */}
                <ContactInfo/>

                <div>
                    <ContactForm/>
                </div>
            </div>
        </>
    )
}