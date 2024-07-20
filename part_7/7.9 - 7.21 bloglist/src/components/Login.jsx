import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import {
  createNotification,
  eraseNotification,
} from "../reducers/notificationReducer";
import { setUser, logout } from "../reducers/userReducer";

import loginService from "../services/login";
import usersService from "../services/users";
const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginService.login(input);
      const relatedUser = await usersService.getOne(response.id);
      const userInState = {
        token: response.token,
        id: response.id,
        username: response.username,
        name: relatedUser.name,
        isLoggedIn: true,
      };
      dispatch(setUser(userInState));
      window.localStorage.setItem("blogUser", JSON.stringify(userInState));
    } catch (e) {
      console.error(e.response.data.error);
      dispatch(
        createNotification({ text: e.response.data.error, type: "warning" }),
      );
      setTimeout(() => {
        dispatch(eraseNotification());
      }, 2000);
    }
  };
  const handleLogOut = () => {
    window.localStorage.removeItem("blogUser");
    dispatch(logout());
    console.log("logged out");
    console.log(user);
    setInput({
      username: "",
      password: "",
    });
  };

  const handleChange = (property) => (e) => {
    setInput({ ...input, [property]: e.target.value.trim() });
  };

  if (!user) {
    return (
      <div>
        <Form data-testid="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="username"
            id="username"
            name="username"
            data-testid="login-username"
            value={input.username}
            onChange={handleChange("username")}
          />
          <label htmlFor="username">username</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            value={input.password}
            onChange={handleChange("password")}
            data-testid="login-password"
          />
          <label htmlFor="password">password</label>
          <Button type="submit" data-testid="login-button">
            Log in
          </Button>
        </Form>
      </div>
    );
  } else {
    return (
      <div className="d-flex p-2 bd-highlight">
        <div className="p-2 text-white fs-4">
          You are logged in as {user.name}.
        </div>
        <Button onClick={handleLogOut} className="fs-4 border btn btn-dark">
          Log out
        </Button>
      </div>
    );
  }
};

export default Login;
