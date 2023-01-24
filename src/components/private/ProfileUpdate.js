import React from "react";
import { useState } from "react";
import { updateProfile } from "../../utils/userApiCalls";

const ProfileUpdate = ({ trigger, setPopUpStatus, setMessage, setProfile }) => {
  const [formData, setFormData] = useState({});

  const changeFormData = (e) => {
    const newData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newData);
  };
  const filterEmptyValues = (data) => {
    const dataArray = Object.entries(data);
    const filteredArray = dataArray.filter(([key, value]) => value);
    const filteredObj = Object.fromEntries(filteredArray);
    return filteredObj;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    const validatedData = filterEmptyValues(formData);
    const resp = await updateProfile(token, validatedData);

    resp.is_success && setProfile(resp.user);
    setMessage(resp.message);
    setInterval(() => {
      setMessage("");
    }, 9000);
    setPopUpStatus(false);
  };
  return trigger ? (
    <div>
      <form className="accountsForm">
        <label>First Name</label>
        <input
          type="text"
          value={formData.firstName}
          onChange={(e) => changeFormData(e)}
          name="firstName"
          placeholder="First Name"
        />
        <label>Last Name</label>
        <input
          type="text"
          value={formData.lastName}
          onChange={(e) => changeFormData(e)}
          name="lastName"
          placeholder="Last Name"
        />
        <label>Phone</label>
        <input
          type="text"
          value={formData.phone}
          onChange={(e) => changeFormData(e)}
          name="phone"
          placeholder="Phone Number"
        />
        <label>Country</label>
        <input
          type="text"
          value={formData.country}
          onChange={(e) => changeFormData(e)}
          name="country"
          placeholder="Country"
        />
        <label>Town</label>
        <input
          type="text"
          value={formData.town}
          onChange={(e) => changeFormData(e)}
          name="town"
          placeholder="Town"
        />
        <input
          type="submit"
          className="submit"
          value="Edit"
          onClick={(e) => handleSubmit(e)}
        />
      </form>
    </div>
  ) : (
    ""
  );
};

export default ProfileUpdate;
