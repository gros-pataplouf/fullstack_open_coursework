import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import userDirectoryReducer from "./reducers/userDirectoryReducer";
import userInfoReducer from "./reducers/userInfoReducer";
import blogInfoReducer from "./reducers/blogInfoReducer";

import App from "./App";

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    userDirectory: userDirectoryReducer,
    userInfo: userInfoReducer,
    blogInfo: blogInfoReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
