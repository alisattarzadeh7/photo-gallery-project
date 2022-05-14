import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
} from 'redux-persist';
import { wrapMakeStore } from 'next-redux-cookie-wrapper';
import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['layout'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// creating store

export const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
        devTools: process.env.NODE_ENV !== 'production',
    },
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = wrapMakeStore(makeStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
