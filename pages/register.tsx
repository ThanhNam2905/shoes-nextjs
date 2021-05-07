import RegisterPage from "../components/index/register/register-page";
import { DefaultLayout } from "../layouts/default-layout";

export default function Register(props) {
    return (
        <>
            <RegisterPage/>
        </>
    )
}

Register.Layout = DefaultLayout;