import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { cancelOrder, getReservations } from "../../utils/apiCalls";

const Reservations = () => {
  const [response, setResponse] = useState();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const getData = async () => {
    let resp = await getReservations(token);
    setData(resp);
  };
  const cancelReservation = async (id) => {
    if (token) {
      let resp = await cancelOrder(id, token);
      setResponse(resp);
    } else {
      setResponse("User is not authenticated");
    }
    console.log(response);
  };
  useEffect(() => {
    token ? getData() : setResponse("User is not authenticated");
    console.log("resp", response);
    console.log("data", data);
  }, []);
  return (
    <div>
      <h1>Your reservations</h1>
      {data.length ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <h3>{item.date_ordered}</h3>
              <h3>
                Destination: {item.room.hotel.town.destination.destination}
              </h3>
              <h3>Town: {item.room.hotel.town.title}</h3>
              <h3>Hotel: {item.room.hotel.title}</h3>
              <h3>Room: {item.room.title}</h3>
              <p>guests: {item.guests}</p>
              <button onClick={() => cancelReservation(item.id)}>
                Cancel reservation
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No resp</div>
      )}
    </div>
  );
};

export default Reservations;
