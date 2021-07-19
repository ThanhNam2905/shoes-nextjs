import React from 'react'
import '../public/assets/css/style.css';
import '../public/assets/css/base.css';
import '../public/assets/css/style-ant-design.css';
import { DataProvider } from '../store/GlobalState';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};

  return (
    <>
        <DataProvider>
          <Layout {...layoutProps}>
            <Component {...pageProps}/>
          </Layout>
        </DataProvider> 
    </>
  )
}

export default MyApp
