import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, deleteBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
