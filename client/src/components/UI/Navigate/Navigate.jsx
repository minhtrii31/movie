import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navigate.css";
import { Link, useLocation } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { checkIfLoggedIn, getLoggedInUser } from "../../../utils/authUtils";
function Header() {
  const isAuthenticated = checkIfLoggedIn();
  const user = getLoggedInUser();

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-transparent"
      variant="dark"
    >
      <Container
        style={{
          position: "relative",
        }}
      >
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className="text-center p-3 text-white"
        >
          <Navbar.Brand>
            {location.pathname !== "/movie/:id" ? (
              <Link to="/">
                <img
                  alt=""
                  src="/img/logo_1.png"
                  width="150"
                  height="40"
                  className="d-inline-block align-top"
                />
              </Link>
            ) : (
              <div style={{ width: 150, height: 40 }}></div>
            )}
          </Navbar.Brand>
          <Nav className="me-auto nav">
            <Link to="/movies" className="nav-link">
              Movies
            </Link>
            <Link to="/actors" className="nav-link">
              Actors
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Nav style={{}}>
          {isAuthenticated ? (
            <>
              <NavDropdown
                title={user.name}
                id="basic-nav-dropdown"
                style={{
                  position: "relative",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis '[..]'",
                  minWidth: 150,
                  textAlign: "right",
                  zIndex: 999,
                }}
              >
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    padding: "4px 16px",
                  }}
                >
                  Profile
                </Link>
                <NavDropdown.Divider />
                <Link
                  to="/"
                  onClick={handleLogout}
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    padding: "4px 16px",
                  }}
                >
                  Logout
                </Link>
              </NavDropdown>
            </>
          ) : (
            <Link
              to="/login"
              style={{ color: "#fff", textDecoration: "none" }}
              className="nav-link"
            >
              Login/Register
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
