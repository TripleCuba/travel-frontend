import React from "react";
import { useState } from "react";
import { add_destination_call } from "../../../utils/managerApiCalls";
import { validateData } from "../validation";

const AddDestination = () => {
  const [formData, setFormData] = useState({});
  const [formImage, setFormImage] = useState();
  const changeFormData = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValidated = validateData(formData, formImage, 2);
    if (isValidated) {
      let fd = new FormData();
      fd.append("destination", formData.destination);
      fd.append("description", formData.description);
      fd.append("image", formImage);
      const token = localStorage.getItem("token");
      const resp = await add_destination_call(token, fd);
      console.log(resp);
    } else {
      alert("form is not valid");
    }
  };
  return (
    <div>
      <h1>Add destination</h1>
      <form className="form">
        <label>Title</label>
        <input
          type="text"
          name="destination"
          onChange={(e) => changeFormData(e)}
        />
        <label>Description</label>
        <input
          type="text"
          name="description"
          onChange={(e) => changeFormData(e)}
        ></input>
        <label>Image</label>
        <input type="file" onChange={(e) => setFormImage(e.target.files[0])} />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default AddDestination;
