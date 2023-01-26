import React, { useEffect, useState } from "react";
import { getAllHotels } from "../../../utils/apiCalls";
import { add_room_call } from "../../../utils/managerApiCalls";
import { validateData } from "../validation";

const AddRoom = () => {
  const [formData, setFormData] = useState({});
  const [hotels, setHotels] = useState([]);
  const [formImg, setFormImg] = useState();
  const changeFormData = (e) => {
    let newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    console.log(newData);
    setFormData(newData);
  };
  const getTownsField = async () => {
    let resp = await getAllHotels();
    let newArr = [];
    console.log(resp);
    resp.forEach((item) => {
      let testArr = resp.filter((i) => item.town.title === i.town.title);
      let duplicates = newArr.find((i) => i.town === item.town.title);
      if (!duplicates) {
        let newObj = {
          town: item.town.title,
          hotels: testArr,
        };
        newArr.push(newObj);
      }
    });
    setHotels(newArr);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    const isValid = validateData(formData, formImg, 5);
    if (isValid) {
      let fd = new FormData();
      fd.append("title", formData.title);
      fd.append("room_number", formData.room_number);
      fd.append("capacity", formData.capacity);
      fd.append("price_per_guest", formData.price_per_quest);
      fd.append("hotel", formData.hotel);
      fd.append("is_available", true);
      fd.append("image", formImg);
      let resp = await add_room_call(token, fd);
      console.log(resp);
    } else {
      alert("form is not valid");
    }
  };
  useEffect(() => {
    getTownsField();
  }, []);
  return (
    <div>
      <h1>Add Room</h1>
      <form className="form">
        <label>Title</label>
        <input
          type="text"
          name="title"
          onChange={(e) => changeFormData(e)}
          value={formData.title}
        />
        <label>Room number</label>
        <input
          type="text"
          name="room_number"
          onChange={(e) => changeFormData(e)}
          value={formData.room_number}
        />
        <label>Capacity</label>
        <input
          type="number"
          name="capacity"
          onChange={(e) => changeFormData(e)}
          value={formData.capacity}
        />
        <label>Price Per Guest</label>
        <input
          type="number"
          name="price_per_quest"
          onChange={(e) => changeFormData(e)}
          value={formData.price_per_quest}
        />

        <label>Hotel</label>
        <select onChange={(e) => changeFormData(e)} name="hotel">
          <option value={null}>-</option>
          {hotels.length
            ? hotels.map((item, index) => (
                <optgroup key={index} label={item.town}>
                  {item.hotels.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.title}
                    </option>
                  ))}
                </optgroup>
              ))
            : ""}
        </select>
        <input type="file" onChange={(e) => setFormImg(e.target.files[0])} />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default AddRoom;
