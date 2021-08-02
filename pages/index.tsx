import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DefaultLayout } from '../layouts/default-layout';
import { data } from '../utils/fetchData/productData';

export function Index() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/home");
    }, []);

    return null;
}

Index.Layout = DefaultLayout;

