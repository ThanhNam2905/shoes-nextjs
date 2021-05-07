import { AboutPage } from "../components/index/about/about-page";
import { DefaultLayout } from "../layouts/default-layout";

export default function About(props) {
    return (
        <>
            <AboutPage/>
        </>
    )
}

About.Layout = DefaultLayout;