import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./admin.css";

const UploadData = () => {
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
