import AdminPage from "../../components/admin/AdminPage";
import { AdminLayout } from "../../layouts/admin-layout";

export default function Admin(props) {
    return (
        <>
            <AdminPage/>
        </>
    )
}

Admin.Layout = AdminLayout;