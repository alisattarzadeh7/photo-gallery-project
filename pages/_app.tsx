import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import { cssTransition, ToastContainer } from 'react-toastify';
import {
    persistStore,
} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { store } from '../redux/store';
import Layouts from '../components/layouts';
import 'react-toastify/dist/ReactToastify.css';

const swirl = cssTransition({
    enter: 'swirl-in-fwd',
    exit: 'swirl-out-bck',
});

const persistor = persistStore(store);
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
                <Layouts>
                    <Component {...pageProps} />
                </Layouts>

                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    style={{ height: 50 }}
                    draggable
                    pauseOnHover
                    transition={swirl}

                />
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </PersistGate>
    </Provider>
);

export default appWithTranslation(MyApp);
