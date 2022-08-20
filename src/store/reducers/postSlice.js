import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadAllPosts = createAsyncThunk(
    'post/loadAllPosts',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(
                'https://post-app-react-native-default-rtdb.firebaseio.com/posts.json'
            );

            if (!response.ok) {
                throw new Error('fetching is error');
            }

            const data = await response.json();

            if (data) {
                return Object.keys(data).map((key) => {
                    return {
                        ...data[key],
                        id: key,
                    };
                });
            }
        } catch (e) {
            rejectWithValue(e.message);
        }
    }
);

export const addPost = createAsyncThunk(
    'post/addPost',
    async function (newPost, { rejectWithValue }) {
        try {
            const response = await fetch(
                `https://post-app-react-native-default-rtdb.firebaseio.com/posts.json`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newPost),
                }
            );
            if (!response.ok) {
                throw new Error('fetching is error');
            }
            const data = await response.json();
            return { ...newPost, id: data.name };
        } catch (e) {
            rejectWithValue(e.message);
        }
    }
);

export const deleteById = createAsyncThunk(
    '/post/deleteById',
    async function (id, { dispatch }) {
        await fetch(
            `https://post-app-react-native-default-rtdb.firebaseio.com/posts/${id}.json`,
            { method: 'DELETE' }
        );
        dispatch(removePost(id));
        return id;
    }
);

export const editPost = createAsyncThunk(
    '/post/editPost',
    async function (editedPost, { getState, dispatch, rejectWithValue }) {
        try {
            const response = await fetch(
                `https://post-app-react-native-default-rtdb.firebaseio.com/posts/${editedPost.id}.json`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editedPost),
                }
            );
            if (!response.ok) {
                throw new Error('fetching is error');
            }
            const editedData = await response.json();
            return editedData;
        } catch (e) {
            rejectWithValue(e.message);
        }
    }
);

export const toggleBookedAsync = createAsyncThunk(
    '/post/toggleBooked',
    async function (id, { rejectWithValue, getState }) {
        try {
            const { allPosts } = getState().post;
            const post = allPosts.find((post) => post.id === id);
            const response = await fetch(
                `https://post-app-react-native-default-rtdb.firebaseio.com/posts/${id}.json`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ booked: !post.booked }),
                }
            );

            if (!response.ok) {
                throw new Error('fetching is error');
            }

            const toggleBoodek = await response.json();
            return { ...post, ...toggleBoodek };
        } catch (e) {
            rejectWithValue(e);
        }
    }
);

const initialState = {
    allPosts: [],
    bookedPosts: [],
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        loadbookedPosts: (state) => state.bookedPosts,
        removePost: (state, { payload }) => {
            state.allPosts = state.allPosts.filter(
                (post) => post.id !== payload
            );
            state.bookedPosts = state.bookedPosts.filter(
                (post) => post.id !== payload
            );
        },
    },
    extraReducers: {
        [loadAllPosts.fulfilled]: (state, { payload }) => {
            if (payload) {
                state.allPosts = payload;
            }
            
            payload ? state.bookedPosts = payload.filter((post) => post.booked): null;
        },
        [loadAllPosts.rejected]: (error) => {
            console.log(error);
        },
        [addPost.fulfilled]: (state, action) => {
            state.allPosts = [{ ...action.payload }, ...state.allPosts];
        },
        [editPost.fulfilled]: (state, { payload }) => {
            const changedState = state.allPosts.filter(
                (post) => post.id !== payload.id
            );
            state.allPosts = [payload, ...changedState];
        },
        [toggleBookedAsync.fulfilled]: (state, { payload }) => {
            state.allPosts = state.allPosts.map((post) => {
                if (post.id === payload.id) {
                    post.booked = !post.booked;
                }
                return post;
            });
            state.bookedPosts = [
                ...state.allPosts.filter((post) => post.booked),
            ];
        },
    },
});

export const { loadbookedPosts, removePost } = postSlice.actions;

export default postSlice.reducer;
