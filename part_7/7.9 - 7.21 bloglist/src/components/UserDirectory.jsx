import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDirectory } from "../reducers/userDirectoryReducer";
import userService from "../services/users";

function UserDirectory() {
  const dispatch = useDispatch();
  const userDirectory = useSelector((state) => state.userDirectory);
  useEffect(() => {
    async function getUsers() {
      const users = await userService.getAll();
      dispatch(setUserDirectory(users));
    }
    getUsers();
  }, []);
  return (
    <div>
      <h2>Users</h2>
      {userDirectory.length > 0 && (
        <table>
          <thead>
            <td></td>
            <td>num of blogs</td>
          </thead>
          <tbody>
            {userDirectory.map((user) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserDirectory;
