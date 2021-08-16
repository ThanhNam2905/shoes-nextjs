import { useRouter } from 'next/router';
import { DefaultLayout } from '../layouts/default-layout';
import { useEffect } from "react";
export function Index() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/home");
    }, []);

    return null;
}

Index.Layout = DefaultLayout;

