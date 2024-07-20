import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const blogInfoSlice = createSlice({
  name: "blogInfo",
  initialState,
  reducers: {
    setBlogInfo(state, action) {
      return action.payload;
    }
  },
});

export const { setBlogInfo } = blogInfoSlice.actions;
export default blogInfoSlice.reducer;
