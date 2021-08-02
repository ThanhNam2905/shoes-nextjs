import React from 'react';
import Head from 'next/head';

type PropsType = {
    [x: string]: any;
    title: string;
    href: string;
}

export function HeadSEO({ title, href }: PropsType) {
    return (
        <Head>
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0"
            />
            <link rel="icon" href={href} />
            <title>{title}</title>
        </Head>
    )
}