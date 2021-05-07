import { NextSeo } from "next-seo";
import { HomePage } from "../components/index/home/home-page";
import { DefaultLayout } from "../layouts/default-layout";

export default function Home(props) {
    return (
        <>
            <NextSeo {...props.seo} />
            <HomePage />
        </>
    )
}

Home.Layout = DefaultLayout;

