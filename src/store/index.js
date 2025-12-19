import { configureStore } from '@reduxjs/toolkit';
import consultationReducer from './consultationSlice';

export const store = configureStore({
    reducer: {
        consultation: consultationReducer,
    },
});

export default store;
