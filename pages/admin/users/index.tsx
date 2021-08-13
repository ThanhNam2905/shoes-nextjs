import Head from "next/head";
import UserAdminPage from "../../../components/admin/users/user-admin-page";
import { AdminLayout } from "../../../layouts/admin-layout";

export default function UserManagerAdmin(props) {
    return (
        <>
            <Head>
                <title>Users Manager</title>
            </Head>
            
            <UserAdminPage/>
        </>
    )
}

UserManagerAdmin.Layout = AdminLayout;