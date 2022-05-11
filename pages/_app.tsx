import React from "react";
import type {AppProps} from 'next/app'
import '../styles/globals.css'
import {CacheProvider, EmotionCache} from '@emotion/react';
import {ThemeProvider, CssBaseline, createTheme} from '@mui/material';
import createEmotionCache from '../Utility/createEmotionCache';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.css';
import {appWithTranslation} from 'next-i18next';
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Layouts from "../components/layouts";



const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {

    return (
        <Provider store={store}>
            <Layouts>
                <Component {...pageProps} />
            </Layouts>
        </Provider>
    )
}

export default appWithTranslation(MyApp)
