import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DefaultLayout } from '../layouts/default-layout';

export function Index() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/home");
    }, []);

    return null;
}

Index.Layout = DefaultLayout;

