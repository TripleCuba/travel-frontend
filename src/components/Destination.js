import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getTowns, getDestination } from "../utils/apiCalls";

const Destination = () => {
  const navigate = useNavigate();
  const { destination } = useParams();
  const [currentDestination, setCurrentDestination] = useState();
  const getData = async (id) => {
    const towns = await getTowns(id);
    console.log(towns);
    const destination = await getDestination(id);
    destination.towns = towns;
    console.log(destination);
    setCurrentDestination(destination);
  };

  useEffect(() => {
    getData(destination);
  }, []);

  return (
    <div>
      {currentDestination && (
        <div>
          <h1 className="title">{currentDestination.destination}</h1>
          <p className="paragraph">{currentDestination.description}</p>
          <h3 className="subTitle">Cities/Towns</h3>
          <ul className="townCards">
            {currentDestination.towns.map((item) => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button
                  onClick={() => {
                    navigate(`/town/${item.id}`);
                  }}
                >
                  Check Hotels
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={() => navigate("/destinations")}>Go Back</button>
    </div>
  );
};

export default Destination;
