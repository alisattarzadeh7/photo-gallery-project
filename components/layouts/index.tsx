    import type {NextPage} from 'next'
    import {createTheme, CssBaseline, TextField, ThemeProvider} from "@mui/material";
    import Header from "./Header";
    import Footer from "./Footer";
    import {CacheProvider} from "@emotion/react";
    import React from "react";
    import lightThemeOptions from "../../styles/theme/lightThemeOptions";
    import createCache from '@emotion/cache';
    import rtlPlugin from 'stylis-plugin-rtl';
    import { prefixer } from 'stylis';
    import { useTranslation } from 'next-i18next';
    import useIsLtr from "../../hooks/useIsLtr";
    import useSession from "../../hooks/useSession";


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

    const index: NextPage<layoutPropsType> = ({children}) => {

        const isLtr = useIsLtr()

        return (<>
            <CacheProvider value={isLtr  ? cacheLtr : cacheRtl}>
                <ThemeProvider theme={lightTheme}>
                    <CssBaseline/>
                    <div dir={isLtr ? 'ltr' : 'rtl'} >
                        <Header/>
                        <div />
                        <div style={{height:'100vh'}}>
                            {children}
                        </div>
                        <Footer/>
                    </div>
                </ThemeProvider>
            </CacheProvider>
        </>)
    }

    export default index