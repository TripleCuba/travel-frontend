import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDestinations } from "../../utils/apiCalls";
const Destinations = () => {
  const BASE_IMG_URL = "https://res.cloudinary.com/dkeewhdlg";
  const [destinations, setDestinations] = useState([]);
  const getData = async () => {
    const destinations = await getDestinations();
    setDestinations(destinations);
    console.log(destinations);
  };
  useEffect(() => {
    getData();
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="title">Explore destinations</h1>
      <div className="destinationCards">
        {destinations.map((item, i) => (
          <div className="card" key={i}>
            <img
              className="coverImg"
              src={`${BASE_IMG_URL}/${item.image}`}
              alt="cover"
            ></img>
            <div>
              <h1>{item.destination}</h1>
              <p className="paragraph">{item.description}</p>
              <button onClick={() => navigate(`${item.id}`)}>
                Check more!
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
