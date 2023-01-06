import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { getRooms } from "../../utils/apiCalls";
import ReservationPopUp from "./ReservationPopUp";

const Hotel = () => {
  const { hotel } = useParams();
  const [myHotel, setMyHotel] = useState();
  const [guests, setGuests] = useState(2);
  const [popUpStatus, setPopUpStatus] = useState(false);
  const [idForPopUp, setIdForPopUp] = useState();
  const [token, setToken] = useState();
  const [roomData, setRoomData] = useState();

  const handlePopUp = (id, data) => {
    popUpStatus ? setPopUpStatus(false) : setPopUpStatus(true);
    setToken(localStorage.getItem("token"));
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
    <div>
      {myHotel && (
        <div>
          {myHotel.length ? (
            <ul className="listCards">
              {myHotel.map((room) => (
                <li key={room.id}>
                  <h1>{room.title}</h1>
                  <h3>{room.room_number}</h3>
                  <p>For {room.capacity} persons</p>
                  <h3>How many guests?</h3>
                  <div className="selectRange">
                    <input
                      type="range"
                      min="1"
                      max={room.capacity}
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                    ></input>
                    {guests > 1 ? (
                      <p>{guests} guests </p>
                    ) : (
                      <p>{guests} guest </p>
                    )}
                  </div>
                  <h3> {room.is_available ? "available" : "not available"}</h3>
                  <button onClick={() => handlePopUp(room.id, room)}>
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
        guests={guests}
        idForPopUp={idForPopUp}
        token={token}
        roomData={roomData}
      />
    </div>
  );
};

export default Hotel;
