import { configureStore } from '@reduxjs/toolkit';
import { postSlice } from './posts';

export const store = configureStore({
    reducer: {
        posts: postSlice.reducer,
    }
});