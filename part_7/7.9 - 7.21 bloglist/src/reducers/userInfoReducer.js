import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  username: null,
  blogs: [],
  id: null,
};
const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      return action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
