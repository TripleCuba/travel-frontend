import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getDestinations } from "../../../utils/apiCalls";
import { add_town_call } from "../../../utils/managerApiCalls";
import { validateData } from "../validation";

const AddTown = () => {
  const [destinations, setDestinations] = useState([]);
  const [formData, setFormData] = useState({});
  const [formImg, setFormImg] = useState(null);
  const [token, setToken] = useState("");
  const getDestinationsField = async () => {
    const resp = await getDestinations();
    setDestinations(resp);
  };

  const changeFormData = (e) => {
    let newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let is_validated = validateData(formData, formImg, 3);
    if (is_validated) {
      let fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("destination", formData.destination);
      fd.append("image", formImg);
      const resp = await add_town_call(token, fd);
      console.log(resp);
    } else {
      alert("Form is invalid");
    }
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    setToken(token);
    getDestinationsField();
  }, []);
  return (
    <div>
      <h1>Add Town</h1>
      <form className="form">
        <label>Title</label>
        <input type="text" name="title" onChange={(e) => changeFormData(e)} />
        <label>Description</label>
        <input
          type="text"
          name="description"
          onChange={(e) => changeFormData(e)}
        />
        <label>Destination</label>
        <select onChange={(e) => changeFormData(e)} name="destination">
          <option value={null}>-</option>
          {destinations.length
            ? destinations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.destination}
                </option>
              ))
            : ""}
        </select>
        <input type="file" onChange={(e) => setFormImg(e.target.files[0])} />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
};

export default AddTown;
