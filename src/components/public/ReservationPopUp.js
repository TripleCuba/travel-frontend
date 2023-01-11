import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { reserveRoom } from "../../utils/apiCalls";

const ReservationPopUp = (props) => {
  const [guests, setGuests] = useState(2);
  const navigate = useNavigate();
  console.log(props.roomData);
  const reserve = async (id, token, guests) => {
    const resp = await reserveRoom(id, token, guests);
    resp.is_success
      ? navigate("/success", { state: resp.message })
      : props.setPopUpStatus(false);
  };
  return props.trigger ? (
    <div className="popUp">
      <div className="popUpIn">
        <h1>Are you sure?</h1>

        <h3>Town: {props.roomData.hotel.town.title}</h3>
        <h3>Hotel: {props.roomData.hotel.title}</h3>
        <h3>Room: {props.roomData.title}</h3>
        <h3>Room number: {props.roomData.room_number}</h3>
        <div className="selectRange">
          <input
            type="range"
            min="1"
            max={props.roomData.capacity}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          ></input>
          {guests > 1 ? <p>{guests} guests </p> : <p>{guests} guest </p>}
        </div>
        <div className="buttons">
          <button
            onClick={() => reserve(props.idForPopUp, props.token, props.guests)}
          >
            Yes
          </button>
          <button onClick={() => props.setPopUpStatus(false)}>Cancel</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ReservationPopUp;
