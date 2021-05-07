import NotFoundPage from "../components/index/404/404-page";
import { DefaultLayout } from "../layouts/default-layout";

export default function NotFound(props) {
    return (
        <>
            <NotFoundPage/>
        </>
    )
}

NotFound.Layout = DefaultLayout;