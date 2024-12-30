import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../slices/apiSlice'
import authSliceReducer from '../slices/authSlice';
import positionsSliceReducer from '../slices/positionsSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        position: positionsSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store;