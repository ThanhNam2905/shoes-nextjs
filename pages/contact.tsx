import ContactPage from "../components/index/contact/contact-page";
import { DefaultLayout } from "../layouts/default-layout";

export default function Contact(props) {
    return (
        <>
            <ContactPage/>
        </>
    )
}

Contact.Layout = DefaultLayout;