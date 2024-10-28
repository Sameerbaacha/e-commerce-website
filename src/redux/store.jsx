import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';  // Your cart slice
import authReducer from './authSlice';  // The new auth slice


export const store = configureStore({
    reducer: {
        cart: cartReducer,   // Cart slice
        auth: authReducer,   // Auth slice
    },
});
