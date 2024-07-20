import { useEffect } from "react";
import { useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../reducers/userInfoReducer";
import userService from "../services/users";

function User() {
  const user = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const match = useMatch("/users/:id");
  const userId = match.params.id;

  useEffect(() => {
    async function getUser() {
      const currentUser = await userService.getOne(userId);
      dispatch(setUserInfo(currentUser));
      console.log(currentUser, state);
    }
    getUser();
  }, []);

  return (
    <>
      <h1>User info</h1>
      <h2>{user && user.name}</h2>
      <h3>added blogs</h3>
      {user && user.blogs.length > 0 && (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>
              {blog.title} by {blog.author}
            </li>
          ))}
        </ul>
      )}
      {user && !user.blogs.length && <p>no blogs added</p>}
    </>
  );
}

export default User;
