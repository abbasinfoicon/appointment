import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { docApi } from './slices/serviceApi';

export const store = configureStore({
    reducer: {
        [docApi.reducerPath]: docApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(docApi.middleware),
});

setupListeners(store.dispatch);
