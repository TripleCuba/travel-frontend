import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllTowns } from "../../../utils/apiCalls";
import { add_hotel_call } from "../../../utils/managerApiCalls";
import { validateData } from "../validation";

const AddHotel = () => {
  const [formData, setFormData] = useState({});
  const [towns, setTowns] = useState([]);
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
    let resp = await getAllTowns();
    let newArr = [];
    resp.forEach((item) => {
      let testArr = resp.filter(
        (i) => item.destination.destination === i.destination.destination
      );
      let duplicates = newArr.find(
        (i) => i.country === item.destination.destination
      );
      if (!duplicates) {
        let newObj = {
          country: item.destination.destination,
          towns: testArr,
        };
        newArr.push(newObj);
      }
    });
    setTowns(newArr);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    const isValid = validateData(formData, formImg, 2);
    if (isValid) {
      let fd = new FormData();
      fd.append("title", formData.title);
      fd.append("town", formData.town);
      fd.append("image", formImg);
      let resp = await add_hotel_call(token, fd);
      console.log(resp);
    }
  };
  useEffect(() => {
    getTownsField();
  }, []);
  return (
    <div>
      <h1>Add Hotel</h1>
      <form className="form">
        <label>Title</label>
        <input type="text" name="title" onChange={(e) => changeFormData(e)} />
        <label>Town</label>
        <select onChange={(e) => changeFormData(e)} name="town">
          <option value={null}>-</option>
          {towns.length
            ? towns.map((item, index) => (
                <optgroup key={index} label={item.country}>
                  {item.towns.map((i) => (
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

export default AddHotel;
