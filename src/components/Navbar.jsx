import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/usercontext";

function Navbar() {
  let auth = useAuth();

  function handleLogout() {
    auth.setConData(null);
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              style={{ marginRight: "20px" }}
              src="https://cdn.pixabay.com/photo/2015/12/23/01/14/edit-1105049_1280.png"
              width="50px"
              alt=""
            />
            Ecommerce
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {auth.conData?.isLoggedIn === true ? (
                ""
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Login
                  </NavLink>
                </li>
              )}

              {auth.userData ? (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    profile
                  </NavLink>
                </li>
              ) : (
                ""
              )}
              {auth.conData?.isLoggedIn === true ? (
                ""
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              )}
              {auth.conData === null || auth.conData?.isLoggedIn === false ? (
                ""
              ) : (
                <li className="nav-item me-4">
                  <NavLink className="nav-link" to="/store">
                    Store
                  </NavLink>
                </li>
              )}

              {auth.conData === null || auth.conData?.isLoggedIn === false ? (
                ""
              ) : (
                <li className="nav-item me-4">
                  <NavLink className="nav-link" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
              )}

              {auth.conData === null || auth.conData?.isLoggedIn === false ? (
                ""
              ) : (
                <div className="dropdown">
                  <button
                    className="btn btn-outline-danger dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.conData?.currentUserName}
                  </button>
                  <ul className="dropdown-menu">
                    <li className="d-inline-block ms-5 me-5">
                      <button onClick={handleLogout} className="btn btn-danger">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
