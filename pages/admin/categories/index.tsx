import Head from "next/head";
import CategoriesAdminPage from "../../../components/admin/categories/categories-admin-page";
import { AdminLayout } from "../../../layouts/admin-layout";

export default function CategoryManagerAdmin(props) {
    return (
        <>
            <Head>
                <title>Category Manager</title>
            </Head>

            <CategoriesAdminPage/>
        </>
    )
}

CategoryManagerAdmin.Layout = AdminLayout;
