import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getHotels, getTown } from "../../utils/apiCalls";

const Town = () => {
  const BASE_IMG_URL = "https://res.cloudinary.com/dkeewhdlg";
  const navigate = useNavigate();
  const [hotelList, setHotelList] = useState([]);
  const [currentTown, setCurrentTown] = useState({});
  const { town } = useParams();
  const getHotelList = async (id) => {
    const resp = await getHotels(id);
    if (resp.length) {
      setHotelList(resp);
      let newTown = resp[0].town;
      setCurrentTown(newTown);
    } else {
      await getTownData(id);
    }
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
      <div className="coverDiv">
        <h1 className="title">{currentTown.title}</h1>
        <p className="paragraph">{currentTown.description}</p>
        <img
          className="coverImg"
          src={`${BASE_IMG_URL}/${currentTown.image}`}
          alt="hotel"
        />
      </div>

      <ul className="listCards">
        {hotelList.length ? (
          hotelList.map((hotel) => (
            <li key={hotel.id}>
              <img src={`${BASE_IMG_URL}/${hotel.image}`} alt="hotel" />
              <div>
                <h3>{hotel.title}</h3>
                <p>{hotel.rating}</p>
                <button onClick={() => navigate(`/hotel/${hotel.id}`)}>
                  Check {hotel.title} rooms
                </button>
              </div>
            </li>
          ))
        ) : (
          <h1>Sorry, no hotels available at this moment</h1>
        )}
      </ul>
    </div>
  );
};

export default Town;
