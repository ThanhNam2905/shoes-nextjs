import React from 'react';
import Head from 'next/head';

export function HeadSEO() {
    return (
        <Head>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0"
            />
            <link rel="icon" href="/favicon.png" />
            <title>Ecommerce Shop</title>
        </Head>
    )
}