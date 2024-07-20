import { Link } from "react-router-dom";

import { Navbar, Nav } from "react-bootstrap";

function NavigationMenue({ children }) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Nav>
        <Nav.Link className="nav-item">
          <Link className="text-white fs-3" to="/">
            Blogs
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link className="text-white fs-3" to="/users">
            Users
          </Link>
        </Nav.Link>
        {children}
      </Nav>
    </Navbar>
  );
}

export default NavigationMenue;
