import { Footer } from './default-layout/footer';
import { HeadSEO } from './head-seo';
import { Header } from './default-layout/header/header';

export function DefaultLayout(props) {
    return (
        <>
            <HeadSEO title="Ecommerce Shop" href="https://res.cloudinary.com/fpt-shoftware/image/upload/v1627310382/nextjs-media/favicon_ho4phc.png"/>

            <Header/>
            <div className="w-full" style={{ minHeight: "60vh" }}>
                { props.children }
            </div>
            <Footer/>
        </>
    )
}