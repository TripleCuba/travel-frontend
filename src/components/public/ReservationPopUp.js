import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { reserveRoom } from "../../utils/apiCalls";

const ReservationPopUp = (props) => {
  const [guests, setGuests] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const changeGuestsAndPrice = (e) => {
    setGuests(e.target.value);
    let price = props.roomData.price_per_guest * e.target.value;
    setTotalPrice(price - (e.target.value > 1 ? e.target.value * 5 : 0));
  };
  const reset = () => {
    setGuests(0);
    setTotalPrice(0);
    props.setPopUpStatus(false);
    setMessage("");
  };
  const reserve = async (id, token, guests) => {
    if (guests > 0) {
      const resp = await reserveRoom(id, token, guests, totalPrice);
      resp.is_success
        ? navigate("/success", { state: resp.message })
        : props.setPopUpStatus(false);
    } else {
      setMessage("invalid guest number");
    }
  };
  return props.trigger ? (
    <div className="popUp">
      <div className="popUpIn">
        <h1>{message ? message : "Are you sure?"}</h1>
        <p>{totalPrice}Eur</p>
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
            onChange={(e) => changeGuestsAndPrice(e)}
          ></input>
          {guests > 1 ? <p>{guests} guests </p> : <p>{guests} guest </p>}
        </div>
        <div className="buttons">
          <button
            onClick={() => reserve(props.idForPopUp, props.token, guests)}
            disabled={guests < 0}
          >
            Yes
          </button>
          <button onClick={() => reset()}>Cancel</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ReservationPopUp;
