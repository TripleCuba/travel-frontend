import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getTowns, getDestination } from "../../utils/apiCalls";

const Destination = () => {
  const BASE_IMG_URL = "https://res.cloudinary.com/dkeewhdlg";
  const navigate = useNavigate();
  const { destination } = useParams();
  const [currentDestination, setCurrentDestination] = useState({});
  const [townList, setTownList] = useState([]);
  const getData = async (id) => {
    const towns = await getTowns(id);
    setTownList(towns);
    if (towns.length) {
      setCurrentDestination(towns[0].destination);
    } else {
      const destination = await getDestination(id);
      setCurrentDestination(destination);
    }
  };

  useEffect(() => {
    getData(destination);
  }, []);

  return (
    <div>
      {currentDestination && (
        <div>
          <div className="coverDiv">
            <h1 className="title">{currentDestination.destination}</h1>
            <p className="paragraph">{currentDestination.description}</p>
            <img
              className="coverImg"
              alt="destination cover"
              src={`${BASE_IMG_URL}/${currentDestination.image}`}
            ></img>
          </div>
          <h3 className="subTitle">Cities/Towns</h3>
          <ul className="listCards">
            {townList.length ? (
              townList.map((item) => (
                <li key={item.id}>
                  <img src={`${BASE_IMG_URL}/${item.image}`} alt="town" />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <button
                      onClick={() => {
                        navigate(`/town/${item.id}`);
                      }}
                    >
                      Check Hotels
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <h1 className="subTitle">
                Sorry no available towns or cities found in this destination...
              </h1>
            )}
          </ul>
        </div>
      )}
      <button onClick={() => navigate("/destinations")}>Go Back</button>
    </div>
  );
};

export default Destination;
