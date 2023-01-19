import React from "react";
import { useNavigate } from "react-router";
import { cancelOrder } from "../../utils/apiCalls";

const CancelReservationPopUp = (props) => {
  const navigate = useNavigate();
  const token = props.token;
  const cancelReservation = async (id) => {
    if (props.token) {
      let resp = await cancelOrder(id, token);
      resp.is_success
        ? navigate("/success", { state: resp.message })
        : props.setResponse(resp.message);
    } else {
      props.setResponse("User is not authenticated");
    }
  };
  return props.trigger ? (
    <div className="popUp">
      <div>
        <h3>Ar you sure?</h3>
        <p>Town: {props.item.room.hotel.town.title}</p>
        <p>Hotel: {props.item.room.hotel.title}</p>
        <p>Room: {props.item.room.title}</p>
        <p>Price: {props.item.total_price}Eur</p>
        <div className="buttons">
          <button onClick={() => cancelReservation(props.item.id)}>Yes</button>
          <button onClick={() => props.setPopUp(false)}>Cancel</button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CancelReservationPopUp;
