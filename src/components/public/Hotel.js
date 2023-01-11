import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getRooms } from "../../utils/apiCalls";
import ReservationPopUp from "./ReservationPopUp";

const Hotel = () => {
  const { hotel } = useParams();
  const [myHotel, setMyHotel] = useState();
  const [errMessage, setErrMessage] = useState();
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [idForPopUp, setIdForPopUp] = useState();
  const [token, setToken] = useState();
  const [roomData, setRoomData] = useState();

  const handlePopUp = (id, data) => {
    let myToken = localStorage.getItem("token");
    myToken
      ? popUpStatus
        ? setPopUpStatus(false)
        : setPopUpStatus(true)
      : setErrMessage("Login to continue");
    setToken(myToken);
    setIdForPopUp(id);
    setRoomData(data);
  };
  const getData = async (id) => {
    const resp = await getRooms(id);
    setMyHotel(resp);
    console.log(myHotel);
  };
  useEffect(() => {
    getData(hotel);
  }, []);
  return (
    <div className="hotelList">
      {myHotel && (
        <div>
          <Link to="/login">
            <h3 className="subTitle">{errMessage && errMessage}</h3>
          </Link>
          {myHotel.length ? (
            <ul className="listCards">
              {myHotel.map((room) => (
                <li key={room.id}>
                  <h1>{room.title}</h1>
                  <h3>{room.room_number}</h3>
                  <p>For {room.capacity} persons</p>
                  <h3> {room.is_available ? "available" : "not available"}</h3>
                  <button
                    disabled={popUpStatus}
                    onClick={() => handlePopUp(room.id, room)}
                  >
                    popup
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <h1>Sorry no rooms available</h1>
          )}
        </div>
      )}
      <ReservationPopUp
        trigger={popUpStatus}
        idForPopUp={idForPopUp}
        token={token}
        roomData={roomData}
        setPopUpStatus={setPopUpStatus}
      />
    </div>
  );
};

export default Hotel;
