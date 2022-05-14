import type { NextPage } from 'next';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import React, { useEffect } from 'react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { useRouter } from 'next/router';
import lightThemeOptions from '../../styles/theme/lightThemeOptions';
import Footer from './Footer';
import Header from './Header';
import useIsLtr from '../../hooks/useIsLtr';
import useSession from '../../hooks/useSession';

interface layoutPropsType {
    children: React.ReactElement
}

const lightTheme = createTheme(lightThemeOptions);

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
    key: 'muiltr',
    stylisPlugins: [prefixer],
});

const index: NextPage<layoutPropsType> = ({ children }) => {
    const isLtr = useIsLtr();
    const { token } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!token && router.asPath !== '/register') router.push('/login');
    }, []);

    return (
        <>
            <CacheProvider value={isLtr ? cacheLtr : cacheRtl}>
                <ThemeProvider theme={lightTheme}>
                    <CssBaseline />
                    <div dir={isLtr ? 'ltr' : 'rtl'}>
                        <Header />
                        <div />
                        <div style={{ height: '100vh' }}>
                            {children}
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </CacheProvider>
        </>
    );
};

export default index;
