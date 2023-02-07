import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getHotels, getTown } from "../../utils/apiCalls";
import DeletePopUp from "../Manager/popUps/DeletePopUp";
import EditPopUp from "../Manager/popUps/EditPopUp";

const Town = () => {
  const user = useSelector((state) => state.user.value);
  const BASE_IMG_URL = "https://res.cloudinary.com/dkeewhdlg";
  const navigate = useNavigate();
  const [hotelList, setHotelList] = useState([]);
  const [currentTown, setCurrentTown] = useState({});
  const [message, setMessage] = useState("");
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [editTrigger, setEditTrigger] = useState(false);
  const [objToDelete, setObjToDelete] = useState({});
  const [objToEdit, setObjToEdit] = useState({});
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
  const handleDelete = (obj) => {
    setDeleteTrigger(true);
    obj["category"] = "hotel";
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
  const getTownData = async (id) => {
    const resp = await getTown(id);
    setCurrentTown(resp);
  };
  useEffect(() => {
    getHotelList(town);
  }, [town, deleteTrigger, editTrigger]);
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
        category="hotel"
        setTrigger={setEditTrigger}
        setMessage={setMessage}
        setObj={setObjToEdit}
      />
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
                {user.isAdmin && (
                  <div className="logos">
                    <button
                      className="logo"
                      onClick={() => handleEdit(hotel)}
                      disabled={deleteTrigger}
                    >
                      <BsFillPencilFill />
                    </button>
                    <button
                      className="logo"
                      onClick={() => handleDelete(hotel)}
                      disabled={editTrigger}
                    >
                      <BsFillTrashFill />
                    </button>
                  </div>
                )}
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
