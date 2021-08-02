import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { HeadSEO } from './head-seo';
import HeaderAdmin from './admin-layout/header/HeaderAdmin';
import SideBarAdmin from './admin-layout/sidebar/SideBarAdmin';
import FooterAdmin from './admin-layout/footer/FooterAdmin';

export function AdminLayout(props) {

    const { Header, Footer, Sider, Content } = Layout;

    return (
        <>
            <HeadSEO title="Dashboard Admin" href="https://res.cloudinary.com/fpt-shoftware/image/upload/v1627237997/nextjs-media/admint-lite_bdgn1y.svg"/>

            <Layout>
                <Header className="header-admin">
                    <HeaderAdmin/>
                </Header>
                
                <Layout className="container-admin">
                    <Sider className="sidebar-admin">
                        <SideBarAdmin/>
                    </Sider>
                    <Content className="content-admin">
                        { props.children }
                    </Content>
                    
                </Layout>
                <Footer className="footer-admin">
                    <FooterAdmin/>
                </Footer>
            </Layout>
        </>
    )
}