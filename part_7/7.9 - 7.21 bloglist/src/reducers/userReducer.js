import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  username: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logout() {
      return null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
