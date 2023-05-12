import { createSlice } from '@reduxjs/toolkit';

export type Posts = {
    posts: Post[];
    username: string | undefined;
}

export type Post = {
    title: string;
    content: string;
    id: number;
    username: string;
}

const initialState: Posts = {
    posts: [],
    username: undefined,
};

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
        editPost: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            state.posts[index] = action.payload;
        },
        setUsername: (state, action) => {
            console.log(action.payload);
            
            state.username = action.payload;
        },
        setAllPosts: (state, action) => {
            state.posts = action.payload;
        }
    }
});

export const { addPost, deletePost, editPost, setUsername, setAllPosts } = postSlice.actions;