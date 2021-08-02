
import { HomePage } from "../components/index/home/home-page";
import { DefaultLayout } from "../layouts/default-layout";

export default function Home(props) {
    return (
        <>
            <HomePage />
        </>
    )
}

Home.Layout = DefaultLayout;

