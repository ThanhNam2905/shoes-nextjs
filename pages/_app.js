import React from 'react'
import '../public/assets/css/style.css';
import '../public/assets/css/base.css';
import '../public/assets/css/utilities.css';
import { DataProvider } from '../store/GlobalState';
import { ToastProvider } from 'react-toast-notifications';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};

  return (
    <>
      <ToastProvider
        autoDismiss={true}
        autoDismissTimeout={4000}
        placement="bottom-center"
      >
        <DataProvider>
          <Layout {...layoutProps}>
            <Component {...pageProps}/>
          </Layout>
        </DataProvider> 
      </ToastProvider> 
    </>
  )
}

export default MyApp
