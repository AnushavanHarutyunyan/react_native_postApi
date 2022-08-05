import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../store/reducers/postSlice';

const store = configureStore({
    reducer: { post: postReducer },
});

export default store;
