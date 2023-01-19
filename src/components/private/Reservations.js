import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getReservations } from "../../utils/apiCalls";
import CancelReservationPopUp from "./CancelReservationPopUp";

const Reservations = () => {
  const [response, setResponse] = useState();
  const [popUp, setPopUp] = useState(false);
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const token = localStorage.getItem("token");
  const getData = async () => {
    let resp = await getReservations(token);
    let newArr = [];
    for (let i = 0; i < resp.length; i++) {
      let item = resp[i];
      let date = new Date(item.date_ordered);
      let stringDate = date.toLocaleDateString();
      item.date_ordered = stringDate;
      newArr.push(item);
    }
    setData(newArr);
  };
  const handlePopUp = (item) => {
    setCurrentItem(item);
    popUp
      ? currentItem === item
        ? setPopUp(false)
        : setCurrentItem(item)
      : setPopUp(true);
  };
  useEffect(() => {
    token ? getData() : setResponse("User is not authenticated");
  }, []);
  return (
    <div>
      <h1>Your reservations</h1>
      <h3>{response}</h3>
      {data.length ? (
        <div className="reservations">
          <ul className="orders">
            {data.map((item) => (
              <li className="order" key={item.id}>
                <h3>Date ordered: {item.date_ordered}</h3>
                <h3>
                  Destination: {item.room.hotel.town.destination.destination}
                </h3>
                <h3>Town: {item.room.hotel.town.title}</h3>
                <h3>Hotel: {item.room.hotel.title}</h3>
                <h3>Room: {item.room.title}</h3>
                <h3>Price per Guest: {item.room.price_per_guest}Eur</h3>
                <p>Guests: {item.guests}</p>
                <p>Total price: {item.total_price}Eur</p>
                <button onClick={() => handlePopUp(item)}>
                  Cancel reservation
                </button>
              </li>
            ))}
          </ul>
          <CancelReservationPopUp
            className="popUp"
            token={token}
            trigger={popUp}
            item={currentItem}
            response={response}
            setResponse={setResponse}
            setPopUp={setPopUp}
          />
        </div>
      ) : (
        <div>No data</div>
      )}
    </div>
  );
};

export default Reservations;
