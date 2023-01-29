import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getDestinations } from "../../utils/apiCalls";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import DeletePopUp from "../Manager/popUps/DeletePopUp";
import EditPopUp from "../Manager/popUps/EditPopUp";
const Destinations = () => {
  const user = useSelector((state) => state.user.value);
  const BASE_IMG_URL = "https://res.cloudinary.com/dkeewhdlg";
  const [destinations, setDestinations] = useState([]);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [editTrigger, setEditTrigger] = useState(false);
  const [objToDelete, setObjToDelete] = useState({});
  const [objToEdit, setObjToEdit] = useState({});
  const [message, setMessage] = useState("");
  const getData = async () => {
    const destinations = await getDestinations();
    setDestinations(destinations);
  };

  useEffect(() => {
    getData();
  }, [deleteTrigger, editTrigger]);
  const navigate = useNavigate();
  const handleDelete = (obj) => {
    setDeleteTrigger(true);
    obj["category"] = "destination";
    obj["title"] = obj.destination;
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
  setTimeout(() => {
    setMessage("");
  }, 7000);
  return (
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
        category="destination"
        setTrigger={setEditTrigger}
        setMessage={setMessage}
        setObj={setObjToEdit}
      />
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
              {user.isAdmin && (
                <div className="logos">
                  <BsFillPencilFill
                    className="logo"
                    onClick={() => handleEdit(item)}
                  />
                  <BsFillTrashFill
                    onClick={() => handleDelete(item)}
                    className="logo"
                  />
                </div>
              )}

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
