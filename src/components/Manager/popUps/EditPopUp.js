import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { edit_call } from "../../../utils/managerApiCalls";

const EditPopUp = ({
  obj,
  trigger,
  setTrigger,
  category,
  setObj,
  setMessage,
}) => {
  const [formData, setFormData] = useState(obj);
  const [formImage, setFormImage] = useState();
  useEffect(() => {
    setFormData(obj);
  }, [obj]);
  const changeFormData = (e) => {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newData);
    console.log(newData);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setTrigger(false);
    setObj({});
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    let dataEntries = Object.entries(formData);

    let filteredData = dataEntries.filter(
      ([key, value]) => key !== "id" && key !== "image" && value.length
    );
    console.log(filteredData);
    let fd = new FormData();
    filteredData.forEach(([key, value]) => {
      fd.append(key, value);
    });
    formImage && fd.append("image", formImage);
    const token = localStorage.getItem("token");
    const resp = await edit_call(token, formData.id, category, fd);
    if (resp.is_success) {
      setTrigger(false);
      setMessage(resp.message);
      setFormImage("");
      setFormData({});
    }
  };

  const keys = Object.keys(obj);
  return (
    trigger && (
      <div className="managerPopUp">
        <h1>edit</h1>
        <form className="editForm">
          {keys &&
            keys.map((key) => {
              if (key !== "image" && key !== "id") {
                return (
                  <div className="formField" key={keys[key]}>
                    <label>{key}</label>
                    <input
                      name={key}
                      value={formData[key]}
                      onChange={(e) => changeFormData(e)}
                    />
                  </div>
                );
              } else if (key === "image") {
                return (
                  <div className="formField">
                    <label>{key}</label>
                    <input
                      type="file"
                      onChange={(e) => setFormImage(e.target.files[0])}
                    />
                  </div>
                );
              } else {
                return "";
              }
            })}
          <div className="buttons">
            <button onClick={(e) => handleEdit(e)}>Submit</button>
            <button onClick={(e) => handleCancel(e)}>Cancel</button>
          </div>
        </form>
      </div>
    )
  );
};

export default EditPopUp;
