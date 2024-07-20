import { createSlice } from "@reduxjs/toolkit";

const initialState = { type: "", content: "" };

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    eraseNotification() {
      return initialState;
    },
  },
});

export const { createNotification, eraseNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
