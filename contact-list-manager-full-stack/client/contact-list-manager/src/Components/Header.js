import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Contact Manager</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link to="/add">
                  <button
                    className="btn btn-outline-success me-3"
                    type="submit"
                  >
                    Add Contact
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/get">
                  <button
                    className="btn btn-outline-success me-3"
                    type="submit"
                  >
                    Get Contact
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/delete">
                  <button
                    className="btn btn-outline-success me-3"
                    type="submit"
                  >
                    Delete Contact
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/update">
                  <button
                    className="btn btn-outline-success me-3"
                    type="submit"
                  >
                    Upadte Contact
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
