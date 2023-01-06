import React, { useState } from "react";
import { getUserData, sendRegistrationForm } from "../../utils/userApiCalls";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../../features/user";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    token && navigate("/");
  });
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [response, setResponse] = useState();
  const getFormData = (e) => {
    const newDataObject = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newDataObject);
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    const resp = await sendRegistrationForm(formData);
    console.log(resp);
    setResponse(resp);
    localStorage.setItem("token", resp.token);
    const user = await getUserData(resp.token);
    dispatch(
      login({
        username: user.username,
        email: user.email,
        isAuthenticated: true,
      })
    );
  };
  return (
    <div>
      <h1>Sign Up</h1>
      {response &&
        (response.response === "Success" ? (
          <div className="message">
            <h1>New account is created!</h1>
            <h3>Username: {response.username}</h3>
            <h3>Email: {response.email}</h3>
          </div>
        ) : (
          <div className="message">
            <h3>Account registration failed</h3>{" "}
            {Object.values(response).map((item) => (
              <p>{item}</p>
            ))}
          </div>
        ))}
      <form className="accountsForm" method="post">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={formData.username}
          name="username"
          onChange={(e) => getFormData(e)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={formData.email}
          name="email"
          onChange={(e) => getFormData(e)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={(e) => getFormData(e)}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          value={formData.password2}
          name="password2"
          onChange={(e) => getFormData(e)}
        />
        <input
          type="submit"
          value="Sign Up"
          onClick={(e) => submitFormData(e)}
        />
      </form>
      <button onClick={() => console.log(formData)}>test</button>
    </div>
  );
};

export default Registration;
