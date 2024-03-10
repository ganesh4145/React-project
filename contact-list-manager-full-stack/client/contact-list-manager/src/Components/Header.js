import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <h1>Contact List Manager</h1>
      <Link to="/add">
        <button>Add Contact</button>
      </Link>{" "}
      <Link to="/get">
        <button>Get Contact</button>
      </Link>
    </div>
  );
};

export default Header;
