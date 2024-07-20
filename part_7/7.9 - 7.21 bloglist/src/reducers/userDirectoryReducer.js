import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const userDirectorySlice = createSlice({
  initialState,
  name: "userDirectory",
  reducers: {
    setUserDirectory(state, action) {
      return action.payload;
    },
  },
});

export const { setUserDirectory } = userDirectorySlice.actions;
export default userDirectorySlice.reducer;
