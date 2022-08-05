import { createSlice } from '@reduxjs/toolkit';
import { data } from '../../data';

const initialState = {
    allPosts: [],
    bookedPosts: [],
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        loadAllPosts: (state) => {
            state.allPosts.push(...data);
            return state;
        },
        loadbookedPosts: (state) => state.bookedPosts,
        toggleBoodek: (state, { payload }) => {
            state.allPosts.map((post) => {
                if (post.id === payload) {
                    post.booked = !post.booked;
                }
                return post;
            });
            state.bookedPosts = [
                ...state.allPosts.filter((post) => post.booked),
            ];
        },
        removePost: (state, { payload }) => {
            state.allPosts = state.allPosts.filter(
                (post) => post.id !== payload
            );
            state.bookedPosts = state.bookedPosts.filter(
                (post) => post.id !== payload
            );
        },
        addPost: (state, { payload }) => {
            payload.id = Date.now().toString();
            state.allPosts = [{ ...payload }, ...state.allPosts];
        },
    },
});

export const {
    loadAllPosts,
    loadbookedPosts,
    toggleBoodek,
    removePost,
    addPost,
} = postSlice.actions;
export default postSlice.reducer;
