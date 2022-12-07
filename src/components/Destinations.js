import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDestinations } from "../utils/apiCalls";
const Destinations = () => {
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
            <h1>{item.destination}</h1>
            <p className="paragraph">{item.description}</p>
            <button onClick={() => navigate(`${item.id}`)}>Check more!</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
