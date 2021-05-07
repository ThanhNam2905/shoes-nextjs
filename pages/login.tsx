import LoginPage from "../components/index/login/login-page";
import { DefaultLayout } from "../layouts/default-layout";

export default function Login(props) {
    return (
        <>
            <LoginPage/>
        </>
    )
}

Login.Layout = DefaultLayout;