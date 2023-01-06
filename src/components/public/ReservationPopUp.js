import React from "react";
import { useNavigate } from "react-router";
import { reserveRoom } from "../../utils/apiCalls";

const ReservationPopUp = (props) => {
  const navigate = useNavigate();
  console.log(props.roomData);
  const reserve = async (id, token, guests) => {
    const resp = await reserveRoom(id, token, guests);
    resp.is_success ? navigate("/success") : (props.trigger = false);
  };
  return props.trigger ? (
    <div className="popUp">
      <div>
        <h1>Are you sure?</h1>

        <h3>Town: {props.roomData.hotel.town.title}</h3>
        <h3>Hotel: {props.roomData.hotel.title}</h3>
        <h3>Room: {props.roomData.title}</h3>
        <h3>Room number: {props.roomData.room_number}</h3>
        <h3>Guests: {props.guests} </h3>
        <div className="buttons">
          <button
            onClick={() => reserve(props.idForPopUp, props.token, props.guests)}
          >
            Yes
          </button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ReservationPopUp;
