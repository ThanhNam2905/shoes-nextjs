import { Footer } from './default-layout/footer';
import { HeadSEO } from './default-layout/header-seo';
import { Header } from './default-layout/header/header';

export function DefaultLayout(props) {
    return (
        <>
            <HeadSEO/>

            <Header/>
            <div className="w-full" style={{ minHeight: "60vh" }}>
                { props.children }
            </div>
            <Footer/>
        </>
    )
}