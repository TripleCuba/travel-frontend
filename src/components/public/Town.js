import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getHotels, getTown } from "../../utils/apiCalls";

const Town = () => {
  const navigate = useNavigate();
  const [hotelList, setHotelList] = useState([]);
  const [currentTown, setCurrentTown] = useState({});
  const { town } = useParams();
  const getHotelList = async (id) => {
    const resp = await getHotels(id);
    console.log(resp);
    setHotelList(resp);
    let newTown = resp[0].town;
    setCurrentTown(newTown);
  };
  const getTownData = async (id) => {
    const resp = await getTown(id);
    setCurrentTown(resp);
  };
  useEffect(() => {
    getHotelList(town);
  }, []);
  return (
    <div>
      {!hotelList && getTownData(town)}
      <div className="townData">
        <h1 className="title">{currentTown.title}</h1>
        <p className="paragraph">{currentTown.description}</p>
      </div>
      <ul className="listCards">
        {hotelList.length &&
          hotelList.map((hotel) => (
            <li key={hotel.id}>
              <h3>{hotel.title}</h3>
              <p>{hotel.rating}</p>
              <button onClick={() => navigate(`/hotel/${hotel.id}`)}>
                Check {hotel.title} rooms
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Town;
