import { useRouter } from "next/router";
import { useContext, useEffect } from "react"
import { DataContext } from "../../store/GlobalState"


export default function AdminPage() {

    const { state } = useContext(DataContext);
    const { auth } = state;
    const router = useRouter();

    useEffect(() => {
        if(Object.keys(auth).length === 0 || auth.user.role !== "admin") {
            router.push("/login");
        }
    }, [auth.user]);
    
    useEffect(() => {
        router.prefetch("/login");
    }, []);

    return (
        <>
            <div className="bg-white border-b border-blue-100" style={{ minHeight: "81vh"}}>
                <p>Content Admin</p>
            </div>
        </>
    )
}