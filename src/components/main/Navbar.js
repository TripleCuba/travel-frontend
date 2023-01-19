import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/home");
  };
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

      {user.isAuthenticated ? (
        <div>
          <button>Hey {user.username}</button>
          <Link to="/reservations">
            <button>Reservations</button>
          </Link>
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
