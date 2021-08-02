import ProfileAdminPage from "../../../components/admin/profile/profile-admin-page";
import { AdminLayout } from "../../../layouts/admin-layout";


export default function ProfileAdmin(props) {
    return (
        <>
            <ProfileAdminPage/>
        </>
    )
}

ProfileAdmin.Layout = AdminLayout;