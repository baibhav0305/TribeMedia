import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    handleLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    handleLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    handleFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("No friends #DHANIYA");
      }
    },
    handlePosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    handlePost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  handleMode,
  handleLogin,
  handleLogout,
  handleFriends,
  handlePosts,
  handlePost,
} = authSlice.actions;

export default authSlice.reducer;
