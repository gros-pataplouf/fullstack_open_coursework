import { Link } from "react-router-dom";

function Nav({ children }) {
  return (
    <div>
      <div>
        <Link to="/">Blogs</Link>
      </div>
      <div>
        <Link to="/users">Users</Link>
      </div>
      {children}
    </div>
  );
}

export default Nav;
