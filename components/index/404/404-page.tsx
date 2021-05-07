import Link from "next/link";
import Head from "next/head";

export default function NotFoundPage(props) {
    return (
        <>
            <Head>
                <title>404 Page</title>
            </Head>
            <div className="text-center pt-4 pb-20">
                <p className="text-red-500 text-128 font-bold">404</p>
                <p className="uppercase text-24 my-4">OPPS! PAGE NOT BE FOUND</p>
                <p className="text-18 w-2/6 mx-auto">Sorry but the page you are looking for does not exist, have been
                    removed, name changed or is temporarily unavailable.
                </p> 
                <div className="my-6">
                    <input type="text" className="border border-gray-300 bg-gray-50 text-15 py-2 w-1/4 rounded pl-7 pr-3 mb-4" placeholder="Search..." />
                </div>
                <Link href="/home">
                    <a className="btn btn---back-home py-3 bg-red-500 hover:bg-gray-900 text-white text-12 tracking-wider">Back to home Page</a> 
                </Link>
            </div>
        </>
    )
}