import { HomePage } from "../components/index/home/home-page";
import { DefaultLayout } from "../layouts/default-layout";
import { getData } from '../utils/fetchData';
import { useEffect, useState } from "react";
export default function Home(props) {

    const [products, setProducts] = useState(props.products);
    useEffect(() => {
        setProducts(props.products)
    }, [props.products]);

    return (
        <>
            <HomePage products={products}/>
        </>
    )
}

Home.Layout = DefaultLayout;

export async function getServerSideProps({query}) {
    const page = query.page || 1;
    const category = query.category || 'all';
    const sort = query.sort || '';
    const search = query.search || 'all';
    
    const res = await getData(`product?limit=${page * 8}&category=${category}&sort=${sort}&name=${search}`);
    return {
        props: {
            products: res.products,
            result: res.result
        }
    }
}

