import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./admin.css";

const UploadData = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    !user.isAdmin && navigate("/");
  });
  return (
    <div>
      <div className="adminNav">
        <Link to="addDestination">
          <button>Add destination</button>
        </Link>
        <Link to="addTown">
          <button>Add Town</button>
        </Link>
        <Link to="addHotel">
          <button>Add Hotel</button>
        </Link>
        <Link to="addRoom">
          <button>Add Room</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default UploadData;
