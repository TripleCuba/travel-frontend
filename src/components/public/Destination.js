import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getTowns, getDestination } from "../../utils/apiCalls";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import DeletePopUp from "../Manager/popUps/DeletePopUp";
import EditPopUp from "../Manager/popUps/EditPopUp";

const Destination = () => {
  const BASE_IMG_URL = "https://res.cloudinary.com/dkeewhdlg";
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const { destination } = useParams();
  const [currentDestination, setCurrentDestination] = useState({});
  const [townList, setTownList] = useState([]);
  const [message, setMessage] = useState("");
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [editTrigger, setEditTrigger] = useState(false);
  const [objToDelete, setObjToDelete] = useState({});
  const [objToEdit, setObjToEdit] = useState({});
  const getData = async (id) => {
    const towns = await getTowns(id);
    console.log(towns);
    setTownList(towns);
    if (towns.length) {
      setCurrentDestination(towns[0].destination);
    } else {
      const destination = await getDestination(id);
      setCurrentDestination(destination);
    }
  };
  const handleDelete = (obj) => {
    setDeleteTrigger(true);
    obj["category"] = "town";
    console.log(obj);
    setObjToDelete(obj);
  };
  const handleEdit = (obj) => {
    if (editTrigger) {
      if (objToEdit === obj) {
        setEditTrigger(false);
        setObjToEdit("");
      } else {
        setObjToEdit(obj);
      }
    } else {
      setEditTrigger(true);
      setObjToEdit(obj);
    }
  };

  useEffect(() => {
    getData(destination);
  }, [deleteTrigger, destination, editTrigger]);

  return (
    <div>
      {currentDestination && (
        <div>
          {message && <h1 className="message">{message}</h1>}
          <DeletePopUp
            className="managerPopUp"
            trigger={deleteTrigger}
            obj={objToDelete}
            setTrigger={setDeleteTrigger}
            setMessage={setMessage}
          />
          <EditPopUp
            trigger={editTrigger}
            obj={objToEdit}
            category="town"
            setTrigger={setEditTrigger}
            setMessage={setMessage}
            setObj={setObjToEdit}
          />
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
                    {user.isAdmin && (
                      <div className="logos">
                        <button
                          className="logo"
                          onClick={() => handleEdit(item)}
                          disabled={deleteTrigger}
                        >
                          <BsFillPencilFill />
                        </button>
                        <button
                          className="logo"
                          onClick={() => handleDelete(item)}
                          disabled={editTrigger}
                        >
                          <BsFillTrashFill />
                        </button>
                      </div>
                    )}
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
