import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authReducer from '../features/auth/authSlice'
import refreshTokenMiddleware from './authMiddleware';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: [
        ...getDefaultMiddleware({
          serializableCheck: false,
        }),
        apiSlice.middleware,
        refreshTokenMiddleware, // Add the refreshTokenMiddleware
      ],
    devTools: true
})