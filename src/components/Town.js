import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { getHotels, getTowns } from "../utils/apiCalls";

const Town = () => {
  const [currentTownObj, setCurrentTownObj] = useState();
  const { town } = useParams();
  const getData = async (id) => {
    const hotelList = await getHotels(id);
    const town = await getTowns(hotelList[0].town);
    let townObj = town[0];
    townObj["hotels"] = hotelList;

    console.log(townObj);
    setCurrentTownObj(townObj);
  };
  useEffect(() => {
    getData(town);
  }, []);
  return (
    <div>
      {currentTownObj && (
        <div>
          <h1 className="title">{currentTownObj.title}</h1>
          <p className="paragraph">{currentTownObj.description}</p>
          <h3 className="subTitle">Hotels </h3>
          <ul className="listCards">
            {currentTownObj.hotels.map((hotel) => (
              <li key={hotel.id}>
                <h3>{hotel.title}</h3>
                <p>{hotel.rating}</p>
                <button>Check {hotel.title} rooms</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={() => console.log(currentTownObj)}>Test</button>
    </div>
  );
};

export default Town;
