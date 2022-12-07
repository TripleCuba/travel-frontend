import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navBar">
      <div>
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/destinations">
          <button>Explore</button>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Sign Up</button>
        </Link>
        <Link to="/cart">
          <button>Cart</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
